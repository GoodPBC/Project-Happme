//Global Variables

var chosenWord1  = ""; //random word from first array will be placed here
var chosenWord2  = ""; //random word from second array will be placed here
var quotesList = ["inspire", "life", "funny", "love", "art"];
var imagesList = ["happy", "funny", "inspire","courage", "love", "triumph"]

//the next two statements generate a numbered position in each of the arrays above (e.g. 0 thru 6)
   chosenWord1 = quotesList[Math.floor(Math.random()*quotesList.length)];
   chosenWord2 = imagesList[Math.floor(Math.random()*imagesList.length)];
   console.log("pre" + chosenWord1)

 //this click statement retrieves the user's mood number
 $('button').on('click', function() {
        var mood = $(this).data('mood');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + chosenWord1 + "&api_key=dc6zaTOxFJmzC&limit=1";
        var queryURL2 = "http://quotes.rest/qod.json?category=" + chosenWord2;
             
//Now we "GET" the quote from the quote site:
        $.ajax({
                url: queryURL2,
                method: 'GET'
            })
//Here we retrieve the quote from the query and display it on the app screen:
        .done(function(response) {
              var p2 = $('<p>').text(response.contents.quotes[0].quote);
            $('#gifsAppearHere').append(p2);
        })
//Now we "GET" the image from the Giphy site...
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
//...And position it on the user screen:
            .done(function(response) {
                // step 1: Run this file, click a button, and see what the data looks like in the browser's console. Open up the Object, then open up the data key, then open up 0. Study the keys and how the JSON is structured.

                console.log(queryURL);

                console.log(response)

                // step 2: since the image information is inside of the data key then make a variable named results and set it equal to response.data

                //------------put step 2 in between these dashes--------------------
                var results = response.data;
                //--------------------------------

                for (var i = 0; i < results.length; i++) {

                    /* step 3: 
                        * uncomment the for loop above and the closing curly bracket below
                        * make a div and reference it in a variable named moodDiv
                        * make a paragraph tag and put it in a variable named p
                            * set the text of the paragraph to the rating of the image in results[i]
                        * make an image and reference it in a variable named moodImage
                        * set the image's src to results[i]'s fixed_height.url 

                        * append the p variable to the animalDiv variable
                        * append the moodImage variable to the moodDiv variable

                        * prepend the moodDiv variable to the element with an id of gifsAppearHere

                    */

                    //------------put step 3 in between these dashes--------------------
                    var moodDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var moodImage = $('<img>');
                    moodImage.attr('src', results[i].images.fixed_height.url);

                    moodDiv.prepend(p);
                    moodDiv.prepend(moodImage);

                    $('#gifsAppearHere').prepend(moodDiv);
                    //--------------------------------
                }

            });
    });

