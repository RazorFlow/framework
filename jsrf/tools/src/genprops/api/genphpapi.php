<?php
require "/Users/Joe/projects/rfx/phpwrapper/razorflow/razorflow.php";
 
chdir(dirname(__FILE__));
//system('rm api/*.rst');
 
$classList = array(
    "RFAssert"
);

define('DEBUG', true);
 
foreach($classList as $className)
{
    $doc = array();
    $refClass = new ReflectionClass($className);
    /* $doc = array( */
    /*     'className' => 'ClassName', */
    /*     'classDesc' => 'Test Description', */
    /*     'methods' => array( */
    /*         array( */
    /*             'name' => 'method1', */
    /*             'desc' => 'method 1 desc', */
    /*             'params' => array( */
    /*                 array( */
    /*                     'name' => '$param1', */
    /*                     'type' => 'Param1Type', */
    /*                     'desc' => 'Param 1 Desc' */
    /*                     ), */
    /*                 array( */
    /*                     'name' => '$param1', */
    /*                     'type' => 'Param1Type', */
    /*                     'desc' => 'Param 1 Desc' */
    /*                     ) */
    /*                 ) */
    /*             ) */
    /*         ), */
    /*     'properties' => array( */
    /*         array( */
    /*             'name' => '$param1', */
    /*             'type' => 'Param1Type', */
    /*             'desc' => 'Param 1 Desc' */
    /*             ), */
    /*         array( */
    /*             'name' => '$param1', */
    /*             'type' => 'Param1Type', */
    /*             'desc' => 'Param 1 Desc' */
    /*             ) */
    /*         ), */
    /* ); */
 
    $docComment = $refClass->getDocComment();
    if (substr(trim($docComment), 0, 3) != '/**'){
        $docComment = "/**\n * \n */";
    }
     
    $explodedComment = preg_split('/\n[ \n\t\/]*\*[ \t]*@/', "\n".$docComment);
    preg_match_all('/^[ \t]*[\/*]*\**( ?.*)[ \t\/*]*$/m', array_shift($explodedComment), $commentMatches);
    if (isset($commentMatches[1])) {
        $classDesc = implode("\n", $commentMatches[1]);
    }
    $doc['className'] = $refClass->getName();
    $doc['classDesc'] = trim($classDesc);
//    print_r($doc['classDesc']);
    $doc['methods'] = array();
    $allmethods = $refClass->getMethods(ReflectionMethod::IS_PUBLIC);
 
 
    $allprops = $refClass->getProperties(ReflectionProperty::IS_PUBLIC);
    $allpropdefaults = $refClass->getDefaultProperties();
 
    // let's go ahead and add all the methods from the parent class as well
    $parents = get_all_parents($className);
 
 
 
    foreach($allmethods as $method)
    {
        $ignoreFlag = false;
        $methodInfo = array();
        $docComment = $method->getDocComment();
 
        if($method->class !== $className) {
            //continue;
        }
        $methodInfo['name'] = $method->getName();
 
 
        if($methodInfo['name'][0] === "_")
        {
            // this is an internal method exposed as public
            continue;
        }
 
        if(strlen($docComment) > 1)
        {
            if (substr(trim($docComment), 0, 3) != '/**') die("ERROR: The comment isn't a docstring for $className::$methodName");
            $explodedComment = preg_split('/\n[ \n\t\/]*\*[ \t]*@/', "\n".$docComment);
       
            preg_match_all('/^[ \t]*[\/*]*\**( ?.*)[ \t\/*]*$/m', array_shift($explodedComment), $commentMatches);
            if (isset($commentMatches[1])) {
                $methodDesc = implode("\n", $commentMatches[1]);
                $methodInfo['desc'] = trim($methodDesc);
            }
 
            $methodInfo['params'] = array();
            $return = array();
            foreach ($explodedComment as $tag) { // process tags
                // strip whitespace, newlines and asterisks
                $tag = preg_replace('/(^[\s\n\*]+|[\s\*]*\*\/$)/m', ' ', $tag); // fixed: empty comment lines at end of docblock
                $tag = preg_replace('/\n+/', '', $tag);
                $tag = trim($tag);
 
                $parts = preg_split('/\s+/', $tag);
                $name = isset($parts[0]) ? array_shift($parts) : $tag;
                $text = join(' ', $parts);
 
                switch($name)
                {
                case 'param':
                    /* if(count($parts) < 2) */
                    /* { */
                    /*     print_r($parts); */
                    /*     print_r($methodInfo['name']); */
                    /*     die("Error: There is a problem - a param doesn't have a description and types"); */
                    /* } */
                   
                    $param = array();                    
                    // Only parameter name.
                    if(count($parts) === 1)
                    {
                        // there's only a name
                        $param['name'] = $parts[0];
                        $param['type'] = "";
                        $param['desc'] = "";
                    }
                    else if (count($parts) === 2)
                    {
                        $param['name'] = $parts[1];
                        $param['type'] = $parts[0];
                        $param['desc'] = "";
                    }
                    else
                    {
                        $param['name'] = $parts[1];
                        $param['type'] = $parts[0];
                        $param['desc'] = implode(' ', array_slice($parts, 2));
                    }
                   
                    $methodInfo['params'] []= $param;
                    break;
                case 'return':
                    /* if(count($parts) < 2) */
                    /* { */
                    /*     print_r($parts); */
                    /*     print_r($methodInfo['name']); */
                    /*     die("ERROR: The return param doesn't have a description and types"); */
                    /* } */
                    $return['type'] = $parts[0];
                    $return['desc'] = implode(" ", array_slice($parts, 1));
 
                    break;
                case 'ignore':
                    $ignoreFlag = true;
                    continue;
                default:
                    //die("ERROR: There isn't support for the tag - $name");
                }
            }
        }
 
        if(!$ignoreFlag)
        {
            $doc['methods'] []= $methodInfo;
        }
    }
 
    $doc['properties'] = array();
    foreach($allprops as $prop) {
        $ignoreFlag = false;
 
        $propInfo = array();
        $propInfo['name'] = $prop->name;
 
        if($prop->class != $className) {
            //continue;
        }
 
        if($propInfo['name'][0] === "_")
        {
            // ignore internal public properties
            continue;
        }
       
        /* if($prop->isDefault()) { */
        /*     $prop->setAccessible(true); */
        /*     $propInfo['default'] = $prop->getValue(new $className); */
        /* } */
 
        if(isset($allpropdefaults[$prop->name])) {
            if(is_array($allpropdefaults[$prop->name])) {
                $propInfo['default'] = "array()";
            } else {
                $propInfo['default'] = $allpropdefaults[$prop->name];
            }
        }
       
        $propComment = $prop->getDocComment();
 
        if(strlen($propComment) > 1)
        {
            if (substr(trim($propComment), 0, 3) != '/**') die("ERROR: The comment isn't a docstring for $className::$methodName");
            $explodedComment = preg_split('/\n[ \n\t\/]*\*[ \t]*@/', "\n".$propComment);
 
       
            preg_match_all('/^[ \t]*[\/*]*\**( ?.*)[ \t\/*]*$/m', array_shift($explodedComment), $commentMatches);
            if (isset($commentMatches[1])) {
                $methodDesc = implode("\n", $commentMatches[1]);
                $propInfo['desc'] = trim($methodDesc);
            }
           
            foreach ($explodedComment as $tag) { // process tags
                // strip whitespace, newlines and asterisks
                $tag = preg_replace('/(^[\s\n\*]+|[\s\*]*\*\/$)/m', ' ', $tag); // fixed: empty comment lines at end of docblock
                $tag = preg_replace('/\n+/', '', $tag);
                $tag = trim($tag);
 
                $parts = preg_split('/\s+/', $tag);
                $name = isset($parts[0]) ? array_shift($parts) : $tag;
                $text = join(' ', $parts);
 
                switch($name)
                {
                case 'var':
                    $propInfo['type'] = $parts[0];
                    break;
                case 'ignore':
                    $ignoreFlag = true;
                    continue;
                default:
                    //die("ERROR: There isn't support for the tag - $name");
                }
            }
        }
 
        if(!$ignoreFlag)
            $doc['properties'] []= $propInfo;
    }
 
    ob_start();
 
    render($doc);
 
    $output = ob_get_contents();
    ob_end_clean();
 
    if(DEBUG)
    {
        echo $output;
    }
    else
    {
        $filename = "api/".strtolower($className).'.rst';
        echo "Writing rst for $className to $filename\n\n";
        file_put_contents($filename, $output);
    }
}
 
function create_line($value, $repeat = '=')
{
    return str_repeat($repeat, strlen($value));
}
 
function create_paramlist ($method)
{
    $names = array();
 
    if(isset($method['params'])) {
           
        foreach($method['params'] as $param)
        {
            $names []= $param['name'];
        }
 
        return "(" . implode(', ', $names) . ")";
    } else {
        return "";
    }
}
 
 
function print_tabs($ntab = 1)
{
    $tabWidth = 4;
    echo str_repeat(' ', $ntab * $tabWidth);
}
 
function render($doc){
    echo $doc['className']; // Class Name
    echo "\n"; // New line
    echo create_line($doc['className'], '='); // double underline
 
 
    echo "\n\n.. php:class:: ".$doc['className']."\n";
 
    // shift one tab space
    print_tabs();
    echo "\n";
 
    print_block_indented($doc['classDesc'], 1);
 
    print_tabs();
    echo "\n";
 
 
    foreach($doc['methods'] as $method) {
        if(empty($method)) {
            continue;
        }
       
        print_tabs(1);
        echo ".. php:method:: ".$method['name'] .' '. create_paramlist($method)."\n";
        print_tabs(1);
        print("\n");
               
        if(isset($method['desc'])) {
            print_block_indented($method['desc'], 2);
           
            echo print_tabs(2);
            echo "\n";            
        }
       
        if(isset($method['params'])) {
            foreach($method['params'] as $param)
            {
                print_tabs(2);
                echo ':param '.$param['type']. ' '.$param['name'].': '.$param['desc'];
                echo "\n";
            }
        }
 
        print_tabs(2);
        echo "\n";
    }
 
    if(isset($doc['properties'])) {
        foreach($doc['properties'] as $prop) {
            print_tabs(1);
            echo ".. php:attr:: " . $prop['name'] . "\n\n";
            if(isset($prop['desc'])) {
                print_block_indented($prop['desc'], 2);
                echo "\n\n";
            }
 
            if(isset($prop['type']))
            {
                print_tabs(2);
                echo str_repeat("=",9) . " " . str_repeat("=",25) . "\n";
            }
 
            if(isset($prop['type'])) {
                print_tabs(2);
                echo "Type:" . str_repeat(" ",4) . " " . $prop['type'] . str_repeat(" ", abs(strlen($prop['type'] - 25))) . "\n";
 
                print_tabs(2);
                echo str_repeat("=",9) . " " . str_repeat("=",25) . "\n";
            }
 
            if(isset($prop['type'])) {
                $defaultText = "(unset)";
               
                if(isset($prop['default']))
                    $defaultText = $prop['default'];
 
                if(is_null($defaultText))
                {
                    $defaultText = "null";
                }
                else
                {
                    $defaultText = json_encode($defaultText);
                }
               
                print_tabs(2);
                echo "Default:" . str_repeat(" ",1) . " " . $defaultText . str_repeat(" ", abs(strlen($defaultText) - 25)) . "\n";
            }
 
            if(isset($prop['type']))
            {
                print_tabs(2);
                echo str_repeat("=",9) . " " . str_repeat("=",25) . "\n";
            }
 
            echo "\n";
        }
    }
}
 
function print_block_indented($content, $indentation_level)
{
    $lines = explode("\n", $content);
    foreach ($lines as $line) {
        print_tabs($indentation_level);
        echo trim($line)."\n";
    }
}
 
function get_all_parents($className)
{
    $targetClass = $className;
    $parents = array();
 
    while(1)
    {
        $targetParent = get_parent_class($targetClass);
 
        if($targetParent === false)
        {
            break;
        }
 
        $parents []= $targetParent;
        $targetClass = $targetParent;
    }
 
    return $parents;
}