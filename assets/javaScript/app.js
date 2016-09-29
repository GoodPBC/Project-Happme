
$( document ).ready(function() {

$("#begin").click(function() {
	$("#quizPage").css('display','block');
   $("#indexPage").replaceWith( $("#quizPage") );
   
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

//=========================================================================================================================================================
//=======================================================================site background===================================================================
//=========================================================================================================================================================

  $.backstretch("assets/images/background.jpg");
  $("#top").backstretch("assets/images/header-bg.jpg");

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









// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '225',
          width: '400',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }


// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
// function showResponse(response) {
//    var responseString = JSON.stringify(response, '', 2);
//    console.log(responseString);
//    document.getElementById('#player').innerHTML += responseString;
// }

// // Called automatically when JavaScript client library is loaded.
// function onClientLoad() {
//    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
// }

// // Called automatically when YouTube API interface is loaded (see line 9).
// function onYouTubeApiLoad() {
//    // This API key is intended for use only in this lesson.
//    // See http://goo.gl/PdPA1 to get a key for your own applications.
//    gapi.client.setApiKey('AIzaSyC5AZQrtUO4D7no_zKQvqyUNcNJ8cVnkOI');

//    search();
// }

// function search() {
//    // Use the JavaScript client library to create a search.list() API call.
//    var request = gapi.client.youtube.search.list({
//        part: 'snippet',
//        q: 'funny cats'
       
//    });
   
//    // Send the request to the API server,
//    // and invoke onSearchRepsonse() with the response.
//    request.execute(onSearchResponse);
// }

// // Called automatically with the response of the YouTube API request.
// function onSearchResponse(response) {
//    showResponse(response);
// }
});


