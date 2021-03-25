const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})



io.on('connection', (socket) => {
    socket.emit("me", socket.id)


    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on('callUser', (data) => {
        socket.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on('answerCall', (data) => {
        socket.to(data.to).emit("callAccepted", data.signal)
    })
})

server.listen(5000, () => console.log('server listening on port 5000'))