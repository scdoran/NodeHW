var liri = {
	userInput: process.argv[2], 
	nodeArgs: process.argv,
	request: "",

// Function that will append the requests to log.txt.
	write: function (userInput, request) {
		var fs = require('fs');

		fs.appendFile("log.txt", userInput, request,
			function(err) {
				if (err) {
					console.log(err);
				}	
		})
	},
// Function that will pull tweets using the npm Twitter package.
	pullTweets: function(){
		// Write the user's input in the log.txt file.
		liri.write("User input: " + liri.userInput);
	
		// Requiring Twitter npm and keys.js.
		var Twitter = require("twitter");
		var keys = require('./keys.js');

		var client = new Twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
		  	access_token_key: keys.twitterKeys.access_token_key,
		  	access_token_secret: keys.twitterKeys.access_token_secret
		});
		
		// Calling npm to pull data from Twitter.
		var params = {sarahwearsacape: 'nodejs'};
		client.get('statuses/user_timeline', params, function(error, tweets) {
		  if (!error) {
		  	for (var i = 0; i < 20; i++) {
		  		console.log("*********************************************");
		  		console.log(tweets[i].created_at);
		  		console.log(tweets[i].text);
		  		liri.write(" Tweets: " + tweets[i].created_at + tweets[i].text);
		  	}
		  }
		});

	},
// Function that will pull song data from Spotify using the npm Spotify package.
	pullSpotify: function(request){
		liri.write("User input: " + liri.userInput);
	
		// Requiring Spotify npm.
		var spotify = require('spotify');

		// 	// If the user puts in a request Spotify will pull up the first 5 matches.
				spotify.search({ type: 'track', query: request }, function(err, data) {
				    if ( err ) {
				    	console.log(err);
				    }
					for (var i = 0; i < 5; i++) {
						console.log("************************************************");
						console.log("Artist: " + data.tracks.items[i].artists[0].name);
						console.log("Song Name: " + data.tracks.items[i].name);
						console.log("Preview Link: " + data.tracks.items[i].preview_url);
						console.log("Album: " + data.tracks.items[i].album.name);
						console.log(" ");
						console.log("************************************************");
						liri.write(" " + " Result " + [i] + " " + 
									" Artist: " + data.tracks.items[i].artists[0].name + 
									" Song Name: " + data.tracks.items[i].name + 
									" Preview Link: " + data.tracks.items[i].preview_url + 
									" Album: " + data.tracks.items[i].album.name + ""); 
					}
				});

	},
// Function that will pull movie data using the npm IMDB package.
	pullImdb: function(){
		liri.write("User input: " + liri.userInput);

	// Setting variable for imdb npm and key needed to pull data.
		var imdb = require('moviedb')('07a38162b206d7305e4adf4b96fc0fe9');
		
			// // If the user puts in a request IMDB will pull up the first match.
				imdb.searchMovie({ query: liri.request }, (err, res) => {
					if (err){
						console.log(err); 
			  		}
			  		// If you want to loop through more than one result.
					// for (var i = 0; i < 5; i++) {
						console.log("************************************************");
						console.log(" ");
				  		console.log("Movie Title: " + res.results[0].original_title);
					  	console.log("Release date: " + res.results[0].release_date);
					  	console.log("Language: " + res.results[0].original_language);
					  	console.log("Plot: " + res.results[0].overview);
					  	console.log("IMDB Rating: " + res.results[0].vote_average);
						console.log(" ");
						console.log("************************************************");
						liri.write(" " + " Result " + [0] + " " + 
									" Movie Title: " + res.results[0].original_title + 
									" Release date: " + res.results[0].release_date + 
									" Language: " + res.results[0].original_language + 
									" Plot: " + res.results[0].overview + 
									" IMDB Rating: " + res.results[0].vote_average + " "); 
					// }
				});
	}

}

// Conditionals based on user request go down here.
if (liri.userInput === "my-tweets"){
	// Call the function to pull tweets.
	liri.pullTweets();	

} else if (liri.userInput === "spotify-this-song"){

	// Combining Node process.argv from index 3 and beyond to create a single request.
	for (var i=3; i < liri.nodeArgs.length; i++){
		liri.request = liri.request + " " + liri.nodeArgs[i];
	}
		
	var spotify = require('spotify');

	// Calling npm to pull data specifically for the song "The Sign" from Spotify if the user does not enter a request.
	if (liri.request === "") {
		
			liri.write("User input: " + liri.userInput + " Request was left blank.");

			spotify.search({type: 'track', query: 'The Sign'}, function(err, data) {
				if (err){
					console.log(err);
				}
					console.log("************************************************");
					console.log(" ");
					console.log("Artist: " + data.tracks.items[4].artists[0].name);
					console.log("Song Name: " + data.tracks.items[4].name);
					console.log("Preview Link: " + data.tracks.items[4].preview_url);
					console.log("Album: " + data.tracks.items[4].album.name);
					console.log(" ");
					console.log("************************************************");
			});
	} else if (liri.request === liri.request) {
		// Call data to pull Spotify data.
		liri.pullSpotify(liri.request);
	}

}else if (liri.userInput === "movie-this"){

	var imdb = require('moviedb')('07a38162b206d7305e4adf4b96fc0fe9');

	// Combining Node process.argv from index 3 and beyond to create a single request.
	for (var i=3; i < liri.nodeArgs.length; i++){
		liri.request = liri.request + " " + liri.nodeArgs[i];
	}

	// Calling npm to pull data specifically for the movie "Mr. Nobody" from IMDB if the user does not enter a request.
		if (liri.request === "") {
		
			liri.write("User input: " + liri.userInput + " Request was left blank.");

			imdb.searchMovie({ query: "Mr. Nobody" }, (err, res) => {
				console.log("************************************************");
				console.log(" ");
				console.log("Movie Title: " + res.results[0].original_title);
				console.log("Release date: " + res.results[0].release_date);
				console.log("Language: " + res.results[0].original_language);
				console.log("Plot: " + res.results[0].overview);
				console.log("IMDB Rating: " + res.results[0].vote_average);
				console.log(" ");
				console.log("************************************************");

			});
		} else if (liri.request === liri.request) {
		// Call data to pull IMDB data. 
			liri.pullImdb(liri.request);
		}

} else if (liri.userInput === "do-what-it-says"){
	
	liri.write("User input: " + liri.userInput);

	var fs = require('fs');
// We are going to read the file called random.txt and use the data to pull a request from the spotify npm.
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err){
			console.log(err);
		}
		var random = data.split(",");
// The song title is index one when we split the data from the document and turn it into an array.
		console.log("You've asked Liri to " + random[0] + random[1]);
		console.log("Pulling song data now.");

		liri.pullSpotify(random[1]);
	});
}