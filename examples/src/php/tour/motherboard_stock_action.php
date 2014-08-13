<?php

require $_SERVER['DOCUMENT_ROOT'] . "/static/transfer/build/tour/motherboard_stock.php";

$db = new StockDashboard();
echo $db->getJSONForAction();