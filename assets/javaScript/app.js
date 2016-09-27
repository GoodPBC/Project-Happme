// we grab a mood value from the user
//save mood value to a variable
//insert user mood variable into query so it is the value of the API mood parameter
//we query gracenote and replace the value of the mood parameter
//the API should return a list of artists assoicated with that mood.
//save one or more of the returned artists into a variable
//make a second API call to spotify or similiar and use artist list as seed value for call. this api 

function contentRet(){
	
}

	var authKey = "&format=json&apikey=l0x48hv1";
	var queryURLBase = "http://musicovery.com/api/V3/playlist.php?&listenercountry=us&resultsnumber=5&fct=getfrommood";
	var enregyParam = "&trackvalence=";
	var userEnergy = 100000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
	var moodParam = "&trackarousal=";
	var userMood = 500000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
	userDecade = 10;	//ten needs to change with user age.  just hard coded for testing 
	var decade = "&date" + userDecade + "=" + true;



	console.log(queryURLBase);
	console.log(authKey);
	console.log(enregyParam);
	console.log(moodParam);
	console.log(decade);

	queryURL = queryURLBase + enregyParam + userEnergy + moodParam + userMood + decade + userDecade + authKey
	// console.log(queryURL);


	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(root) {


			console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")

			
			console.log(root.root.tracks.track[0].artist.name);
	});