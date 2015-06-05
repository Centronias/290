<?php
// ************************************************************************************************
// ************************************************************************************************
// login.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************
session_start();

// If we already have a session, redirect to the match history page.
if (isset($_SESSION['LOGIN_STATUS']))
	header('Location: history.php');

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Final Login</title>
<script src="jquery-1.11.0.min.js"></script>
<script src="final.js"></script>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="content">
		<h1>CS290 Final Project</h1>
		<h2>Login</h2>
		<div id="err">
			<span id="errmsg"></span>
		</div>

		<div id="loginbox">
			<table>
				<tr>
					<td><label>Username</label></td>
					<td><input type="text" id="username"></td>
				</tr>
				<tr>
					<td><label>Password</label></td>
					<td><input type="password" id="password"></td>
				</tr>
				<tr>
					<td colspan="2"><button onclick="loginClick()">Log In</button></td>
				</tr>
			</table>
			<p>No account? Make one <a href="account.php">here</a></p>
			<p>Note that absolutely no effort is included to obscure passwords or ensure password strength for this websites. Passwords are transmitted and stored in cleartext. You should never reuse passwords between website, but please especially do not do so here.</p>
			<p>Confused? Check out the <a href="about.html">About page</a></p>
		</div>
	</div>
	<div class="footer">
		<p>This application isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
	</div>
</body>
</html>