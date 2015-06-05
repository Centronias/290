// ************************************************************************************************
// ************************************************************************************************
// final.js
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// Final Project
// ************************************************************************************************
// ************************************************************************************************



// ************************************************************************************************
// Queue Type Dictionary
// ************************************************************************************************
var queueTypes = {
	// Normals
	"GROUP_FINDER_5x5": "Team Builder",
	"NORMAL_5x5_BLIND": "Normal",
	"NORMAL_5x5_DRAFT": "Draft",
	"NORMAL_3x3": "3 v 3",
	"RANKED_SOLO_5x5": "Ranked",
	"RANKED_PREMADE_5x5": "Ranked",
	"RANKED_TEAM_5x5": "Team Ranked",
	"RANKED_PREMADE_3x3": "Ranked 3 v 3",
	"RANKED_TEAM_3x3": "Team Ranked 3 v 3",

	// Bots
	"BOT_5x5": "Co-op vs AI",
	"BOT_ODIN_5x5": "Co-op vs AI Dominion",
	"BOT_5x5_INTRO": "Co-op vs AI",
	"BOT_5x5_BEGINNER": "Co-op vs AI",
	"BOT_5x5_INTERMEDIATE": "Co-op vs AI",
	"BOT_TT_3x3": "Co-op vs AI 3 v 3",

	// Dominion
	"ODIN_5x5_BLIND": "Dominion",
	"ODIN_5x5_DRAFT": "Draft Dominion",

	// Other
	"ARAM_5x5": "ARAM",
	"CUSTOM": "Custom",

	// Featured
	"ONEFORALL_5x5": "One for All",
	"FIRSTBLOOD_1x1": "Solo Snowdown Showdown",
	"FIRSTBLOOD_2x2": "Duo Snowdown Showdown",
	"SR_6x6": "Hexakill",
	"URF_5x5": "Hexakill (Twisted Treeline)",
	"ONEFORALL_MIRRORMODE_5x5": "One for All (Mirror)",
	"BOT_URF_5x5": "Ultra Rapid Fire",
	"NIGHTMARE_BOT_5x5_RANK1": "Doom Bots",
	"NIGHTMARE_BOT_5x5_RANK2": "Doom Bots",
	"NIGHTMARE_BOT_5x5_RANK5": "Doom Bots",
	"ASCENSION_5x5": "Ascension",
	"HExAKILL": "Hexakill",
	"KING_PORO_5x5": "Legend of the Poro King",
	"COUNTER_PICK": "Nemesis Draft"
};



// ************************************************************************************************
// loginClick()
//
// This function is called when the login button is clicked. It sends the username and password,
// taken from input boxes on the page, to the auth.php page via ajax. When that request returns, we
// either display an error or redirect to the match history page if authorization was successful.
// The auth.php page handles the creation and initialization of the session.
// ************************************************************************************************
function loginClick() {
	$("#errmsg").html("");

	var username = encodeURIComponent($('#username').val());
	var password = encodeURIComponent($('#password').val());
	var dataString = 'username=' + username + '&password=' + password;

	$.ajax({
		type : "POST",
		url : "auth.php",
		data : dataString,
		cache : false,
		success : function(result) {
			var result = JSON.parse(result);

			if (result.status == 'success')
				window.location = 'history.php';
			else {
				$("#errmsg").html(result.data);
				$('#password').val("");
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}



// ************************************************************************************************
// accountClick()
//
// This function is called when the account creation button is clicked. It sends the username and
// password, taken from input boxes on the page, to the accountCreate.php page via ajax. When that
// request returns, we either display an error or indicate that an account was successfully
// created. The accountCreate.php handles validation and all of that, but since it's asynchronous,
// we can display validation errors without reloading the page.
// ************************************************************************************************
function accountClick() {
	$("#errmsg").html("");

	var username = encodeURIComponent($('#username').val());
	var password = encodeURIComponent($('#password').val());
	var dataString = 'username=' + username + '&password=' + password;

	$.ajax({
		type : "POST",
		url : "accountCreate.php",
		data : dataString,
		cache : false,
		success : function(result) {
			var result = JSON.parse(result);

			if (result.status != 'success') {
				$("#errmsg").html(result.data);
				$('#password').val("");
			} else {
				$("#errmsg").html("Account successfully created<br>You may now log in");
				$('#password').val("");
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}



// ************************************************************************************************
// logout()
//
// This function simply asynchronously asks the logout.php page to destroy the session. On success,
// we redirect to the login page.
// ************************************************************************************************
function logout() {
	$.ajax({
		type : "POST",
		url : "logout.php",
		cache : false,
		success : function(result) {
			window.location = 'login.php';
		},
		error : function(xhr, status, error) {
			var msg = "An error has occurred.\nThe error number returned was: " + xhr.status
					+ "\nThe error message was: " + xhr.statusText;

			alert(msg);
		}
	});
}



// ************************************************************************************************
// wrap()
//
// This function encapsulates an asynchronous request to the lolapi. It uses wrap.php to obscure 
// the api key. On successful ajax response, we pass the received data to the onResponse callback
// that was passed in. On failure, we display an error message as generated by the api.
// ************************************************************************************************
function wrap(request, onResponse, passthrough) {
	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : "req=" + encodeURIComponent(request),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success')
				onResponse(result.data, passthrough);
			else
				$("#errmsg").html(result.status);
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}



// ************************************************************************************************
// populateMatch()
//
// This function asynchronously populates the match details. It takes the match ID from the page
// and utilizes the lolapi to get the information it needs.
// ************************************************************************************************
function populateMatch() {
	$("#out_team1").empty();
	$("#out_team2").empty();

	wrap('/api/lol/na/v2.2/match/' + $("#in_matchId").val(), function(data) {
		$("#out_type").html(queueTypes[data.queueType]);
		if (data.teams[0].winner)
			$("#out_winner").html("Team 1");
		else
			$("#out_winner").html("Team 2");
		for (var p in data.participants) {
			wrap('/api/lol/static-data/na/v1.2/champion/' + data.participants[p].championId,
				function(champData, matchData) {
				var toInsert = "<tr class='hoverdark' onclick=\"sumInfo(" + matchData.id.player.summonerId + ", '" + matchData.id.player.summonerName + "')\">\
						<td>" + champData.name + " " + champData.title + "</td>\
						<td>" + matchData.id.player.summonerName + "</td>\
						<td>" + matchData.data.stats.kills + "/" + matchData.data.stats.deaths + "/" + matchData.data.stats.assists + "</td>\
						<td>" + matchData.data.stats.minionsKilled + "</td>\
						<td>" + matchData.data.stats.goldEarned + "</td>\
					</tr>";
				if (matchData.data.teamId == 100)
					$("#out_team1").append(toInsert);
				else
					$("#out_team2").append(toInsert);
			}, {"data": data.participants[p], "id": data.participantIdentities[p]});
		}
	});
}



// ************************************************************************************************
// populateHistory()
//
// This function asynchronously populates a summoner's match history. It takes the summoner name
// from the page and utilizes the lolapi to get the infromation it needs. We utilizes the wrap()
// function twice to first get the summoner ID from the name and then to get the actual matches.
// ************************************************************************************************
function populateHistory() {
	$("#out_matchlist").empty();
	if ($('#in_summonername').val() == "") {
		$("#errmsg").html("<p>Please enter a Summoner Name.</p>");
		return;
	}

	var name = $('#in_summonername').val().toLowerCase();
	$("#out_summonername").html(name);

	wrap('/api/lol/na/v1.4/summoner/by-name/' + name, function(nameData) {
		$("#out_summonerid").val(nameData[name].id);
		wrap('/api/lol/na/v2.2/matchhistory/' + nameData[name].id, function(data) {
			var id = $("#out_summonerid").val();
			for (var match in data.matches) {
				wrap('/api/lol/static-data/na/v1.2/champion/' + data.matches[match].participants[0].championId,
					function(champData, matchData) {
					$("#out_matchlist").append("<tr class='hoverdark' onclick='matchInfo(" + matchData.matchId + ")'>\
							<td>" + queueTypes[matchData.queueType] + "</td>\
							<td>" + parseInt(((new Date()).getTime() - matchData.matchCreation) / (3600 * 1000)) + " Hours Ago</td>\
							<td>" + Math.floor(matchData.matchDuration / 60) + " Minutes" + "</td>\
							<td>" + (matchData.participants[0].stats.winner ? "Win" : "Loss") + "</td>\
							<td>" + champData.name + " " + champData.title + "</td>\
							<td>" + matchData.participants[0].stats.kills + "/" + matchData.participants[0].stats.deaths + "/" + matchData.participants[0].stats.assists + "</td>\
						</tr>");
				}, data.matches[match]);
			}
		});


		$.ajax({
			type : "GET",
			url : "summoner.php",
			data : "id=" + encodeURIComponent(nameData[name].id),
			cache : false,
			success : function(result) {
				result = JSON.parse(result);
				if (result.status == 'success') {
					$("#out_numfavs").html(result.data.count);
					$("#out_sumnote").html(result.data.comment);
					if (result.data.favorite) {
						// If we have this summoner favorited already, swap the favorite anchors.
						$("#log_fave").hide();
						$("#log_unfave").css('display', 'inline');
					}
				} else {
					$("#errmsg").html(result.data);
				}
			},
			error : function(xhr, status, error) {
				var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
						+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
						+ "</b></p>";

				$("#errmsg").html(msg);
			}
		});
	});
}



// ************************************************************************************************
// addFavorite()
// removeFavorite()
//
// This function is called when a user clicks the "add favorite" anchor button. It hides that
// anchor, then sends an asynchronous request to togfav.php with the summoner ID. This either
// updates or creates a summoner-user relation to track whether or not the user has favorited a
// given summoner. After confirmation that the DB update went through, we update the number of
// favorites on the displayed summoner and then show the anchor button to remove the favorite.
//
// Remove works the same, just in the opposite direction.
// ************************************************************************************************
function addFavorite() {
	if ($("#out_summonerid").val() == "")
		return;

	$("#log_fave").hide();

	$.ajax({
		type : "POST",
		url : "togfav.php",
		data : "id=" + encodeURIComponent($("#out_summonerid").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_numfavs").html(result.data);
				$("#log_unfave").css('display', 'inline');
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}

function removeFavorite() {
	if ($("#out_summonerid").val() == "")
		return;

	$("#log_unfave").hide();

	$.ajax({
		type : "POST",
		url : "togfav.php",
		data : "id=" + encodeURIComponent($("#out_summonerid").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_numfavs").html(result.data);
				$("#log_fave").css('display', 'inline');
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}

function addFavoriteM() {
	$("#log_fave").hide();

	$.ajax({
		type : "POST",
		url : "togfavM.php",
		data : "id=" + encodeURIComponent($("#in_matchId").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_numfavs").html(result.data);
				$("#log_unfave").css('display', 'inline');
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}

function removeFavoriteM() {
	$("#log_unfave").hide();

	$.ajax({
		type : "POST",
		url : "togfavM.php",
		data : "id=" + encodeURIComponent($("#in_matchId").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_numfavs").html(result.data);
				$("#log_fave").css('display', 'inline');
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}



// ************************************************************************************************
// editNote()
//
// This function simply hides the "add/edit note" anchor button and swaps the note display for a
// note edit box.
// ************************************************************************************************
function editNote() {
	if ($("#out_summonerid").val() == "")
		return;

	// Hide the "edit note" anchor and the comment display.
	$("#log_add").hide();
	$("#out_sumnote").hide();
	$("#in_sumnote").val($("#out_sumnote").html());

	// Show the "set note" anchor and the edit box.
	$("#log_set").css('display', 'inline');
	$("#in_sumnote").css('display', 'inline');
}



// ************************************************************************************************
// setNote()
//
// This function does the actual note setting work. It is called when the user clicks the "set
// note" anchor button. It hides that anchor and then asynchronously sends the comment and
// summoner ID to the comment.php page which works the same as the togfav.php page described above.
// Upon successful DB update, we update the comment display, disable the editing and bring back the
// "add/edit note" anchor button.
// ************************************************************************************************
function setNote() {
	if ($("#out_summonerid").val() == "")
		return;

	// Hide the "set note" anchor and the edit box.
	$("#log_set").hide();
	$("#in_sumnote").hide();

	$.ajax({
		type : "POST",
		url : "comment.php",
		data : "id=" + encodeURIComponent($("#out_summonerid").val()) + "&comment=" + encodeURIComponent($("#in_sumnote").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#log_add").css('display', 'inline');
				$("#out_sumnote").css('display', 'inline');
				$("#out_sumnote").html($("#in_sumnote").val());
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}

function setNoteM() {
	// Hide the "set note" anchor and the edit box.
	$("#log_set").hide();
	$("#in_sumnote").hide();

	$.ajax({
		type : "POST",
		url : "commentM.php",
		data : "id=" + encodeURIComponent($("#in_matchId").val()) + "&comment=" + encodeURIComponent($("#in_sumnote").val()),
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#log_add").css('display', 'inline');
				$("#out_sumnote").css('display', 'inline');
				$("#out_sumnote").html($("#in_sumnote").val());
			} else {
				$("#errmsg").html(result.data);
			}
		},
		error : function(xhr, status, error) {
			var msg = "<p>An error has occurred.<br>The error number returned was: <b>"
					+ xhr.status + "</b><br>The error message was: <b>" + xhr.statusText
					+ "</b></p>";

			$("#errmsg").html(msg);
		}
	});
}



// ************************************************************************************************
// matchInfo()
// sumInfo()
//
// These function simply redirects to the details page for the given match id or summoner.
// ************************************************************************************************
function matchInfo(matchId) {
	window.location = "match.php?match=" + matchId;
}

function sumInfo(sumId, sumName) {
	window.location = "history.php?id=" + sumId + "&name=" + sumName;	
}