// Require keys and npm packages
var keys = require("./keys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// console.log("liri.js");
// Twitter search function
function myTweets() {
	console.log(keys);
	// var client = new twitter(keys);
	var client = new twitter(
		keys

);
	var params = { screen_name: "mmreyes13"};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    console.log(response);
  }
  else 
  	console.log(error);

});
	// // client.get("statuses/user_timeline", params, function(error, tweets, response) {
	// 	if (!error) {
	// 		for (var i = 0; i < tweets.length; i++) {
	// 			console.log(tweets[i]);
				
	// 		}
	// 	}
	// });
};

//Spotify function
function mySpotify(music) {
	if (music === undefined) {
		music = "The Sign";
	}
	mySpotify.search({type: "track", query: music}, function(err, data) {
		if (err) {
			return console.log("Error occurred: " + err);
		}

		var song = data.tracks.items;

		for (var i = 0; i < song.length; i++) {
			console.log("Artist(s): " + song[i].artists.map(getArtistNames));
			console.log("Song Name: " + song[i].name);
			console.log("Preview Song: " + song[i].preview_url);
			console.log("Album: " + song[i].album.name);
		}
	});
};

// Movie search function
function findMovie(myMovie) {
	if (myMovie === undefined) {
		myMovie = "Mr Nobody";
	}
	var queryUrl = "http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&tomatoes=true&r=json&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var movieData = JSON.parse(body);

			console.log("Title: " + movieData.Title);
			console.log("Year: " + movieData.Year);
			console.log("IMDB Rating: " + movieData.imdbRating);
			console.log("Rotten Tomatoes Rating: " + movieData.tomatoRating);
			console.log("Country: " + movieData.Country);
			console.log("Language: " + movieData.Language);
			console.log("Plot: " + movieData.Plot);
			console.log("Actors: " + movieData.Actors);
		}
	});
};

// Function for liri to read from random text file
function okLiri() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}
		console.log(data);
		var dataArr = data.split(",");
		
	});
};

// To take arguments
var request = process.argv[2];
var execute = process.argv[3];

//  Command function
	switch (request) {
		case "myTweets":
		 console.log("myTweets");
		myTweets();
		break;
		case "mySpotify":
		 console.log("mySpotify");
		mySpotify();
		break;
		case "findMovie":
		findMovie();
		break;
		case "ok":
		okLiri();
		break;
		default:
			console.log("liri doesn't know that");
	}

