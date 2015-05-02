<?php
// ************************************************************************************************
// ************************************************************************************************
// loopback.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Assignment 4
// ************************************************************************************************
// ************************************************************************************************



$params = NULL;
if (strcmp($_SERVER['REQUEST_METHOD'], "GET") == 0)
	$params = $_GET;
else
	$params = $_POST;

if (empty($params))
	$params = NULL;

echo(json_encode(array(
	'Type' => $_SERVER['REQUEST_METHOD'],
	'parameters' => $params
)));
?>