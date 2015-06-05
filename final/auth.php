<?php
// ************************************************************************************************
// ************************************************************************************************
// auth.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
include_once 'dbConnect.php';

session_start();

// Get the username.
if (isset($_POST['username']) && !empty($_POST['username']))
	$username = $_POST['username'];
else {
	$db->close();
	die('{"status":"fail","data":"Please enter a username"}');
}
	
// Get the password.
if (isset($_POST['password']) && !empty($_POST['password']))
	$password = $_POST['password'];
else {
	$db->close();
	die('{"status":"fail","data":"Please enter a password"}');
}

// If we're here, we have all the credentials. Attempt to authenticate the login.
$query = $db->prepare("SELECT id, username FROM final_account WHERE username=? AND password=?");
$query->bind_param("ss", $username, $password);
$query->execute();
$query->bind_result($id, $username);

if ($query->fetch()) {
	$_SESSION['LOGIN_STATUS'] = true;
	$_SESSION['USER'] = $username;
	$_SESSION['ID'] = (int) $id;
	$query->close();
	$db->close();
	die('{"status":"success","data":{"id":"' . $id . '"}}');
} else {
	$query->close();
	$db->close();
	die('{"status":"fail","data":"No matching credentials exist"}');
}
?>