<?php
// ************************************************************************************************
// ************************************************************************************************
// togfav.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
include_once 'dbConnect.php';

session_start();

// If we do not have a session, redirect to the login page.
if (!isset($_SESSION['LOGIN_STATUS']))
	die('{"status":"fail","data":"Not logged in"}');

$id = $_SESSION['ID'];

// Get the summoner id.
if (isset($_POST['id']) && !empty($_POST['id']))
	$sum = $_POST['id'];
else {
	$db->close();
	die('{"status":"fail","data":"No ID"}');
}

$update = $db->prepare("UPDATE final_summoners SET favorite=NOT favorite WHERE summoner_id=? and user_id=?");
$update->bind_param("ii", $sum, $id);
$update->execute();
if (!$update->affected_rows) {
	$update->close();
	// There Is not already a row for this summoner / user combination. Insert one.
	$insert = $db->prepare('INSERT INTO final_summoners (summoner_id, user_id, favorite, comment) VALUES (?, ?, true, "")');
	$insert->bind_param("ii", $sum, $id);
	$insert->execute();
	$insert->close();
} else
	$update->close();

$count = 0;
$faves = $db->prepare("SELECT COUNT(*) FROM final_summoners WHERE summoner_id=? and favorite=TRUE");
$faves->bind_param("i", $sum);
$faves->execute();
$faves->bind_result($count);
$faves->fetch();
$faves->close();

$db->close();
die('{"status":"success","data":' . $count . '"}');
?>