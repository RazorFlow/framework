define([
    'prop/propertybase',
    'prop/propertylist'
], function (PropertyBase, PropertyList) {
	var exports = {};
<?php
global $data;

function renderProp ($key, $prop, $className) {
	$rhs = "";
	if ($prop['type'] == 'PropertyBase') {
		$rhs = "new ".$prop['class']."()";
	}
	else if ($prop['type'] == 'PropertyList') {
		$rhs = "new PropertyList(".$prop['class'].")";
	}
	else if (isset($prop['default'])) {
		$rhs = json_encode($prop['default']);
	}
	else {
		$rhs = 'null';
	}
	
	$declaration = "		'$key':".$rhs;
	
	$type = $prop['type'];
	
	if($type == "PropertyBase" || $type == "PropertyList") {
		$type = $prop['class'];
	}
	
	$type = "{".$type."}";
	
	$jsdoc = "";

	return $declaration;
}

function renderClass ($name, $obj) {
	$propValueStrings = array();
	
	foreach($obj['properties'] as $key => $prop) {
		$propValueStrings []= renderProp ($key, $prop, $name);
	}
?>

function <?php echo $name; ?>() {
	<?php echo $obj['base']; ?>.call(this);
	
	this.register ({
<?php echo implode(",\n", $propValueStrings);?>

	});
}
exports.<?php echo $name; ?> = <?php echo $name; ?>;


<?php
}
foreach ($data as $name => $obj) 
{
	renderClass ($name, $obj);
}
?>
	return exports;
});
