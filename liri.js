// Require keys and npm packages
var keys = require("./keys");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


// Twitter function
var myTweets = function() {

// Twitter keys
var keyforTwitter = keys;

// NPM twitter package
var client = new twitter(keyforTwitter);
var params = { screen_name: 'mmreyes13'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

// Loop thru tweet array
  	for (var i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].text);
  		}
    }
  else 
  	console.log(error);

	});
};

var manyMovies = function(theMovies) {

	if (theMovies === undefined) {
		theMovies = "Mr Nobody";
	}

request('http://www.omdbapi.com/?t=' + theMovies + '&y=&plot=short&tomatoes=true&r=json&apikey=40e9cece', function (error, response, body) {
 if (!error && response.statusCode === 200){
 	var jsonData = JSON.parse(body);
 	console.log("Title: " + jsonData.Title);
 	console.log("Actors: " + jsonData.Actors);
 	console.log("Plot: " + jsonData.Plot);
    console.log("Year: " + jsonData.Year);
    console.log("Rated: " + jsonData.Rated);
    console.log("IMDB Rating: " + jsonData.imdbRating);
    console.log("Country: " + jsonData.Country);
    console.log("Language: " + jsonData.Language);
 	}
  });
};

// Spotify function
var mySpotify = function(myMusic) {
var spotify = new Spotify({
	id: "cb1e7dd2d4f540a397f41bcf753c4619",
	secret: "89cf8d5982b544c5ac9b42966cb9d5dc"
});

spotify.search ({ type: 'track', query: myMusic, limit : 1}, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}
	// console.log(data);

	var music = data.tracks.items;

	for (var i = 0; i < music.length; i++) {
		console.log("Artist(s)/Group: " + music[i].artists[i].name);
      	console.log("Song name: " + music[i].name);
      	console.log("Preview song: " + music[i].preview_url);
      	console.log("Album: " + music[i].album.name);
	}
});
};
//  Command function
var choices = function(requestData, askData) {
	switch (requestData) {
		case "my-Tweets":
		 console.log("");
		myTweets();
		break;
		case "movie-this":
		manyMovies(askData);
		break;
		case "spotify-this-song":
		mySpotify(askData);
		break;

	}
};

// To take arguments
var myArguments = function(argOne, argTwo) {
	choices(argOne, argTwo);
};
myArguments(process.argv[2], process.argv[3]);