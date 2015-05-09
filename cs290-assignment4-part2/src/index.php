<?php
// ************************************************************************************************
// ************************************************************************************************
// multtable.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Assignment 4
// ************************************************************************************************
// ************************************************************************************************



error_reporting(E_ALL);
$msg = "";

$host	= "oniddb.cws.oregonstate.edu";
$user	= "santosch-db";
$name	= "santosch-db";
$pass	= "ZmcdpubP1A8GdcWt";

$db = new mysqli($host, $user, $pass, $name);

// Connect to the DB.
if ($db->connect_errno)
	die("Failed to connect to database.");


// Delete all as necessary.
if (isset($_POST['delete_all'])) {
	$cull = "DELETE FROM `four`;";

	if ($db->query($cull) == 0)
		$msg = $msg . "<p>Failed to cull.<br>" . $cull . "</p>";
}


// Delete as necessary.
if (isset($_POST['delete'])) {
	$delete = "DELETE FROM `four` WHERE `id` = "
		. $db->escape_string($_POST['delete']) . ";";

	if ($db->query($delete) == 0)
		$msg = $msg . "<p>Failed to delete.<br>" . $delete . "</p>";
}


// Check as necessary.
if (isset($_POST['check'])) {
	$check = "UPDATE `four` SET `rented` = NOT rented WHERE `id` = "
		. $db->escape_string($_POST['check']) . ";";

	if ($db->query($check) == 0)
		$msg = $msg . "<p>Failed to check in / out.<br>" . $check . "</p>";
}


// If variables were POSTed, validate then insert them.
if (isset($_POST['name'])
	&& isset($_POST['category'])
	&& isset($_POST['length'])) {

	$insert = true;
	if (empty($_POST['name'])) { 
		$msg = $msg . "<p>You must include a name</p>";
		$insert = false;
	}
	if (empty($_POST['category'])) {
		$msg = $msg . "<p>You must include a category</p>";
		$insert = false;
	}
	if (empty($_POST['length']) || $_POST['length'] < 0) {
		$msg = $msg . "<p>Length must be a positive number</p>";
		$insert = false;
	}

	if ($insert) {
	$insert = "INSERT INTO `four` (`name`, `category`, `length`, `rented`) VALUES('"
		. $db->escape_string($_POST['name'])	 			 . "','"
		. $db->escape_string(strtolower($_POST['category'])) . "',"
		. $db->escape_string($_POST['length'])	 			 . ","
		. $db->escape_string("0")			 			 	 . ");";

	if ($db->query($insert) == 0)
		$msg = $msg . "<p>Failed to insert.<br>" . $insert . "</p>";
	}
}


// Get the existing rows.
$select = "";
$result = null;
if (isset($_POST['filter']) && !empty($_POST['filter']))
	$select = "SELECT * FROM `four` WHERE `category` = '"
		. $db->escape_string($_POST['filter']) . "';";
else
	$select = "SELECT * FROM `four`;";

if (($result = $db->query($select)) == 0)
	$msg = $msg . "<p>Failed to select.<br>" . $select . "</p>";


// Get the possible filter values
$fquery = "SELECT DISTINCT `category` FROM `four`;";
if (($filters = $db->query($fquery)) == 0)
	$msg = $msg . "<p>Failed to get filters.<br>" . $fquery . "</p>";
?>



<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PHP Database</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<h1>PHP Database</h1>

		<h2>Add Video</h2>
		<div id="err"><?php echo($msg); ?></div>
		<form action="#" method="POST">
			<table>
				<thead>
					<tr><th>Name</th><th>Category</th><th>Length</th></tr>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" name="name"></td>
						<td><input type="text" name="category"></td>
						<td><input type="number" name="length"></td>
					</tr>
					<tr>
						<td colspan="3"><input type="submit"></td>
					</tr>
				</tbody>
			</table>
		</form>

		<h2>Current Videos</h2>

		<form action="#" method="POST">
			<label>Filter by Category</label>
			<select name="filter">
				<option value=""></option>
<?php
	ob_start();

	while ($row = $filters->fetch_assoc()):
?>
				<option value=<?php echo("\"" . $row['category'] . "\""); ?>><?php echo($row['category']); ?></option>
<?php
	endwhile;
	ob_end_flush();
?>
			</select>
			<input type="submit" value="Filter">
		</form>

		<table>
			<thead>
				<tr><th>Name</th><th>Category</th><th>Length</th><th>Availability</th><th>Check In / Out</th><th>Delete</th></tr>
			</thead>
			<tbody>
<?php
	ob_start();

	if (mysql_num_rows($result) == 0)
		echo(`<tr><td colspan="5">No results</td></tr>`);

	while ($row = $result->fetch_assoc()):
?>				
				<tr>
					<td><?php echo($row['name']); ?></td>
					<td><?php echo($row['category']); ?></td>
					<td><?php echo($row['length']); ?></td>
					<td><?php echo($row['rented'] ? "checked out" : "available"); ?></td>
					<td><form action="#" method="POST">
						<input type="submit" value="Check">
						<input type="hidden" name="check" value=<?php echo("\"". $row['id'] . "\"") ?>>
					</form></td>
					<td><form action="#" method="POST">
						<input type="submit" value="Delete">
						<input type="hidden" name="delete" value=<?php echo("\"". $row['id'] . "\"") ?>>
					</form></td>
				</tr>
<?php
	endwhile;
	ob_end_flush();

	$db->close();
?>
			</tbody>
		</table>

		<form action="#" method="POST">
			<input type="submit" value="Delete All">
			<input type="hidden" name="delete_all" value="do">
		</form>
	</body>
</html>