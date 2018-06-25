//---------//
// Imports //
//---------//

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import hbs from 'express-hbs'
import http from 'http'
import https from 'https'
import path from 'path'
import Twitter from 'twitter'
import ws from 'ws'

import appConfig from './app-config'
import checkCertAndKeyDaily from './check-cert-and-key-daily'

//
//------//
// Init //
//------//

const app = express(),
  { isHttps, pathToCertAndKey, twitterConfig, websocket } = appConfig

const client = new Twitter(twitterConfig),
  environment = getEnvironment(),
  isDevelopment = environment === 'dev',
  maxTweetsSent = 2,
  pushIterationMs = 8000,
  staticDirectory = isDevelopment ? 'release/static' : 'static'

let currentTrack = '',
  curStream = null,
  sendTweets = [],
  timerSend = true,
  tweetBuffer = []

if (['dev', 'test', 'prod'].indexOf(environment) === -1) {
  throw new Error(
    `command-line environment '${environment}' wasn't the expected dev/test/or prod`
  )
}

//
//------//
// Main //
//------//

const getRequestListener = maybeLetsencryptDir => {
  const serverForWebsocket = createServerForWebsocket(),
    websocketServer = new ws.Server({ server: serverForWebsocket })

  websocketServer.broadcast = data => {
    const sendData = aClient => {
      aClient.send(JSON.stringify(data))
    }

    passThrough(websocketServer.clients, [keepWhen(isOpen), forEach(sendData)])
  }

  serverForWebsocket.listen(websocket.port)

  if (isHttps) checkCertAndKeyDaily(serverForWebsocket, pathToCertAndKey)

  const stream = createStream(websocketServer)

  if (maybeLetsencryptDir) {
    app.use(
      express.static(maybeLetsencryptDir, {
        dotfiles: 'allow',
      })
    )
  }

  app
    .engine('hbs', hbs.express4({ partials: 'views/partials' }))
    .set('view engine', 'hbs')
    .set('views', path.resolve(__dirname, 'views'))

    .use(compression())
    .use(express.static(path.resolve(__dirname, staticDirectory)))
    .use(
      bodyParser.urlencoded({
        extended: true,
      })
    )
    .use(bodyParser.json())

    .get('/', (_unused_req, res) => {
      res.render('home', {
        isDev: environment === 'dev',
        curTrack: currentTrack,
      })
    })

    .post('/track', (req, res) => {
      stream(req.body.track)
      res.sendStatus(200)
    })

  return app
}

//-------------//
// Helper Fxns //
//-------------//

function forEach(fn) {
  return arrayLike => Array.prototype.forEach.call([...arrayLike], fn)
}

function isOpen(client) {
  return client.readyState === ws.OPEN
}

function keepWhen(filterFunction) {
  return arrayLike =>
    Array.prototype.filter.call([...arrayLike], filterFunction)
}

function passThrough(arg, functionArray) {
  return functionArray.reduce((result, aFunction) => aFunction(result), arg)
}

function createStream(websocketServer) {
  return function stream(trackText) {
    if (curStream !== null) {
      curStream.destroy()
      curStream = null
      tweetBuffer = []
    }
    websocketServer.broadcast({ id: 'trackChange', data: trackText })
    currentTrack = trackText
    client.stream('statuses/filter', { track: trackText }, function(stream) {
      curStream = stream
      stream.on('data', aTweet => {
        if (!aTweet.user || !aTweet.text) {
          // not sure what this limit tweet is, but we don't care about them
          if (aTweet.limit) return

          /* eslint-disable no-console */
          console.log('unexpected tweet')
          console.log(aTweet)
          /* eslint-enable no-console */
          return
        }

        tweetBuffer.push({
          username: aTweet.user.screen_name,
          text: aTweet.text,
          created: aTweet.created_at,
        })

        if (tweetBuffer.length > 500) {
          tweetBuffer = tweetBuffer.slice(0, 100)
        }

        // timerSend is a throttle
        if (!timerSend) return

        if (tweetBuffer.length > maxTweetsSent) {
          sendTweets = tweetBuffer.slice(0, maxTweetsSent)
          tweetBuffer = tweetBuffer.slice(maxTweetsSent)
        } else {
          sendTweets = tweetBuffer
          tweetBuffer = []
        }
        websocketServer.broadcast({ id: 'twitterUpdate', data: sendTweets })
        timerSend = false
        setTimeout(() => {
          timerSend = true
        }, pushIterationMs)
      })
    })
  }
}

function getEnvironment() {
  return {
    development: 'dev',
    test: 'test',
    production: 'prod',
  }[process.env.NODE_ENV || 'production']
}

function createServerForWebsocket() {
  return isDevelopment
    ? http.createServer()
    : https.createServer(pathToCertAndKey)
}

//
//---------//
// Exports //
//---------//

export default { getRequestListener }
