const socket = require('socket.io')
let io

const socketListen = (server, cb) => {
  io = socket(server)
  io.on('connection', (socket) => {
    console.log('Connection on')
  })
  return io
}

const getIo = () => io

module.exports = {
  getIo,
  socketListen
}
