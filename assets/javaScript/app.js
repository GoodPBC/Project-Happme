

$( document ).ready(function() {
//=========================================================================================================================================================
//=============================================== backstretch & .hide fixsite background===================================================================
//=========================================================================================================================================================

  $.backstretch("assets/images/background.jpg");
  $("#top").backstretch("assets/images/header-bg.jpg");
  $("#controlQuestionPage").hide();
//=========================================================================================================================================================
//========================================================== event listener to begin question phase  ======================================================
//=========================================================================================================================================================


// 1st event listener for first click event on "begin button", also shows 1st layer mood analysis
$("#begin").click(function() {
	$("#indexPage").hide();
	$("#controlQuestionPage").hide();
	$("#quizPage").show();

});
// second listener that hides 1st layer mood analysis and grabs value of analysis check boxes 
$("#submit").click(function() {
	$("#quizPage").hide();
	
   var arousalVal = $("input[name='arousal']:checked").val();
   var valenceVal = $("input[name='valence']:checked").val();


   		//this block of code executes if statements on first layer mood analysis, assigns value 
   		//and manipulates DOM to begin the 2nd layer or "control layer" of the program logic \
   		//second layer asks a control question to determine if a user might require a mood adjustment
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
   		//shows control question page using jQuery
   		$("#controlQuestionPage").show();

   		//apiGet(arousalVal, valenceVal);
 });


	//event listener that submits control logic 
	$("#submitControlQuestion").click(function() {
		$("#controlQuestionPage").hide();
		//re grab user input values with 3rd input value
		var arousalVal = $("input[name='arousal']:checked").val();
	  var valenceVal = $("input[name='valence']:checked").val();
		var controlVal = $("input[name='control']:checked").val();
				//if statements operating 3 dimensionally on all possible program outcomes.. This is logic To be itterated
				//upon it most surely can be improved
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
						arousalVal = 5;  valenceVal = 5;
				}
			//show s results pages and makes API calls  with appropriate values
			$("#happyPage").show();
			musicApiGet(arousalVal, valenceVal);
			giphyAPIGet(arousalVal, valenceVal);

	});



});

// we grab a mood value from the user
//save mood value to a variable
//insert user mood variable into query so it is the value of the API mood parameter
//we query music API  and replace the value of the mood parameter with userEnergy & userMood
//the API should return a list of artists assoicated with that mood.
//save one or more of the returned artists into a variable
//make a second API call to spotify or similiar and use artist list as seed value for call. this api 
//YOUTUBE project ID will be happme-144801
//YOUTUBE API KEY AIzaSyC5AZQrtUO4D7no_zKQvqyUNcNJ8cVnkOI ***parameter -- key=API_KEY***

	function musicApiGet(userEnergy , userMood) {
	//=================================================================================================================================
	//=======================================Artist Info Musicovery API================================================================
	//=================================================================================================================================
		//music meta API variables
		var authKey = "&format=json&apikey=l0x48hv1";
		var queryURLBase = "https://crossorigin.me/http://musicovery.com/api/V3/playlist.php?&listenercountry=us&resultsnumber=5&fct=getfrommood";
		var enregyParam = "&trackvalence=";
		var userEnergy = userEnergy * 100000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
		var moodParam = "&trackarousal=";
		var userMood = userMood * 100000; //scale of 100000 - 900000 will have to change with user input/ user score  just hard coded for testing 
		var userDecade = 80;	//ten needs to change with user age.  just hard coded for testing 
		var decade = "&date" + userDecade + "=" + true;

		//URL for ajax call  
		queryURL = queryURLBase + enregyParam + userEnergy + moodParam + userMood + decade + userDecade + authKey
		console.log(queryURL);
		//query music meta data
		$.ajax({url: queryURL, method: "GET"}) 
			.done(function(root) {
				//pull artist name and song from JSON
				var artistName = root.root.tracks.track[0].artist.name;
				var artistTitle = root.root.tracks.track[0].title;
				//regex to replace any whitespace and concatenate URL
				artistName = artistName.replace(/ /g,"+");
				artistTitle = artistTitle.replace(/ /g, "+");	
					//pass artist vars to YT Data API
					var queryURL_YT = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + artistName + artistTitle + "&type=video&fields=items%2Fid%2FvideoId&key=AIzaSyBwVDM-Vd_i_HMVlPJXFbBW0lmZSjf_h2s";
					//ajax call to YT to grab ytVideo ID
					$.ajax({url: queryURL_YT, method: "GET"}) 
						.done(function(response) {
							var ytVideoId = response.items[0].id.videoId; // this gets fed to youtube embed
							// console.log(ytVideoId);
							// console.log(artistName);
			    //   	console.log(artistTitle);

			     	  $('#player').attr('src', 'https://www.youtube.com/embed/' + ytVideoId + '?rel=0&amp;autoplay=1')
				  });
		});

		// $.ajax({url: queryURL, method: "GET"}) 
		// 	.done(function(root) {
				
  //       var quoteQueryURL2 = "https://quotes.rest/qod.json?category=";
             
  //   });
	}


function giphyAPIGet(userEnergy , userMood) {
		$.ajax({url: queryURL, method: "GET"}) 
			.done(function(root) {

				var mood = [[]];
				for (i=0;i<10;i++) {
					mood[i] = new Array(10);
				}
				mood[1][1] = ["sad", "bored", "fatigued", "depressed"];
				mood[1][5] = ["sad", "bored", "fatigued", "depressed"];
				mood[1][9] = ["tense", "nervous", "stressed", "upset"];
				mood[5][1] = ["sad", "bored", "fatigued", "depressed"];
				mood[5][5] = ["sad", "bored", "fatigued", "depressed"];
				mood[5][9] = ["sad", "bored", "fatigued", "depressed"];
				mood[9][1] = ["content", "serene", "relaxed", "calm"];
				mood[9][5] = ["sad", "bored", "fatigued", "depressed"];
				mood[9][9] = ["alert", "excited", "elated", "happy"];


				var highValHighArous = ["alert", "excited", "elated", "happy"];
				var loValHighArous = ["tense", "nervous", "stressed", "upset"];
				var loValLoArous = ["sad", "bored", "fatigued", "depressed"];
				var HighValLoArous = ["content", "serene", "relaxed", "calm"];


				randMood = mood[userEnergy][userMood][Math.floor(Math.random()*mood[userEnergy][userMood].length)];

				var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + randMood + "&api_key=dc6zaTOxFJmzC&limit=10";



					$.ajax({url: giphyQueryURL, method: "GET"}).done(function(response) {
							var moodImageURL = response.data[Math.floor(Math.random(10))].images.fixed_height.url;
							console.log(moodImageURL);

              var moodImage = $('<img>');
              moodImage.attr('src', moodImageURL);
              $('#giphy').html(moodImage);
    			});
             
    });

}

