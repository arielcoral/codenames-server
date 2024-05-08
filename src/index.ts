// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb+srv://codenames3110:codenames440@codenames.l0w4vhy.mongodb.net/?retryWrites=true&w=majority&appName=codenames")
// // mongoose.connect("mongodb://127.0.0.1:27017/codenanes")


// app.listen(3001, () => {
//     console.log("server is running on port 3001")
// })

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { GameProperties, GamePropertiesKey, User } from "./utils/types";

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

const setGameProperties = (updatedProperties: GameProperties) => {
    let updatedGameProperties: GameProperties = { ...gameProperties };
    for (const [key, value] of Object.entries(updatedProperties)) {
        (updatedGameProperties[key as GamePropertiesKey] as GameProperties)= value as GameProperties; // TODO: fix compilation error
    }
    gameProperties = updatedGameProperties;
    return updatedGameProperties
}


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});
let users: User[] = [];
let gameProperties: GameProperties = {}
socketIO.on('connection', (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);  

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users.forEach(user => {
            console.log(user.socketID, socket.id)
        })
        
        users = users.filter(user => user.socketID !== socket.id);
        socketIO.emit('updatingUsersResponse', users);
    });
    socket.on('newUser', (user: User) => {
        users.push(user);
        socketIO.emit('updatingUsersResponse', users);
    });
    socket.on('gameStart', (data: GameProperties) => {
        if(users.length > 1){
            socketIO.emit('updateGamePropertiesResponse', gameProperties );
        }
        else{
            socketIO.emit('updateGamePropertiesResponse', setGameProperties(data));
        }
    });
    socket.on('updateGameProperties', (gameProperties: GameProperties) => {
        const updatedGameProperties = setGameProperties(gameProperties)
        socketIO.emit('updateGamePropertiesResponse', updatedGameProperties);
    });
    socket.on('showClues', () => {
        socketIO.emit('updateGamePropertiesResponse', setGameProperties({codeMasterView: !gameProperties.codeMasterView}));
    });
    socket.on("join_room", (chatRoomId: string) => {
        socket.join(chatRoomId);
    });
});

app.listen(3001, () => {
    console.log("server is running on port 3001")
})
http.listen(3002, () => {
    console.log("http is running on port 3002")
})