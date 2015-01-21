'use strict';

//----------//
// Requires //
//----------//

var express = require('express');
var Twitter = require('twitter');
var hbs = require('express-handlebars');


//-----------//
// Init Vars //
//-----------//

var client = new Twitter({
    consumer_key: process.env.TWITTER_MITCH_CONSUMER_KEY
    , consumer_secret: process.env.TWITTER_MITCH_CONSUMER_SECRET
    , access_token_key: process.env.TWITTER_MITCH_ACCESS_TOKEN
    , access_token_secret: process.env.TWITTER_MITCH_ACESSS_SECRET
});

var app = express();
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render("It's Mitch's birfday");
});

var server = app.listen(process.env.PORT || 5000);
