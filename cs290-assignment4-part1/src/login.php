<?php
// ************************************************************************************************
// ************************************************************************************************
// login.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Assignment 4
// ************************************************************************************************
// ************************************************************************************************



session_start();
?>



<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PHP Session Input</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<h1>PHP Session Input</h1>

		<form name="input" action="content1.php" method="POST">
			<table>
					<tr>
						<td><label>Username</label></td>
						<td><input name="username"></input></td>
					</tr>
					<tr>
						<td colspan="2">
							<button name="Login" value="submit" type="submit">Login</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</body>
</html>