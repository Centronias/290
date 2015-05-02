<?php
// ************************************************************************************************
// ************************************************************************************************
// content2.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Assignment 4
// ************************************************************************************************
// ************************************************************************************************



session_start();

// If the session has been set up, don't worry about the username and just work like normal.
if (!isset($_SESSION['username'])) {
	header('Location: login.php');
	die();
}
?>



<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PHP Session Strings</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<h1>PHP Content2</h1>
		<p>SpooooOOooooOOOOOOoky content.</p>
		<p><a href="content1.php">Content1</a></p>
	</body>
</html>