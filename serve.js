import http from 'http'
import tweetTicker from './release/index.pack'

const reqListener = (req, res) => handleRequest(req, res),
  server = http.createServer(reqListener)

server.listen(8080)

const handleRequest = tweetTicker.getRequestListener('', server)

console.log('listening on port 8080')
