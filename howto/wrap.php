<?php
// ************************************************************************************************
// ************************************************************************************************
// wrap.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// How To
// ************************************************************************************************
// ************************************************************************************************



if (isset($_GET['req'])) {
	$res = "";
	if (strpos($_GET['req'], "?"))
		$res = file_get_contents("https://na.api.pvp.net" . $_GET['req'] . "&api_key=a6faa665-2c91-44c1-ba39-cbb2cb126337");
	else
		$res = file_get_contents("https://na.api.pvp.net" . $_GET['req'] . "?api_key=a6faa665-2c91-44c1-ba39-cbb2cb126337");		
	echo '{"status":"success","data":' . $res . '}';
} else
	die('{"status":"no request","data":NULL}');
?>