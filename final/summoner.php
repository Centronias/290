<?php
// ************************************************************************************************
// ************************************************************************************************
// summoner.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
include_once 'dbConnect.php';

session_start();

if (isset($_SESSION['ID']))
	$user = $_SESSION['ID'];
else {
	$db->close();
	die('{"status":"no user","data":NULL}');
}

if (isset($_GET['id']) && !empty($_GET['id']))
	$id = $_GET['id'];
else {
	$db->close();
	die('{"status":"no id","data":NULL}');
}

$favorite = false;
$comment = "";
$query = $db->prepare("SELECT favorite, comment FROM final_summoners where user_id=? and summoner_id=?");
$query->bind_param("ii", $user, $id);
$query->execute();
$query->bind_result($favorite, $comment);
$query->fetch();
$query->close();

$count = 0;
$faves = $db->prepare("SELECT COUNT(*) FROM final_summoners WHERE summoner_id=? and favorite=True");
$faves->bind_param("i", $id);
$faves->execute();
$faves->bind_result($count);
$faves->fetch();
$faves->close();

$res = array(
		'favorite' => $favorite,
		'comment' => $comment,
		'count' => $count,
	);

$db->close();
die('{"status":"success","data":' . json_encode($res) . '}');
?>