<?php

require $_SERVER['DOCUMENT_ROOT'] . "/static/transfer/build/tour/motherboard.php";

$db = new SalesDashboard();
echo $db->getJSONForAction();