<?php
// ************************************************************************************************
// ************************************************************************************************
// accountCreate.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
function checkName($username) {
	$VALIDCHARS_USERNAME = "._0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$VALIDCHARS_USERNAMESTART = "._" . $VALIDCHARS_USERNAME;
	
	if (strlen($username) < 3)
		return "Your username must be 3 characters or longer";
	if (strlen($username) > 15)
		return "Your username must be 15 characters or shorter";
	if ($res = strspn($username, $VALIDCHARS_USERNAME) != strlen($username))
		return "Your username contains an invalid character: \"" . substr($username, $res, 1) . "\"";
	if (strpos($username, " ") == strlen($username) - 1)
		return "Your username cannot end with a space";
	if (strspn($username, $VALIDCHARS_USERNAMESTART) == 0)
		return "Your username must begin with a letter or number";
	if (strpos($username, "  ") != false)
		return "Your username cannot contain two consecutive spaces";
	
	return "Success";
}

include_once 'dbConnect.php';

session_start();

// Get the username and check it.
if (isset($_POST['username']) && !empty($_POST['username'])) {
	$res = checkName($_POST['username']);
	if ($res == "Success")
		$username = $db->escape_string($_POST['username']);
	else
	die('{"status":"fail","data":"' . $res . '"}');
} else {
	die('{"status":"fail","data":"Please enter a username"}');
}

// Get the password and check it.
if (isset($_POST['password']) && !empty($_POST['password'])) {
	$password = $db->escape_string($_POST['password']);
} else {
	die('{"status":"fail","data":"Please enter a password"}');
}

// Check if the username is taken.
$query = $db->prepare("SELECT username FROM final_account WHERE username=?");
$query->bind_param("s", $username);
$query->execute();
$query->bind_result($res);
$query->fetch();
$query->close();

if ($res == $username) {
	$db->close();
	die('{"status":"fail","data":"This username is taken"}');
}
	
// If we're here, we can safely add the user to the table.
$query = $db->prepare("INSERT INTO final_account (username, password) VALUES (?, ?)");
$query->bind_param("ss", $username, $password);
$query->execute();
$query->close();

$db->close();
die('{"status":"success","data":null}');

?>