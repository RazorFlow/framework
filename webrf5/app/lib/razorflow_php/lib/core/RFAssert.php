<?php

class RFAssert {
    public static function Exception ($message, $object = array()) {
        throw new Exception($message);
    }
} 