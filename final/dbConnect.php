<?php
// ************************************************************************************************
// ************************************************************************************************
// dbConnect.php
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
//
// This file is used as an include from other files to connect to my ONID db.
// ************************************************************************************************
// ************************************************************************************************
$DBHOST = "oniddb.cws.oregonstate.edu";
$DBUSER = "santosch-db";
$DBNAME = "santosch-db";
$DBPASS = "nope";

$db = new mysqli($DBHOST, $DBUSER, $DBPASS, $DBNAME);

// Connect to the DB.
if ($db->connect_errno)
	die("Failed to connect to database.");