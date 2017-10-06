Introduction

I created a node.js app called LIRI. LIRI is like SIRI (from an iphone).It must be ran in the command line.
LIRI is a Language Interpretation and Recognition Interface.LIRI will be a command line node app that takes in parameters and gives you back data.LIRI will do any of the below command when you enter them into the command line.

•	my-tweets
•	Spotify-this-song
•	movie-this
•	do-what-it-says

node liri.js my-tweets <tweets search >'
Type in node liri.js to get the instructions on how to enter the commands correctly. So if you were to type the below command you'd get the last 20 tweets of your input 
node liri.js Spotify-this-song '<song name here>'shows the following information about the song in the terminal
•	artist(s)
•	song name
•	preview link of the song from Spotify
•	album that the song is a part of

node liri.js movie-this '<movie name here>'this would output the following information to the terminal:
•	Title
•	Year
•	IMDB Rating
•	Country
•	Language
•	Plot
•	Actors
•	Rotten Tomatoes Rating
•	Rotten Tomatoes URL

node liri.js do-what-it-saysThese are the npm packages I used and are needed to run the app

NPM Packages Used:
•	twitter
•	Spotify
•	request
•	OMDB
•	Inquirer
