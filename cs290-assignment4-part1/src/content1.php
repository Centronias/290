<?php
// ************************************************************************************************
// ************************************************************************************************
// content1.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Assignment 4
// ************************************************************************************************
// ************************************************************************************************



session_start();
$accept = FALSE;

// If the session has been set up, don't worry about the username and just work like normal.
if (isset($_SESSION['username']))
	$accept = TRUE;
else {
	// If the session has not been set up, check for a username.
	if (!isset($_POST['username'])) {
		// If there's no username, redirect to the login page.
		header('Location: login.php');
		die();
	} else {
		if (empty($_POST['username']))
			// If there's an empty username, print the error message.
			$accept = FALSE;
		else {
			// If we have a proper username, set up the session and reload the page.
			$_SESSION['username'] = $_POST['username'];
			$_SESSION['visits'] = 0;
			header('Location: content1.php');
			die();
		}
	}
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
		<h1>PHP Content1</h1>

<?php if ($accept) { ?>
		<p>
			Hello <?php echo($_SESSION['username']); ?>, you have visited this
			page <?php echo($_SESSION['visits']++); ?> times before. Click
			<a href="logout.php">here</a> to log out.
		</p>

		<p>
			<a href="content2.php">Content2</a>
		</p>
<?php } else { ?>
		<p>
			A username must be entered. Click <a href="login.php">here</a> to
			return to the login screen.
		</p>
<?php } ?>
	</body>
</html>