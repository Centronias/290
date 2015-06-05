<?php
// ************************************************************************************************
// ************************************************************************************************
// history.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
session_start();

// If we do not have a session, redirect to the login page.
if (!isset($_SESSION['LOGIN_STATUS']))
	header('Location: login.php');

include_once 'dbConnect.php';

$user = $_SESSION['ID'];

if (isset($_GET['id']) && !empty($_GET['id']) && isset($_GET['name']) && !empty($_GET['name'])) {
	$id = $_GET['id'];
	$sumname = $_GET['name'];

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
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Match History</title>
	<script src="jquery-1.11.0.min.js"></script>
	<script src="final.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body <?php if (isset($sumname)) echo('onload="populateHistory()"'); ?> >
	<div class="content">
		<p>Hello, <b><?= $_SESSION['USER'] ?></b></p>
		<p><a onclick="logout()">Log out</a></p>
		<h1>Match History</h1>

		<h2>Search</h2>
		<table><tr>
			<td><label>Summoner Name</label></td>
			<td><input type="text" id="in_summonername" <?php if (isset($sumname)) echo('value="' . $sumname . '"'); ?>></td>
			<td><button onclick="populateHistory()">Search</button></td>
		</tr></table>
		<span id="errmsg"></span>

		<h2>Results</h2>
		<p><i>Click a match's row to view more detailed information about that match</i></p>
		<input id="out_summonerid" type="hidden" <?php if (isset($id)) echo('value="' . $id . '"'); ?>>
		<table>
			<tr>
				<td>Summoner Name</td>
				<td id="out_summonername"><?php if (isset($sumname)) echo($sumname); ?></td>
			</tr>
			<tr>
				<td>Number of Favorites</td>
				<td id="out_numfavs"><?php if (isset($count)) echo($count); ?></td>
				<td>
					<a id="log_fave" onclick="addFavorite()" href="#">Add favorite</a>
					<a id="log_unfave" style="display: none;" onclick="removeFavorite()" href="#">Remove Favorite</a>
				</td>
			</tr>
			<tr>
				<td>Summoner Note</td>
				<td>
					<p id="out_sumnote"><?php if (isset($comment)) echo($comment); ?></p>
					<input id="in_sumnote" type="text" style="display: none;" href="#">
				</td>
				<td>
					<a id="log_add" href="#" onclick="editNote()">Add/Edit note</a>
					<a id="log_set" style="display: none;" href="#" onclick="setNote()">Set Note</a>
				</td>
			</tr>
		</table>
		<br>
		<table>
			<thead>
				<th>Mode</th>
				<th>When</th>
				<th>Length</th>
				<th>Result</th>
				<th>Champion Played</th>
				<th>KDA</th>
			</thead>
			<tbody id="out_matchlist"></tbody>
		</table>
	</div>
	<div class="footer">
		<p>This application isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
	</div>
</body>
</html>