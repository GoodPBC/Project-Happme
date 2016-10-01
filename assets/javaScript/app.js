

$( document ).ready(function() {
//=========================================================================================================================================================
//=======================================================================site background===================================================================
//=========================================================================================================================================================

  $.backstretch("assets/images/background.jpg");
  $("#top").backstretch("assets/images/header-bg.jpg");

//=========================================================================================================================================================
//========================================================== event listener to begin question phase  ======================================================
//=========================================================================================================================================================



$("#begin").click(function() {
	$("#indexPage").hide();
	$("#quizPage").show();
   
 });

$("#submit").click(function() {
	$("#quizPage").hide();
   var arousalVal = $("input[name='arousal']:checked").val();
   	var valenceVal = $("input[name='valence']:checked").val();
   	
   	console.log(arousalVal);
   	console.log(valenceVal);

   		if (arousalVal == "high" && valenceVal == "high") {
   			arousalVal = 9;
   			valenceVal = 9;
   			console.log(arousalVal);
   			console.log(valenceVal);

   		}else if (arousalVal == "low" && valenceVal == "high") {
   				console.log('Test1');
   		}else if (arousalVal == "high" && valenceVal == "low") {
   				console.log('Test2');
   		}else{
   			// assumed low low
   				console.log('Test3');
   		}
   		apiGet(arousalVal, valenceVal);
 });

$("#submitSad").click(function() {
	$("#sadPage").css('display','block');
   $("#quizPage").replaceWith( $("#sadPage") );
   
});


// we grab a mood value from the user
//save mood value to a variable
//insert user mood variable into query so it is the value of the API mood parameter
//we query gracenote and replace the value of the mood parameter
//the API should return a list of artists assoicated with that mood.
//save one or more of the returned artists into a variable
//make a second API call to spotify or similiar and use artist list as seed value for call. this api 
//YOUTUBE project ID will be happme-144801
//YOUTUBE API KEY AIzaSyC5AZQrtUO4D7no_zKQvqyUNcNJ8cVnkOI ***parameter -- key=API_KEY***



	function apiGet(userEnergy , userMood) {


	//=================================================================================================================================
	//=======================================Artist Info Musicovery API================================================================
	//=================================================================================================================================
		var authKey = "&format=json&apikey=l0x48hv1";
		var queryURLBase = "https://crossorigin.me/http://musicovery.com/api/V3/playlist.php?&listenercountry=us&resultsnumber=5&fct=getfrommood";
		var enregyParam = "&trackvalence=";
		var userEnergy = userEnergy * 100000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
		var moodParam = "&trackarousal=";
		var userMood = userMood * 100000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
		userDecade = 50;	//ten needs to change with user age.  just hard coded for testing 
		var decade = "&date" + userDecade + "=" + true;

		//URL for ajax call 
		queryURL = queryURLBase + enregyParam + userEnergy + moodParam + userMood + decade + userDecade + authKey
		console.log(queryURL);

		$.ajax({url: queryURL, method: "GET"}) 
			.done(function(root) {

				var artistName = root.root.tracks.track[0].artist.name;
				var artistTitle = root.root.tracks.track[0].title;
				
				artistName = artistName.replace(" ","+");
				artistTitle = artistTitle.replace(" ", "+");	

					var queryURL_YT = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=Ricky&type=video&fields=items%2Fid%2FvideoId&key=AIzaSyBwVDM-Vd_i_HMVlPJXFbBW0lmZSjf_h2s";
			
					$.ajax({url: queryURL_YT, method: "GET"}) 
						.done(function(response) {
							var ytVideoId = response.items[0].id.videoId; // this gets fed to youtube embed
							console.log(ytVideoId);
							console.log(artistName);
			      	console.log(artistTitle);

			     	  $('#player').attr('src', '//www.youtube.com/embed/' + ytVideoId + '?rel=0&amp;autoplay=1')
				  });
		});


	}

});




