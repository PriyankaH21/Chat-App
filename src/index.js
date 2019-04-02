const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require("path")
const Filter = require("bad-words")
const app = express();
const server = http.createServer(app)
const io = socketio(server)
const { generateMessage } = require('./utils/messages')
const { generatelocationMessage } = require('./utils/location')


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//called everytime a new connection(client) connects to server
io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    socket.on('join', ({username, room}) => {
      // call join to subscribe the socket to a given channel
        socket.join(room)

        socket.emit('message', generateMessage("Welcome"))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
      //socket.emit, io.emit, socket.broadcast.emit
      //io.to.emit - emit to specific Room
      //socket.broadcast.to.emit - emit to specifi chatroom except current client
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
          return callback ("Profanity is not allowed")
        }
        io.emit('message',generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback ) => {
        io.emit('locationMessage', generatelocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback()
    })


    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})
server.listen(port, () => {
    console.log('Server is up and running')
})
