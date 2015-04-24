// ****************************************************************************
// ****************************************************************************
// 3.js
// ****************************************************************************
// Charles Santos
// CS290 S15
// Assignment 3
// ****************************************************************************
// ****************************************************************************



// ****************************************************************************
// updateFavorites()
// ****************************************************************************
function updateFavorites()
{
	var favorites = []	;
	if (sessionStorage.csFavorites)
		favorites = JSON.parse(sessionStorage.getItem("csFavorites"));

	var table = document.createElement("table");

	for (var i = 0; i < favorites.length; i++) {
		var row = document.createElement("tr");

		var desc = document.createElement("td");
		var a = document.createElement("a");
		a.href = favorites[i].url;
		a.innerText = favorites[i].desc;
		desc.appendChild(a);
		row.appendChild(desc);

		var fav = document.createElement("td");
		var button = document.createElement("button");
		button.innerText = "Remove";
		button.id = "_" + favorites[i].id.toString();
		button.onclick = function(sender) {
			removeFavorite(sender.currentTarget.id.substring(1));
		};
		fav.appendChild(button);
		row.appendChild(fav);

		row.appendChild(fav);

		table.appendChild(row);
	}

	document.getElementById("favorites").innerHTML = "";
	document.getElementById("favorites").appendChild(table);
}



// ****************************************************************************
// updateGists()
// ****************************************************************************
function updateGists(gists)
{
	var languages = [];
	if (document.getElementById("lang_py").checked)
		languages.push("Python");
	if (document.getElementById("lang_js").checked)
		languages.push("JavaScript");
	if (document.getElementById("lang_json").checked)
		languages.push("JSON");
	if (document.getElementById("lang_sql").checked)
		languages.push("SQL");

	if (!languages.length)
		languages = ["Python", "JavaScript", "JSON", "SQL"];

	var table = document.createElement("table");

	for (var i = 0; i < gists.length; i++) {
		var interested = false;

		for (var key in gists[i].files) {
			if (languages.indexOf(gists[i].files[key].language) != -1) {
				interested = true;
				break;
			}
		}

		if (!interested)
			continue;

		var row = document.createElement("tr");

		var desc = document.createElement("td");
		var a = document.createElement("a");
		a.href = gists[i].html_url;
		a.innerText = gists[i].description;
		a.id = gists[i].id;
		desc.appendChild(a);
		row.appendChild(desc);

		var fav = document.createElement("td");
		var button = document.createElement("button");
		button.innerText = "Favorite";
		button.id = "_" + gists[i].id.toString();
		button.onclick = function(sender) {
			addFavorite(sender.currentTarget.id.substring(1));
		};
		fav.appendChild(button);
		row.appendChild(fav);

		table.appendChild(row);
	}

	document.getElementById("results").innerHTML = "";
	document.getElementById("results").appendChild(table);
}



// ****************************************************************************
// addFavorite()
// ****************************************************************************
function addFavorite(id)
{
	var favorites = [];
	if (sessionStorage.csFavorites)
		favorites = JSON.parse(sessionStorage.getItem("csFavorites"));

	var a = document.getElementById(id);
	var fav = {
		id:		id,
		url:	a.href,
		desc:	a.innerText
	};

	favorites.push(fav);

	sessionStorage.setItem("csFavorites", JSON.stringify(favorites));

	updateFavorites();
}



// ****************************************************************************
// removeFavorite()
// ****************************************************************************
function removeFavorite(id)
{
	var favorites = [];
	if (sessionStorage.csFavorites)
		favorites = JSON.parse(sessionStorage.getItem("csFavorites"));

	var newFavs = [];

	for (var i = 0; i < favorites.length; i++) {
		if (favorites[i].id != id)
			newFavs.push(favorites[i]);
	};

	sessionStorage.setItem("csFavorites", JSON.stringify(newFavs));

	updateFavorites();
}



// ****************************************************************************
// search()
// ****************************************************************************
function search(numPages)
{
	document.getElementById("results").innerHTML = "Searching...";

	var request = new XMLHttpRequest();

	if (!request) {
		alert("Failed to create XMLHttpRequest");
		return;
	}

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			updateGists(JSON.parse(request.responseText));
		}
	};

//	request.open("GET", "http://web.engr.oregonstate.edu/~santosch/cs290/test/dummy.json?per_page=" + 30 * numPages, true);
	request.open("GET", "https://api.github.com/gists/public?per_page=" + 30 * numPages, true);
	request.send();
}



// ****************************************************************************
// onload
// ****************************************************************************
window.onload = function()
{
	updateFavorites();
}