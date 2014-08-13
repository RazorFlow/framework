<?php
global $data;

echo "using System;\n";
echo "using System.Collections;\n";
echo "namespace Razorflow {\n";

function renderNETProp ($key, $prop) {
	$rhs = "";
	if ($prop['type'] == 'PropertyBase') {
		$rhs = "new ".$prop['class']."()";
	}
	else if ($prop['type'] == 'PropertyList') {
		$rhs = 'new PropertyList("'.$prop['class'].'")';
	}
	else if (isset($prop['default'])) {
		$rhs = json_encode($prop['default']);
	}
	else {
		$rhs = 'null';
	}
	
	return $rhs;
}

function renderNETClass ($name, $obj) {
?>
public class <?php echo $name; ?> : <?php echo $obj['base']; ?>	{
	public <?php echo $name; ?> () : base ()
	{
		var prop = new Hashtable ();
<?php
foreach ($obj['properties'] as $key => $prop) {
	echo '		prop.Add("'.$key.'", '.renderNETProp ($key, $prop).');';
	echo "\n";
}

?>
		base.register (prop);
	}
}
<?php
}

foreach ($data as $name => $obj)
{
	renderNETClass ($name, $obj);
}

echo "}";