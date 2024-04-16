const express = require('express');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const cors = require('cors');
const LoginModel = require('./models/login');
const e = require('express');


const app = express();
app.use(express.json());
app.use(cors());
const http = require('http').Server(app);
// mongoose.connect("mongodb+srv://codenames3110:codenames440@codenames.l0w4vhy.mongodb.net/?retryWrites=true&w=majority&appName=codenames")

// app.post("/signup", (req, res) => {
//     LoginModel.create(req.body)
//         .then(login => {
//             res.json(login);
//             return; 
//         })
//         .catch(err => res.json(err))
// });

const setGameProperties = (data, gameProperties) => {
    let updatedGameProperties = gameProperties;
    for (const [key, value] of Object.entries(data)) {
        updatedGameProperties[key] = value;
    }
    return updatedGameProperties
}

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});
let users = [];
let gameProperties = {}
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);  
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users.forEach(user => {
            console.log(user.socketID, socket.id)
        })
        
        users = users.filter(user => user.socketID !== socket.id);
        console.log("@@", users.length, "online");
        socketIO.emit('newUserResponse', users);
    });
    socket.on('newUser', (data) => {
        console.log(data)
        users.push(data);
        socketIO.emit('newUserResponse', users);
    });
    socket.on('gameStart', (data) => {
        if(users.length > 1){
            socketIO.emit('updateGamePropertiesResponse', gameProperties );
        }
        else{
            socketIO.emit('updateGamePropertiesResponse', setGameProperties(data, gameProperties));
        }
    });
    socket.on('updateGameProperties', (data) => {
        socketIO.emit('updateGamePropertiesResponse', setGameProperties(data, gameProperties));
    });
    socket.on('showClues', () => {
        socketIO.emit('updateGamePropertiesResponse', setGameProperties({codeMasterView: !gameProperties.codeMasterView}, gameProperties));
    });
    socket.on("join_room", (data) => {
        socket.join(data);
    });
});

app.listen(3001, () => {
    console.log("server is running on port 3001")
})
http.listen(3002, () => {
    console.log("http is running on port 3002")
})