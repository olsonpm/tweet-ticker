'use strict';

//----------//
// Requires //
//----------//

var environment = process.argv[2];
if (['dev', 'test', 'prod'].indexOf(environment) === -1) {
    throw new Error("command-line environment '" + environment + "' wasn't the expected dev/test/or prod");
}

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Twitter = require('twitter');
var hbs = require('express-handlebars').create({
    helpers: {
        JSON2string: JSON2string
    }
});
var bodyParser = require('body-parser');


//-----------//
// Init Vars //
//-----------//

var client = new Twitter({
    consumer_key: process.env.TWITTER_PHIL_CONSUMER_KEY
    , consumer_secret: process.env.TWITTER_PHIL_CONSUMER_SECRET
    , access_token_key: process.env.TWITTER_PHIL_ACCESS_TOKEN
    , access_token_secret: process.env.TWITTER_PHIL_ACESSS_SECRET
});

var timerSend = true;
var tweetBuffer = [];
var sendTweets = [];
var attemptStream = true;
var curStream = null;
var pushIterationMs = 8000;
var maxTweetsSent = 2;
var currentTrack = '';

function stream(trackText) {
    if (curStream !== null) {
        curStream.destroy();
        curStream = null;
        tweetBuffer = [];
    }
    io.emit('track-change', trackText);
    currentTrack = trackText;
    client.stream(
        'statuses/filter'
        , {
            track: trackText
        },
        function(stream) {
            curStream = stream;
            stream.on('data', function(bdayTweet) {
                if (!bdayTweet.user || !bdayTweet.text) {
                    console.log('unexpected tweet');
                    console.log(bdayTweet);
                } else {
                    var tmpTweet = {
                        username: bdayTweet.user.screen_name
                        , text: bdayTweet.text
                        , created: bdayTweet.created_at
                    };
                    tweetBuffer.push(tmpTweet);
                    if (tweetBuffer.length > 500) {
                        tweetBuffer = tweetBuffer.slice(0, 100);
                    }
                    if (timerSend) {
                        if (tweetBuffer.length > maxTweetsSent) {
                            sendTweets = tweetBuffer.slice(0, maxTweetsSent);
                            tweetBuffer = tweetBuffer.slice(maxTweetsSent);
                        } else {
                            sendTweets = tweetBuffer;
                            tweetBuffer = [];
                        }
                        io.emit('twitter-update', sendTweets);
                        timerSend = false;
                        setTimeout(function() {
                            timerSend = true;
                        }, pushIterationMs);
                    }
                }
            });
            stream.on('error', function(err) {
                console.error('error');
                console.error(err);
            });
            stream.on('end', function(err) {
                console.log('stream ended');
            });
        });
}

/*
 * Simple helper to stringify an object.
 * Usage: {{ JSON2string object }}
 */
function JSON2string(obj) {
    return decodeURIComponent(JSON.stringify(obj));
}

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render("home", {
        isDev: (environment === 'dev')
        , curTrack: currentTrack
    });
});
app.post('/track', function(req, res) {
    stream(req.body.track);
    res.sendStatus(200);
});

server.listen(process.env.PORT || 5000, function() {
    console.log("Server started");
});
