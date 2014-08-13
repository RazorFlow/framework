<?php
global $data;

echo "<?php\n";

function renderPHPProp ($key, $prop) {
	$rhs = "";
	if ($prop['type'] == 'PropertyBase') {
		$rhs = "new ".$prop['class']."()";
	}
	else if ($prop['type'] == 'PropertyList') {
		$rhs = "new PropertyList('".$prop['class']."')";
	}
	else if (isset($prop['default'])) {
		$rhs = json_encode($prop['default']);
	}
	else {
		$rhs = 'null';
	}
	
	return "			'$key' => ".$rhs;
}

function renderPHPClass ($name, $obj) {
?>
class <?php echo $name; ?> extends <?php echo $obj['base']; ?> {
	public function init () {
		parent::init ();
		
		$this->register (array(
<?php $propValueStrings = array(); foreach ($obj['properties'] as $key => $prop) {
	$propValueStrings []= renderPHPProp ($key, $prop);
}
echo implode(",\n", $propValueStrings);
?>

		));
	}
}
<?php
}

foreach ($data as $name => $obj) 
{
	renderPHPClass ($name, $obj);
}