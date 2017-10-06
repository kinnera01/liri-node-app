// Load the fs package to read and write
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var inquirer = require("inquirer");
console.log("Type:\n tweets---to get latest Tweets,\n spotify-this-song ---to get song info based on track,\n movie-this---to get song info  based on name ,\n or do-what-it-says to get started!");
var choice = process.argv[2];
var firstinput = process.argv[3];
var spotify = new Spotify({
  id: '2886cb80f5e141b7b166da5ddf8dd6ab',
  secret: '14605d5660e14606b10c73eb9fcc57af',
});
inquirer.prompt([
  {
  type: "list",
  message: "Whats would you like to do?",
  choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
  name: "selections"
}

]).then(function(select)
{
  // console.log(JSON.stringify(confData, null, 2));
  
  if (select.selections == "my-tweets") {
    console.log('')
    console.log(' You selected: my-tweets');
    inquirer.prompt([
      {
          type: "input",
          message: "What Tweets Do u want to Search?",
          name: "Tweet"
      }

  ]).then(function (inquirerResponse) {
    console.log(inquirerResponse.Tweet)
  appendtext();
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  var selection=inquirerResponse.Tweet
  var params = { screen_name: selection };
  console.log(params);
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (i = 0; i < tweets.length; i++) {
        appendtext("****************  Tweeter  *********************");
        appendtext('Number: ' + (i + 1));
        appendtext('Created_at: ' + tweets[i].created_at);
        appendtext('tweet: ' + tweets[i].text);
        appendtext('Retweets: ' + tweets[i].retweet_count);
        appendtext('Fav.Count: ' + tweets[i].favorite_count);
        appendtext("------------------------------------------------");
      }
    }
  })
});
  }
else if  (select.selections == "spotify-this-song"){
  var listofsongs=[];
  inquirer.prompt([
    {
        type: "input",
        message: "What Song Do u want to Search?",
        name: "track"
    }

]).then(function (inquirerResponse) {
  console.log(inquirerResponse.track)
  var firstinput=inquirerResponse.track;
  var songtrack;
  // console.log(songtrack);
  if (firstinput === undefined) {
    songtrack = "The Sign";
    // console.log(songtrack);
  }
  else {
    songtrack = firstinput;
    // console.log(songtrack);
  }
  fs.appendFile('random.txt', "\n"+"spotify-this-song:"+songtrack, (err) => {  
    if (err) throw err;
    console.log(' updated!');
  })
  
  spotify.search({ type: 'track', query: songtrack }, function (err, data) {
    var songs=data.tracks.items;
    for(var item in songs){
       listofsongs.push(songs[item].name);
    }
    inquirer.prompt([
      {
          type: "list",
          message: "Songs Related to your search?",
          choices: listofsongs,
          name: songs,
      }
  
  ]).then(function (inquirerResponse) {
    console.log(inquirerResponse.track)
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    appendtext("****************  Spotify-Song  *********************");
    appendtext("Song Name:" + data.tracks.items[0].name);
    appendtext("Preview Link:" + data.tracks.items[0].preview_url);
    appendtext("Artists:" + data.tracks.items[0].artists[0].name);
    appendtext("*****************  The End  ********************");
  });
})
})
}
// })
// })
// }


// movie details
else if  (select.selections == "movie-this") {
  inquirer.prompt([
    {
        type: "input",
        message: "What Movie Do u want to Search?",
        name: "name"
    }

]).then(function (inquirerResponse) {
  console.log(inquirerResponse.name)
  var firstinput=inquirerResponse.name;
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
      appendtext("****************  Movie-Details  *********************");
      appendtext("Movie Title: " + JSON.parse(body).Title);
      appendtext("Release Year: " + JSON.parse(body).Year);
      appendtext("IMDB Ratings: " + JSON.parse(body).imdbRating);
      appendtext("Rotten Tomatoes Ratings: " + JSON.parse(body).tomatoRating);
      appendtext("Country Produces: " + JSON.parse(body).Country);
      appendtext("Language: " + JSON.parse(body).Language);
      appendtext("Plot: " + JSON.parse(body).Plot);
      appendtext("Actors: " + JSON.parse(body).Actors);
      appendtext("*****************  The End  ********************");
    }
    else {
      console.log('Error occurred.')
    }
  })
})
}
else if (select.selections == "do-what-it-says") {
  console.log('')
  fs.readFile('song.txt', "utf8", function(error, data){
    var txt = data.split(',');
    console.log(txt);
    spotify.search({ type: 'track', query:txt[1]}, function (err, data) {
    
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      appendtext("****************  Spotify-Song  *********************");
      appendtext("Song Name:" + data.tracks.items[0].name);
      appendtext("Preview Link:" + data.tracks.items[0].preview_url);
      appendtext("Artists:" + data.tracks.items[0].artists[0].name);
      appendtext("*****************  The End  ********************");
    });
  })
}; 
function appendtext(inputstring){
  fs.appendFile('log.txt', "\n"+inputstring, (err) => {  
    if (err) throw err;
  })
  console.log(inputstring);
}
})