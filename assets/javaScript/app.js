// we grab a mood value from the user
//save mood value to a variable
//insert user mood variable into query so it is the value of the API mood parameter
//we query gracenote and replace the value of the mood parameter
//the API should return a list of artists assoicated with that mood.
//save one or more of the returned artists into a variable
//make a second API call to spotify or similiar and use artist list as seed value for call. this api 
//YOUTUBE project ID will be happme-144801
//YOUTUBE API KEY AIzaSyC5AZQrtUO4D7no_zKQvqyUNcNJ8cVnkOI ***parameter -- key=API_KEY***

//=========================================================================================================================================================
//=======================================================================site background===================================================================
//=========================================================================================================================================================
$( document ).ready(function() {
  $.backstretch("assets/images/site-bg.jpg");
  $("#top").backstretch("assets/images/header-bg.jpg");
});

//=================================================================================================================================
//=======================================Artist Info Musicovery API================================================================
//=================================================================================================================================
	var authKey = "&format=json&apikey=l0x48hv1";
	var queryURLBase = "http://musicovery.com/api/V3/playlist.php?&listenercountry=us&resultsnumber=5&fct=getfrommood";
	var enregyParam = "&trackvalence=";
	var userEnergy = 900000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
	var moodParam = "&trackarousal=";
	var userMood = 900000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
	userDecade = 50;	//ten needs to change with user age.  just hard coded for testing 
	var decade = "&date" + userDecade + "=" + true;



	console.log(queryURLBase);
	console.log(authKey);
	console.log(enregyParam);
	console.log(moodParam);
	console.log(decade);
	//URL for ajax call 
	queryURL = queryURLBase + enregyParam + userEnergy + moodParam + userMood + decade + userDecade + authKey
	console.log(queryURL);


	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(root) {

			console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")

			var artistName = root.root.tracks.track[0].artist.name;
			var artistTitle = root.root.tracks.track[0].title;
		
			console.log(artistName);
			console.log(artistTitle);	
	});


//=========================================================================================================================================================
//=======================================================================YOUTBE DATA API --fed artist and track name--=====================================
//=========================================================================================================================================================
$ (function() {
	$("form").on("submit", function(e){
		e.preventDefault();
		//prepare the request
		var request = gapi.client.search.list({
					part: "snippet",
					type: "video",
					q: "cat"
		});
		request.execute(function(response) {
			console.log(response);
		});
	});
});


function init() {
	gapi.client.setApiKey("AIzaSyC5AZQrtUO4D7no_zKQvqyUNcNJ8cVnkOI");
	gapi.client.load("youtube", "v3", function() {
		//YT api is ready
		console.log('test');
	});
}



