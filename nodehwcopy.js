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

	pullTweets: function(){
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

	pullSpotify: function(request){
		liri.write("User input: " + liri.userInput);
	
		// Requiring Spotify npm.
		var spotify = require('spotify');

	// Combining Node process.argv from index 3 and beyond to create a single request.
		for (var i=3; i < liri.nodeArgs.length; i++){
			request = liri.request + " " + liri.nodeArgs[i];

			// If the user puts in a request Spotify will pull up the first 5 matches.
			if (liri.request === liri.request) {
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
			} 
		}
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
		}

	},

	pullImdb: function(){
		liri.write("User input: " + liri.userInput);

	// Setting variable for imdb npm and key needed to pull data.
		var imdb = require('moviedb')('07a38162b206d7305e4adf4b96fc0fe9');

	// Combining Node process.argv from index 3 and beyond to create a single request.
		for (var i=3; i < liri.nodeArgs.length; i++){
			liri.request = liri.request + " " + liri.nodeArgs[i];
		
			// // If the user puts in a request IMDB will pull up the first match.
			if (liri.request === liri.request){
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
		// Calling npm to pull data specifically for the movie "Mr. Nobody" from IMDB if the user does not enter a request.
		if (liri.request === "") {
		
			liri.write("User input: " + liri.userInput + " Request was left blank.");

			imdb.searchMovie({ query: "Mr. Nobody" }, (err, res) => {
				console.log("Movie Title: " + res.results[0].original_title);
				console.log("Release date: " + res.results[0].release_date);
				console.log("Language: " + res.results[0].original_language);
				console.log("Plot: " + res.results[0].overview);
				console.log("IMDB Rating: " + res.results[0].vote_average);
			});
		}
	}
}

// Conditionals based on user request go down here.
if (liri.userInput === "my-tweets"){

	liri.pullTweets();	

} else if (liri.userInput === "spotify-this-song"){
	
	liri.pullSpotify();

}else if (liri.userInput === "movie-this"){

	liri.pullImdb();	

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
 
