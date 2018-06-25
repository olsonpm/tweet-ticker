import http from 'http'
import tweetTicker from './release/index.pack'

const reqListener = (req, res) => handleRequest(req, res)

http.createServer(reqListener).listen(8080)

const handleRequest = tweetTicker.getRequestListener()

console.log('listening on port 8080')
