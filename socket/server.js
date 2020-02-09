const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {
    addUser,
    removeUser,
    getUser,
    getUsersInMovieRoom
} = require('./container');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const SOCKET_PORT = 8444;

io.on('connection', socket => {
    socket.on('join', ({ userName, movieRoom }, callback) => {
        const { error, user } = addUser({ id: socket.id, userName, movieRoom });

        if (error) return callback(error);

        socket.emit('message', {
            userName: 'System',
            text: `${user.userName}, welcome to the room ${user.movieRoom}`
        });

        socket.broadcast.to(user.room).emit('message', {
            userName: 'System',
            text: `${user.userName} has joined!`
        });

        socket.join(user.movieRoom);

        io.to(user.movieRoom).emit('roomData', {
            movieRoom: user.movieRoom,
            users: getUsersInMovieRoom(user.movieRoom)
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.userName, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.movieRoom).emit('message', {
                user: 'System',
                text: `${user.userName} has left`
            });
            io.to(user.movieRoom).emit('roomData', {
                room: user.movieRoom,
                users: getUsersInMovieRoom(user.movieRoom)
            });
        }
    });
});

server.listen(SOCKET_PORT, () =>
    console.log(`Socket server is running on port ${SOCKET_PORT}`)
);
