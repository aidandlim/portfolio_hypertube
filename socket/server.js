const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {
    addUser,
    removeUser,
    getUser
} = require('./container');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const SOCKET_PORT = 8445;

io.on('connection', socket => {
    socket.on('join', ({ userName, movieRoom }, callback) => {
        const user = addUser({
            socketId: socket.id,
            userName,
            movieRoom
        });

        socket.join(user.movieRoom);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.movieRoom).emit('message', {
            userName: user.userName,
            text: message
        });

        callback();
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
    });
});

server.listen(SOCKET_PORT, () =>
    console.log(`Socket server is running on port ${SOCKET_PORT}`)
);
