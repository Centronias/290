// ************************************************************************************************
// ************************************************************************************************
// howto.js
// ************************************************************************************************
// Charles Santos
// CS290 Sp15
// How To
// ************************************************************************************************
// ************************************************************************************************



// ************************************************************************************************
// Queue Type Dictionary
// ************************************************************************************************
var queueTypes = {
	// Normals
	"GROUP_FINDER_5X5": "Team Builder",
	"NORMAL_5X5_BLIND": "Normal",
	"NORMAL_5X5_DRAFT": "Draft",
	"NORMAL_3X3": "3 v 3",
	"RANKED_SOLO_5X5": "Ranked",
	"RANKED_PREMADE_5X5": "Ranked",
	"RANKED_TEAM_5X5": "Team Ranked",
	"RANKED_PREMADE_3X3": "Ranked 3 v 3",
	"RANKED_TEAM_3X3": "Team Ranked 3 v 3",

	// Bots
	"BOT_5X5": "Co-op vs AI",
	"BOT_ODIN_5X5": "Co-op vs AI Dominion",
	"BOT_5X5_INTRO": "Co-op vs AI",
	"BOT_5X5_BEGINNER": "Co-op vs AI",
	"BOT_5X5_INTERMEDIATE": "Co-op vs AI",
	"BOT_TT_3X3": "Co-op vs AI 3 v 3",

	// Dominion
	"ODIN_5X5_BLIND": "Dominion",
	"ODIN_5X5_DRAFT": "Draft Dominion",

	// Other
	"ARAM_5X5": "ARAM",
	"CUSTOM": "Custom",

	// Featured
	"ONEFORALL_5X5": "One for All",
	"FIRSTBLOOD_1X1": "Solo Snowdown Showdown",
	"FIRSTBLOOD_2X2": "Duo Snowdown Showdown",
	"SR_6X6": "HeXakill",
	"URF_5X5": "HeXakill (Twisted Treeline)",
	"ONEFORALL_MIRRORMODE_5X5": "One for All (Mirror)",
	"BOT_URF_5X5": "Ultra Rapid Fire",
	"NIGHTMARE_BOT_5X5_RANK1": "Doom Bots",
	"NIGHTMARE_BOT_5X5_RANK2": "Doom Bots",
	"NIGHTMARE_BOT_5X5_RANK5": "Doom Bots",
	"ASCENSION_5X5": "Ascension",
	"HEXAKILL": "HeXakill",
	"KING_PORO_5X5": "Legend of the Poro King",
	"COUNTER_PICK": "Nemesis Draft"
};



// ************************************************************************************************
// Step 1 Demos
// ************************************************************************************************

// --------------------------------------------------------
// Summoner ID from Player Name
// --------------------------------------------------------
function demo1Id() {
	if ($('#in_sumid_name').val() == "") {
		$("#errmsg").html("<p>Please enter a Summoner Name.</p>");
		return;
	}

	var name = $('#in_sumid_name').val();
	var dataString = "req=" + encodeURIComponent('/api/lol/na/v1.4/summoner/by-name/' + name);
	$("#out_sumid_name").html(name);
	$("#out_sumid_name_2").html(name);

	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : dataString,
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_sumid_json").html(JSON.stringify(result.data));
				$("#out_sumid_id").html(result.data[name].id);
				$("#in_sumlist_id").val(result.data[name].id);
			} else {
				$("#errmsg").html(result.status);
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

// --------------------------------------------------------
// Match listing
// --------------------------------------------------------
function demo1List() {
	if ($('#in_sumlist_id').val() == "") {
		$("#errmsg").html("<p>Please enter a Summoner ID.</p>");
		return;
	}

	var name = $('#in_sumlist_id').val();
	var dataString = "req=" + encodeURIComponent('/api/lol/na/v2.2/matchhistory/' + name);
	$("#out_sumlist_id").html(name);

	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : dataString,
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_sumlist_json").html(JSON.stringify(result.data));
				for (var match in result.data.matches) {
					$("#out_sumlist_table").append("<tr>\
							<td>" + result.data.matches[match].mapId + "</td>\
							<td>" + result.data.matches[match].matchCreation + "</td>\
							<td>" + result.data.matches[match].matchDuration + "</td>\
							<td>" + result.data.matches[match].matchId + "</td>\
							<td>" + result.data.matches[match].matchMode + "</td>\
							<td>" + result.data.matches[match].matchType + "</td>\
							<td>" + result.data.matches[match].queueType + "</td>\
						</tr>");
				}
			} else {
				$("#errmsg").html(result.status);
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
// Step 2 Demos
// ************************************************************************************************

// --------------------------------------------------------
// Map Name
// --------------------------------------------------------
function demo2Map() {
	if ($('#in_matchinfo_mapid').val() == "") {
		$("#errmsg").html("<p>Please enter a map ID.</p>");
		return;
	}

	var id = parseInt($('#in_matchinfo_mapid').val());
	$('#out_matchinfo_mapid').html(id);
	var dataString = "req=" + encodeURIComponent('/api/lol/static-data/na/v1.2/map');

	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : dataString,
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_matchinfo_map_json").html(JSON.stringify(result.data));
				var map = result.data.data[id];
				if (map)
					$("#out_matchinfo_map").html(map.mapName);
				else
					$("#out_matchinfo_map").html("Unknown map");
			} else {
				$("#errmsg").html(result.status);
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

// --------------------------------------------------------
// Match Creation Date
// --------------------------------------------------------
function demo2Create() {
	if ($('#in_matchinfo_create').val() == "") {
		$("#errmsg").html("<p>Please enter a match creation date.</p>");
		return;
	}

	var data = parseInt($('#in_matchinfo_create').val());
	$("#out_matchinfo_createdata").html(data);
	var date = new Date(data);
	$("#out_matchinfo_create").html(date.toString());
}

// --------------------------------------------------------
// Match Duration
// --------------------------------------------------------
function demo2Duration() {
	if ($('#in_matchinfo_duration').val() == "") {
		$("#errmsg").html("<p>Please enter a match duration seconds value.</p>");
		return;
	}

	var data = parseInt($('#in_matchinfo_duration').val());
	$("#out_matchinfo_durationdata").html(data);
	var minutes = Math.floor(data / 60);
	$("#out_matchinfo_duration").html(minutes);
}

// --------------------------------------------------------
// Match Type
// --------------------------------------------------------
function demo2Type() {
	if ($('#in_matchinfo_type_queue').val() == "") {
		$("#errmsg").html("<p>Please enter a queue type.</p>");
		return;
	}

	var queue = $('#in_matchinfo_type_queue').val().toUpperCase();
	var displayType = queueTypes[queue];
	$("#out_matchinfo_type_queue").html(queue);
	$("#out_matchinfo_type").html(displayType);
}



// ************************************************************************************************
// Step 3 Demos
// ************************************************************************************************

// --------------------------------------------------------
// Detailed Match Info
// --------------------------------------------------------
var matchObj = null;
function demo3Info() {
	if ($('#in_match_id').val() == "") {
		$("#errmsg").html("<p>Please enter a match ID.</p>");
		return;
	}

	var id = parseInt($('#in_match_id').val());
	$('#out_match_id').html(id);
	var dataString = "req=" + encodeURIComponent('/api/lol/na/v2.2/match/' + id);

	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : dataString,
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_match_json").html(JSON.stringify(result.data));
				matchObj = result.data;
				$("#in_match_participants").html("Yes");
				$("#in_match_winner").html("Yes");
				$("#out_match_info").html("<p>Saved match info for demos below</p>");
			} else {
				$("#errmsg").html(result.status);
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

// --------------------------------------------------------
// Filling in the participants table
// --------------------------------------------------------
function demo3Participants() {
	if (!matchObj) {
		$("#errmsg").html("<p>Please first get the match info.</p>");
		return;
	}

	for (var i in matchObj.participants) {
		$("#in_match_champId").val(matchObj.participants[i].championId);
		$("#out_match_participants").append("<tr>\
			<td>" + matchObj.participants[i].championId + "</td>\
			<td>" + matchObj.participants[i].teamId / 100 + "</td>\
			<td>" + matchObj.participantIdentities[i].player.summonerId + "</td>\
			<td>" + matchObj.participantIdentities[i].player.summonerName + "</td>\
			<td>" + matchObj.participants[i].stats.kills + "/" + matchObj.participants[i].stats.deaths + "/" + matchObj.participants[i].stats.assists + "</td>\
		</tr>");
	}
}

// --------------------------------------------------------
// Just getting the winner
// --------------------------------------------------------
function demo3Winner() {
	if (!matchObj) {
		$("#errmsg").html("<p>Please first get the match info.</p>");
		return;
	}

	if (matchObj.teams[0].winner)
		$("#out_match_winner").html("1");
	else
		$("#out_match_winner").html("2");
}

// --------------------------------------------------------
// Static Champ name
// --------------------------------------------------------
function demo3Champ() {
	if ($('#in_match_champId').val() == "") {
		$("#errmsg").html("<p>Please enter a champion ID.</p>");
		return;
	}

	var id = parseInt($('#in_match_champId').val());
	$('#out_match_champId').html(id);
	var dataString = "req=" + encodeURIComponent('/api/lol/static-data/na/v1.2/champion/' + id);

	$.ajax({
		type : "GET",
		url : "wrap.php",
		data : dataString,
		cache : false,
		success : function(result) {
			result = JSON.parse(result);
			if (result.status == 'success') {
				$("#out_match_champJson").html(JSON.stringify(result.data));
				$("#out_champName").html(result.data.name);
			} else {
				$("#errmsg").html(result.status);
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