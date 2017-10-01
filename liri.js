// Load the fs package to read and write
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
console.log("Type:\n tweets---to get latest Tweets,\n spotify-this-song ---to get song info based on track,\n movie-this---to get song info  based on name ,\n or do-what-it-says to get started!");
var choice = process.argv[2];

var firstinput = process.argv[3];

//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
for (i = 4; i < process.argv.length; i++) {
  firstinput += '+' + process.argv[i];
}
var spotify = new Spotify({
  id: '2886cb80f5e141b7b166da5ddf8dd6ab',
  secret: '14605d5660e14606b10c73eb9fcc57af',
});
theGreatSwitch();
function theGreatSwitch() {
  //action statement, switch statement to declare what action to execute.
  console.log(choice);
  switch (choice) {
    case 'tweets':
      Tweets();
      break;

    case 'spotify-this-song':
      song();
      break;

    case 'movie-this':
      Movie();
      break;

    // case 'do-what-it-says':
    // followTheTextbook();
    // break;

  }
}
function Tweets() {
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  var params = { screen_name: firstinput };
  console.log(params);
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (i = 0; i < tweets.length; i++) {
        // var Data = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
        console.log("****************  Tweeter  *********************");
        console.log('Number: ' + (i + 1));
        console.log('Created_at: ' + tweets[i].created_at);
        console.log('tweet: ' + tweets[i].text);
        console.log('Retweets: ' + tweets[i].retweet_count);
        console.log('Fav.Count: ' + tweets[i].favorite_count);
        console.log("------------------------------------------------");
      }
    }
  });
}
function song() {
  var songtrack;
  console.log(songtrack);
  if (firstinput === undefined) {
    songtrack = "The Sign";
    console.log(songtrack);
  }
  else {
    songtrack = firstinput;
    console.log(songtrack);
  }
  spotify.search({ type: 'track', query: songtrack }, function (err, data) {
    console.log(songtrack);
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("****************  Spotify-Song  *********************");
    console.log("Song Name:" + data.tracks.items[0].name);
    console.log("Preview Link:" + data.tracks.items[0].preview_url);
    console.log("Artists:" + data.tracks.items[0].artists[0].name);
    console.log("*****************  The End  ********************");
  });
}
// movie details
function Movie() {
  console.log(firstinput);
  var movieName;
  console.log(movieName);
  if (firstinput === undefined) {
    movieName = "Mr.Nobody";
    console.log("1" + movieName);
  }
  else {
    movieName = firstinput;
    console.log(movieName);
  }
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  request(queryUrl, function (error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("****************  Movie-Details  *********************");
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Ratings: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Ratings: " + JSON.parse(body).tomatoRating);
      console.log("Country Produces: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("*****************  The End  ********************");
    }
    else {
      console.log('Error occurred.')
    }
  });
}