<?php
/**
 * Array Utility class
 * @class ArrayUtils
 */
class ArrayUtils {
  /**
  * This is a static method and can be used to extract a column from the result of a SQL query fetched as an associative array
  * @method pluck
  * @param {Array} $data The data
  * @param {String} $columnKey The key of the column to pluck
  * @param {Boolean} $replaceEmptyWithNull If there is no item found on that key, replace with a null (default true)
  * @example
  * $names = array(
  *    array('name' => 'moe', 'age' => 40),
  *    array('name' => 'larry', 'age' => 50),
  *    array('name' => 'curly', 'age' => 60)
  * );
  * ArrayUtils::pluck($names, 'name');
  *
  * ==> ["moe", "larry", "curly"]
  *
  * @return {array}
  */
  public static function pluck ($data, $columnKey, $replaceEmptyWithNull = true) {
  	$results = array();

  	foreach ($data as $row) {
  		if(isset($row[$columnKey])) {
  			$results []= $row[$columnKey];
  		}
  		else if ($replaceEmptyWithNull) {
  			$results []= null;
  		}
  	}

  	return $results;
  }	
}
