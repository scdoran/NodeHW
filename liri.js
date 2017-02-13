var userInput = process.argv[2]; 
var nodeArgs = process.argv;
var request = "";

if (userInput === "my-tweets"){
	
	var Twitter = require("twitter");
	var keys = require('./keys.js');

	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
	  	access_token_key: keys.twitterKeys.access_token_key,
	  	access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {sarahwearsacape: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets) {
	  if (!error) {
	  	for (var i = 0; i < 20; i++) {
	  		console.log("*********************************************");
	  		console.log(tweets[i].created_at);
	  		console.log(tweets[i].text);
	  	}
	  }
	});
} else if (userInput === "spotify-this-song"){

	var spotify = require('spotify');

	for (var i=2; i < nodeArgs.length; i++){
		request = request + " " + nodeArgs[i];

		spotify.search({ type: 'track', query: request }, function(err, data) {
		    if ( err ) {
		    	spotify.search({type: 'track', query: 'The Sign'})
		        console.log("Artist: " + data.tracks.items[0].album.artists.name);
		        console.log("Song Name: " + data.tracks.items[0].album.name);
		        console.log("Preview Link: " + data.tracks.items[0].album.preview_url);
		        console.log("Album: " + data.tracks.items[0].album.name);
		        return;
		    } 
	  		
	  		// for (var i = 0; i < 10; i++) {
			    console.log("************************************************");
			    console.log(" ");
			    console.log("Artist: " , data.tracks.items.artists.name);
			    console.log("Song Name: " , data.tracks.items.album.name);
			    console.log("Preview Link: " , data.tracks.items.album.preview_url);
			    console.log("Album: " , data.tracks.items.name);
			    console.log(" ");
			    console.log("************************************************");
			// }
	 	});
 	}

}else if (userInput === "movie-this"){
	var imdb = require('moviedb')('07a38162b206d7305e4adf4b96fc0fe9');

	for (var i=2; i < nodeArgs.length; i++){
		request = request + " " + nodeArgs[i];

		imdb.searchMovie({ query: request }, (err, res) => {
			if (err){
				imdb.searchMovie({ id: 'tt0485947' }, (err, res) => {
			  		console.log("Movie Title: " + res.results.original_title);
			  		console.log("Release date: " + res.results.release_date);
			  		console.log("Language: " + res.results.original_language);
			  		console.log("Plot: " + res.results.overview);
			  		console.log("IMDB Rating: " + res.results.vote_average);
		  		}); 
	  		}
	  		console.log("Movie Title: " + res.results[0].original_title);
		  	console.log("Release date: " + res.results[0].release_date);
		  	console.log("Language: " + res.results[0].original_language);
		  	console.log("Plot: " + res.results[0].overview);
		  	console.log("IMDB Rating: " + res.results[0].vote_average);
		});
	}

} else if (userInput === "do-what-it-says"){

}
 
