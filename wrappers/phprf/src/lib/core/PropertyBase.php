<?php

class PropertyBase {
    /**
     * Setters
     */
    public function setValue ($path, $value) {
        $parts = $this->getParts ($path);

        if ($parts['terminal'] && !$this->isPropBase ($parts['root'])) {
            $this->data[$parts['key']] = $value;
            $this->patch ('setValue', $this->makeFullPath($parts['key']), $value);
        }
        else if (!$parts['terminal'] && $this->isPropBase($parts['root'])) {
            $parts['root']->setValue ($parts['rest'], $value);
        }
        else {
            RFAssert::Exception ("cannot set value to pb", $parts);
        }
    }

    public function setRootObject ($object, $noTrigger = true) {
        if(is_null($object)) {
            return;
        }
        foreach ($object as $key => $value) {
            if (array_key_exists($key, $this->data)) {
                if ($this->isProp($this->data[$key])) {
                    $this->data[$key]->setRootObject ($object[$key], true);
                }
                else {
                    $this->data[$key] = $object[$key];
                }
            }
            else {
                RFAssert::Exception ("unknown key $key in data");
            }
        }

        $this->patch ('setRootObject', $this->makeFullPath(''), $object);
    }

    public function setObjectAtPath ($path, $object) {
        $parts = $this->getParts ($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isProp ($root))  {
            $root->setRootObject ($object, true);

            $this->patch ('setObjectAtPath', $this->makeFullPath($parts['key']), $object);
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            $root->setObjectAtPath ($parts['rest'], $object);
        }
        else {
            RFAssert::Exception ("Cannot set an object to this pb", $parts);
        }
    }

    public function addItemToList ($path, $id, $item) {
        $parts = $this->getParts ($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isPropList ($root))  {
            $root->addItem ($id, $item, true);

            $this->patch ('addItemToList', $this->makeFullPath($parts['key']), array(
                'id' => $id,
                'item' => $item
            ));
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            $root->addItemToList ($parts['rest'], $id, $item);
        }
        else {
            RFAssert::Exception ("Cannot set an object to this pb", $parts);
        }

    }


    public function emptyList($path) {
        $parts = $this->getParts ($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isPropList ($root))  {
            $root->emptyList ();

            $this->patch ('emptyList', $this->makeFullPath($parts['key']), array(
            ));
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            $root->emptyList($parts['rest']);
        }
        else {
            RFAssert::Exception ("Cannot empty this property list", $parts);
        }

    }

    public function pushItemToList ($path, $item) {
        $parts = $this->getParts ($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isPropList ($root))  {
            $root->pushItem ($item, true);

            $this->patch ('pushItemToList', $this->makeFullPath($parts['key']), array(
                'item' => $item
            ));
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            $root->pushItemToList ($parts['rest'], $item);
        }
        else {
            RFAssert::Exception ("Cannot set an object to this pb", $parts);
        }
    }

    /**
     * Getters
     */

    public function getValue ($path) {
        $parts = $this->getParts ($path);

        if($parts['terminal'] && !$this->isProp ($parts['root'])) {
            return $this->data[$parts['key']];
        }
        else if (!$parts['terminal'] && $this->isPropBase ($parts['root'])) {
            return $parts['root']->getValue ($parts['rest']);
        }

        RFAssert::Exception ("Cannot get value for $path");
    }

    public function getRootObject () {
        $res = array();

        foreach ($this->data as $key => $value) {
            if ($this->isProp ($value)) {
                $res[$key] = $value->getRootObject ();
            }
            else {
                $res[$key] = $this->data [$key];
            }
        }

        return $res;
    }

    public function getObjectAtPath ($path) {
        $parts = $this->getParts($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isProp ($root)) {
            return $root->getRootObject();
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            return $root->getObjectAtPath ($parts['rest']);
        }
        else {
            RFAssert::Exception ("Cannot get object at $path");
        }
    }

    public function getListItem ($path, $index) {
        $parts = $this->getParts ($path);
        $root = $parts['root'];

        if ($parts['terminal'] && $this->isPropList ($root))  {
            return $root->getListItem ($index);
        }
        else if(!$parts['terminal'] && $this->isPropBase ($root)) {
            return $root->getListItem ($parts['rest'], $index);
        }
        else {
            RFAssert::Exception ("Cannot get a list itemthis pb", $parts);
        }
    }

    protected $data = array();
    protected $cobj = null;
    protected $basePath = "";

    /**
     * Utilities
     */
    protected function register ($items) {
        foreach ($items as $key => $value) {
            $this->data[$key] = $value;
        }
    }

    public function setBasePath ($basePath) {
        $this->basePath = $basePath;
        foreach($this->data as $key => $value) {
            if ($this->isProp($value)) {
                $newPath = $key;

                if($this->basePath !== "") {
                    $newPath = $basePath.'.'.$key;
                }

                $value->setBasePath ($newPath);
            }
        }
    }

    public function linkToComponent ($component) {
        $this->cobj = $component;

        foreach ($this->data as $key => $value) {
            if($this->isProp($value)) {
                $value->linkToComponent ($component);
            }
        }
    }

    protected function patch ($action, $path, $params) {
        if($this->cobj !== null) {
            $this->cobj->__addPatch ($action, $path, $params);
        }
    }

    protected function getParts ($path) {
        $parts = explode ('.', $path);
        $firstPart = $realKey = $parts[0];
        $terminal = count($parts) == 1;


        if(stripos($firstPart, "[") !== false) {
            $keyParts = explode ('[', $firstPart);

            $accessor = substr($keyParts[1], 0, strlen($keyParts[1]) - 1);

            $realKey = $keyParts[0];

            if($this->data[$realKey] instanceof PropertyList) {
                if(is_numeric($accessor)) {
                    $root = $this->data[$realKey]->getAtIndex(intval($accessor));
                }
                else
                {
                    $root = $this->data[$realKey]->getAtId($accessor);
                }
            }
            else {
                RFAssert::Exception ("Cannot find a property list where expected");
            }
        }
        else {
            $root = $this->data[$firstPart];
        }

        if(!array_key_exists($realKey, $this->data)) {
            RFAssert::Exception ("Unable to find key for $path");
        }


        array_shift($parts);

        return array(
            'root' => $root,
            'key' => $realKey,
            'rest' => implode ('.', $parts),
            'terminal' => $terminal
        );
    }

    private function isPropBase ($item) {
        if (isset($item)) {
            if($item instanceof PropertyBase) {
                return true;
            }
        }
        return false;
    }

    private function isPropList ($item) {
        if (isset($item)) {
            if($item instanceof PropertyList ) {
                return true;
            }
        }
        return false;
    }




    private function isProp($item) {
        return $this->isPropBase ($item) || $this->isPropList ($item);
    }

    protected function init () {
        // do nothing for now
    }

    public function __construct () {
        $this->init();
    }

    protected function makeFullPath ($key) {
        if($this->basePath !== "")
            return $this->basePath.".".$key;
        else {
            return $key;
        }
    }
}

class PropertyList {
    protected $objType;

    public function __construct ($type) {
        $this->objType = $type;
    }
    protected $objectMode = false;
    protected $dataArr = array();
    protected $dataObj = array();
    /**
     * Setters
     */

    public function setRootObject($object, $noTrigger = true) {
        if(is_null($object)) {
            return;
        }
        if (!isset($object[0])) {
            $this->objectMode = true;
        }

        if ($this->objectMode) {
            foreach($object as $key => $value) {
                $this->addItem ($key, $value);
            }
        }
        else {
            for ($i = 0; $i < count($object); $i++) {
                $this->pushItem ($object[$i]);
            }
        }
    }

    public function addItem ($key, $item, $noTrigger = true) {
        $this->objectMode = true;

        $obj = $this->makeObject ($item, $key);
        $this->dataObj[$key]  = $obj;

        return $obj;
    }

    public function pushItem ($item, $noTrigger = true) {
        $this->objectMode = false;

        $obj = $this->makeObject ($item, count($this->dataArr));
        $this->dataArr []= $obj;

        return $obj;
    }

    public function emptyList () {
        if($this->objectMode) {
            $this->dataObj = array();
        }
        else {
            $this->dataArr = array();
        }
    }

    /**
     * Getters
     */

    public function getRootObject () {
        $res = array();
        if($this->objectMode) {
            foreach ($this->dataObj as $key => $value) {
                $res[$key] = $this->dataObj[$key]->getRootObject ();
            }
        }
        else {
            for ($i = 0; $i < count($this->dataArr); $i++) {
                $res []= $this->dataArr[$i]->getRootObject ();
            }
        }

        return $res;
    }

    public function getListItem ($index) {
        if($this->objectMode) {
            return $this->dataObj[$index];
        }
        else {
            return $this->dataArr[$index];
        }
    }

    public function getAtIndex ($index) {
        return $this->dataArr [$index];
    }

    public function getAtId ($id) {
        return $this->dataObj[$id];
    }

    /**
     * Utilities
     */
    protected $cobj = null;
    protected $basePath = "";
    public function linkToComponent ($component) {
        $this->cobj = $component;
    }
    private function makeObject ($item, $index) {
        if ($item instanceof PropertyBase) {
            return $item;
        }

        $newItem = new $this->objType ();
        $newItem->setRootObject ($item);

        if($this->cobj !== null) {
            $newItem->linkToComponent ($this->cobj);
        }

        $newItem->setBasePath ($this->basePath."[$index]");

        return $newItem;
    }

    public function setBasePath ($basePath) {
        $this->basePath = $basePath;

        if($this->objectMode) {
            foreach($this->dataObj as $key => $value) {
                $value->setBasePath ("$basePath[$key]");
            }
        }
        else {
            for($i = 0; $i < count($this->dataArr); $i++) {
                $value = $this->dataArr[$i];
                $value->setBasePath ("$basePath[$i]");
            }
        }
    }
}
