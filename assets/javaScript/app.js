

$( document ).ready(function() {
//=========================================================================================================================================================
//=======================================================================site background===================================================================
//=========================================================================================================================================================

  $.backstretch("assets/images/background.jpg");
  $("#top").backstretch("assets/images/header-bg.jpg");
  $("#controlQuestionPage").hide();
//=========================================================================================================================================================
//========================================================== event listener to begin question phase  ======================================================
//=========================================================================================================================================================



$("#begin").click(function() {
	$("#indexPage").hide();
	$("#controlQuestionPage").hide();
	$("#quizPage").show();

   
 });

$("#submit").click(function() {
	$("#quizPage").hide();
	
   var arousalVal = $("input[name='arousal']:checked").val();
   var valenceVal = $("input[name='valence']:checked").val();


  // $("#happyPage").show();

   		if (arousalVal == "high" && valenceVal == "high") {
   				arousalVal = 9;
	   			valenceVal = 9;
   				$("#controlQuestionContent").html("Do you feel hyper active?");

   		}else if (arousalVal == "low" && valenceVal == "high") {
   				arousalVal = 1;
   				valenceVal = 9;
   				$("#controlQuestionContent").html("Would you like digital coffee?");

   		}else if (arousalVal == "high" && valenceVal == "low") {
   				arousalVal = 9;
   				valenceVal = 1;
   				$("#controlQuestionContent").html("Would you like something new?");

   		}else{
   				arousalVal = 1;
   				valenceVal = 1;
   				$("#controlQuestionContent").html("Do you normally feel this way?");
   		}

   		$("#controlQuestionPage").show();

   		//apiGet(arousalVal, valenceVal);
 });



$("#submitControlQuestion").click(function() {
	$("#controlQuestionPage").hide();
	
	var arousalVal = $("input[name='arousal']:checked").val();
  var valenceVal = $("input[name='valence']:checked").val();
	var controlVal = $("input[name='control']:checked").val();

			if (arousalVal == "high" && valenceVal == "high" && controlVal == "high") {
					arousalVal = 5;  valenceVal = 9;
   		} else if (arousalVal == "high" && valenceVal == "high" && controlVal == "low") {
					arousalVal = 9;  valenceVal = 9;
   		} else if (arousalVal == "high" && valenceVal == "low" && controlVal == "high") {
					arousalVal = 9;  valenceVal = 5;
   		} else if (arousalVal == "high" && valenceVal == "low" && controlVal == "low") {
					arousalVal = 9;  valenceVal = 1;
   		} else if (arousalVal == "low" && valenceVal == "high" && controlVal == "high") {
					arousalVal = 9;  valenceVal = 9;
   		} else if (arousalVal == "low" && valenceVal == "high" && controlVal == "low") {
					arousalVal = 1;  valenceVal = 9;
   		} else if (arousalVal == "low" && valenceVal == "low" && controlVal == "high") {
					arousalVal = 1;  valenceVal = 1;
   		} else {
   			//if (arousalVal == "low" && valenceVal == "low" && controlVal == "low") {
					arousalVal = 5;  valenceVal = 5;
			}

		$("#happyPage").show();
		apiGet(arousalVal, valenceVal);

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
				
				artistName = artistName.replace(/ /g,"+");
				artistTitle = artistTitle.replace(/ /g, "+");	

					var queryURL_YT = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + artistName + artistTitle + "&type=video&fields=items%2Fid%2FvideoId&key=AIzaSyBwVDM-Vd_i_HMVlPJXFbBW0lmZSjf_h2s";
			
					$.ajax({url: queryURL_YT, method: "GET"}) 
						.done(function(response) {
							console.log(queryURL_YT);
							var ytVideoId = response.items[0].id.videoId; // this gets fed to youtube embed
							console.log(ytVideoId);
							console.log(artistName);
			      	console.log(artistTitle);

			     	  $('#player').attr('src', 'https://www.youtube.com/embed/' + ytVideoId + '?rel=0&amp;autoplay=1')
				  });
		});

		$.ajax({url: queryURL, method: "GET"}) 
			.done(function(root) {
				
        var quoteQueryURL2 = "http://quotes.rest/qod.json?category=";
             
    });

		$.ajax({url: queryURL, method: "GET"}) 
			.done(function(root) {

				var highValHighArous = ["alert", "excited", "elated", "happy"];
				var loValHighArous = ["tense", "nervous", "stressed", "upset"];
				var loValLoArous = ["sad", "bored", "fatigued", "depressed"];
				var HighValLoArous = ["content", "serene", "relaxed", "calm"];

				var giphyQueryURL = "http://api.giphy.com/v1/gifs/search?q=" +  + "&api_key=dc6zaTOxFJmzC&limit=1";
        
        // run for loop i.j.k.l
             
    });

	}

});




