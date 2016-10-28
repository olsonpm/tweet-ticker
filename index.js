'use strict';


//---------//
// Imports //
//---------//

const bodyParser = require('body-parser')
  , compression = require('compression')
  , express = require('express')
  , fp = require('lodash/fp')
  , hbs = require('express-hbs')
  , socketIo = require('socket.io')
  , minimist = require('minimist')
  , path = require('path')
  , Twitter = require('twitter')
  ;


//------//
// Init //
//------//


const app = express()
  , get = fp.curry((obj, path) => fp.get(path, obj))
  ;

const twitterEnvs = {
    consumer_key: 'TWITTER_PHIL_CONSUMER_KEY'
    , consumer_secret: 'TWITTER_PHIL_CONSUMER_SECRET'
    , access_token_key: 'TWITTER_PHIL_ACCESS_TOKEN'
    , access_token_secret: 'TWITTER_PHIL_ACCESS_SECRET'
  }
  , twitterConfig = fp.mapValues(get(process.env), twitterEnvs)
  ;

const argv = minimist(process.argv.slice(2))
  , client = new Twitter(twitterConfig)
  , environment = argv.env || 'dev'
  , maxTweetsSent = 2
  , prepend = getPrepend()
  , pushIterationMs = 8000
  ;

let currentTrack = ''
  , curStream = null
  , io
  , sendTweets = []
  , timerSend = true
  , tweetBuffer = []
  ;

if (['dev', 'test', 'prod'].indexOf(environment) === -1) {
  throw new Error("command-line environment '" + environment + "' wasn't the expected dev/test/or prod");
}

const missingEnvironmentVars = fp.pickBy(fp.isUndefined, twitterConfig);
if (fp.size(missingEnvironmentVars)) {
  const errMsg = fp.flow(
    fp.keys
    , fp.map(get(twitterEnvs))
    , fp.map(prepend('\n  '))
    , fp.join('')
  )(missingEnvironmentVars);
  throw new Error('The following environment variables must exist' + errMsg);
}


//------//
// Main //
//------//


const getRequestListener = (letsencryptDir, server, ioNamespace) => {
  io = socketIo(server).of(ioNamespace);

  if (letsencryptDir) {
    app.use(express.static(letsencryptDir, {
      dotfiles: 'allow'
    }));
  }

  app.engine('hbs', hbs.express4({ partials: 'views/partials' }))
    .set('view engine', 'hbs')
    .set('views', path.join(__dirname, '/views'))

    .use(compression())
    .use(express.static(__dirname + '/static'))
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json())

    .get('/', (req, res) => {
      res.render("home", {
        isDev: (environment === 'dev')
        , curTrack: currentTrack
      });
    })

    .get('/io-namespace', (req, res) => {
      res.end(ioNamespace);
    })

    .post('/track', (req, res) => {
      stream(req.body.track);
      res.sendStatus(200);
    });

  return app;
};


//-------------//
// Helper Fxns //
//-------------//

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
    , { track: trackText }
    , function(stream) {
      curStream = stream;
      stream.on('data', aTweet => {
        if (!aTweet.user || !aTweet.text) {
          // not sure what this limit tweet is, but we don't care about them
          if (aTweet.limit) return;

          console.log('unexpected tweet');
          console.log(aTweet);
          return;
        }

        tweetBuffer.push({
          username: aTweet.user.screen_name
          , text: aTweet.text
          , created: aTweet.created_at
        });

        if (tweetBuffer.length > 500) {
          tweetBuffer = tweetBuffer.slice(0, 100);
        }

        // timerSend is a throttle
        if (!timerSend) return;

        if (tweetBuffer.length > maxTweetsSent) {
          sendTweets = tweetBuffer.slice(0, maxTweetsSent);
          tweetBuffer = tweetBuffer.slice(maxTweetsSent);
        } else {
          sendTweets = tweetBuffer;
          tweetBuffer = [];
        }
        io.emit('twitter-update', sendTweets);
        timerSend = false;
        setTimeout(
          () => { timerSend = true; }
          , pushIterationMs
        );
      });
      stream.on('error', err => {
        console.error('error');
        console.error(err);
      });
      stream.on('end', () => {
        console.log('stream ended');
      });
    }
  );
}

function getPrepend() {
  return fp.curry(
    (str, val) => str + fp.toString(val)
  );
}


//---------//
// Exports //
//---------//

module.exports = { getRequestListener };
