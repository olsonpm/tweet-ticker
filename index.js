'use strict';

//----------//
// Requires //
//----------//

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
var fs = require('fs');


//-----------//
// Init Vars //
//-----------//

var client = new Twitter({
    consumer_key: process.env.TWITTER_MITCH_CONSUMER_KEY
    , consumer_secret: process.env.TWITTER_MITCH_CONSUMER_SECRET
    , access_token_key: process.env.TWITTER_MITCH_ACCESS_TOKEN
    , access_token_secret: process.env.TWITTER_MITCH_ACESSS_SECRET
});

var timerSend = true;
var tweetBuffer = [];
var sendTweets = [];
var last10 = [];
var attemptStream = true;
var attemptTimeout = 30000;
var streaming = true;

client.stream(
    'statuses/filter'
    , {
        track: "mitchsbirfday"
    },
    function(stream) {
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
                last10.unshift(tmpTweet);
                if (last10.length > 10) {
                    last10.pop();
                }
                if (tweetBuffer.length > 500) {
                    tweetBuffer = tweetBuffer.slice(0, 100);
                }
                if (timerSend) {
                    if (tweetBuffer.length > 2) {
                        sendTweets = tweetBuffer.slice(0, 2);
                        tweetBuffer = tweetBuffer.slice(2);
                    } else {
                        sendTweets = tweetBuffer;
                        tweetBuffer = [];
                    }
                    io.emit('twitter-update', sendTweets);
                    timerSend = false;
                    setTimeout(function() {
                        timerSend = true;
                    }, 5000);
                }
            }
        });
        stream.on('error', function(err) {
            console.error('error');
            console.error(err);
        });
        stream.on('end', function(err) {
            console.error('end');
            console.error(err);
        });
    });

/*
 * Simple helper to stringify an object.
 * Usage: {{ JSON2string object }}
 */
function JSON2string(obj) {
    return decodeURIComponent(JSON.stringify(obj));
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {

    res.render("home", {
        last10tweets: (last10.length > 0)
            ? last10
            : null
    });
});

server.listen(process.env.PORT || 5000, function() {
    console.log("Server started");
});
