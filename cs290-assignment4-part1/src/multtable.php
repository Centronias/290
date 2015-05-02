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



ob_start();

// Get the parameters.
if (isset($_GET['min-multiplicand']))
	$nd = filter_var($_GET['min-multiplicand'], FILTER_VALIDATE_INT);
else
	echo("Missing parameter [min-multiplicand].<br>");

if (isset($_GET['max-multiplicand']))
	$xd = filter_var($_GET['max-multiplicand'], FILTER_VALIDATE_INT);
else
	echo("Missing parameter [max-multiplicand].<br>");

if (isset($_GET['min-multiplier']))
	$nr = filter_var($_GET['min-multiplier'], FILTER_VALIDATE_INT);
else
	echo("Missing parameter [min-multiplier].<br>");

if (isset($_GET['max-multiplier']))
	$xr = filter_var($_GET['max-multiplier'], FILTER_VALIDATE_INT);
else
	echo("Missing parameter [max-multiplier].<br>");

// Validate the parameters.
if (isset($nd) and !$nd)
	echo("[min-multiplicand] must be an integer.<br>");

if (isset($xd) and !$xd)
	echo("[max-multiplicand] must be an integer.<br>");

if (isset($nr) and !$nr)
	echo("[min-multiplier] must be an integer.<br>");

if (isset($xr) and !$xr)
	echo("[max-multiplier] must be an integer.<br>");

if (isset($xd) and isset($nd) and $xd and $nd and ($xd < $nd))
	echo("Minimum multiplicand larger than maximum.<br>");

if (isset($xr) and isset($nr) and $xr and $nr and ($xr < $nr))
	echo("Minimum multiplier larger than maximum.<br>");

$err = ob_get_clean();
?>



<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PHP Multiplication Table</title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<h1>PHP Multiplication Table</h1>

		<?php
			ob_start();
		?>

		<table>
			<tbody>
				<tr>
					<td></td>
					<?php
						for ($i = $nr; $i < $xr + 1; $i++)
							echo("<td>" . $i . "</td>");
					?>
				</tr>
				<?php
					for ($d = $nd; $d < $xd + 1; $d++) {
						echo("<tr><td>" . $d . "</td>");
						for ($r = $nr; $r < $xr + 1; $r++)
							echo("<td>" . $r * $d . "</td>");
						echo("</tr>");
					}
				?>
			</tbody>
		</table>
		<?php
			$buf = ob_get_clean();
			if (empty($err))
				echo($buf);
			else
				echo($err);
		?>
	</body>
</html>