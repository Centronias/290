<?php
// ************************************************************************************************
// ************************************************************************************************
// match.php
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
	header('Location: login.php');

if (!isset($_REQUEST['match']))
	header('Location: history.php');

$id = $_REQUEST['match'];
$user = $_SESSION['ID'];

$favorite = false;
$comment = "";
$query = $db->prepare("SELECT favorite, comment FROM final_matches where user_id=? and match_id=?");
$query->bind_param("ii", $user, $id);
$query->execute();
$query->bind_result($favorite, $comment);
$query->fetch();
$query->close();

$count = 0;
$faves = $db->prepare("SELECT COUNT(*) FROM final_matches WHERE match_id=? and favorite=True");
$faves->bind_param("i", $id);
$faves->execute();
$faves->bind_result($count);
$faves->fetch();
$faves->close();

$db->close();

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Match Details</title>
	<script src="jquery-1.11.0.min.js"></script>
	<script src="final.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body onload="populateMatch()">
	<div class="content">
		<p>Hello, <b><?= $_SESSION['USER'] ?></b></p>
		<p><a onclick="logout()">Log out</a> - <a href="history.php">Summoner search</a></p>
		<h1>Match Details</h1>
		<p><i>Click a user's row to view their recent matches</i></p>
		<span id="errmsg"></span>

		<input type="hidden" id="in_matchId" <?= 'value="' . $_REQUEST['match'] . '"' ?>>
		<table>
			<tr>
				<td>Match Type</td>
				<td id="out_type"></td>
			</tr>
			<tr>
				<td>Number of Favorites</td>
				<td id="out_numfavs"><?php if (isset($count)) echo($count); ?></td>
				<td>
					<a id="log_fave" <?php if ($favorite) echo('style="display: none;"'); ?>onclick="addFavoriteM()" href="#">Add favorite</a>
					<a id="log_unfave" <?php if (!$favorite) echo('style="display: none;"'); ?> onclick="removeFavoriteM()" href="#">Remove Favorite</a>
				</td>
			</tr>
			<tr>
				<td>Match Note</td>
				<td>
					<p id="out_sumnote"><?php if (isset($comment)) echo($comment); ?></p>
					<input id="in_sumnote" type="text" style="display: none;" href="#">
				</td>
				<td>
					<a id="log_add" href="#" onclick="editNote()">Add/Edit note</a>
					<a id="log_set" style="display: none;" href="#" onclick="setNoteM()">Set Note</a>
				</td>
			</tr>
			<tr>
				<td>Winner</td>
				<td id="out_winner"></td>
			</tr>
		</table>
		<br>
		<table>
			<tr>
				<td>Team 1</td>
				<td>Team 2</td>
			</tr>
			<tr>
				<td><table>
					<thead>
						<th>Champion</th>
						<th>Player</th>
						<th>KDA</th>
						<th>Creep Score</th>
						<th>Gold Earned</th>
					</thead>
					<tbody id="out_team1"></tbody>
				</table></td>
				<td><table>
					<thead>
						<th>Champion</th>
						<th>Player</th>
						<th>KDA</th>
						<th>Creep Score</th>
						<th>Gold Earned</th>
					</thead>
					<tbody id="out_team2"></tbody>
				</table></td>
			</tr>
		</table>
	</div>
	<div class="footer">
		<p>This application isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
	</div>
</body>
</html>