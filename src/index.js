const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require("path")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//called everytime a new connection(client) connects to server
io.on('connection', (socket) => {
    console.log('New WebSocket Connection')
    socket.emit('message', 'Welcome')

    socket.on('sendMessage', (message) => {
        io.emit('message',message)
    })

    socket.io('disconnect', () => {
        io.emit('message', 'A user has left')
    })

    socket.on('sendLocation', (coords ) => {
        io.emit('message', `Location: ${coords.latitude}, ${coords.longitude}`)
    })
})
app.listen(port, () => {
    console.log('Server is up and running')
})
