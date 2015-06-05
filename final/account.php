<?php
// ************************************************************************************************
// ************************************************************************************************
// account.php
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
<title>Final Account Creation</title>
<script src="jquery-1.11.0.min.js"></script>
<script src="final.js"></script>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="content">
		<h1>CS290 Final Project</h1>
		<h2>Account Creation</h2>
		<div id="err">
			<span id="errmsg"></span>
		</div>

		<div id="createBox">
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
					<td colspan="2"><button onclick="accountClick()">Create</button></td>
				</tr>
			</table>
			<p>Already have an account? Log in <a href="login.php">here</a></p>
		</div>
	</div>

</body>
</html>