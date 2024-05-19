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

import express, { NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { GameProperties, GamePropertiesKey, SessionSocket, User } from "./utils/types";
import crypto from 'crypto'
const app = express();
app.use(express.json());
app.use(cors());
const http = require('http').Server(app);
const randomId = () => crypto.randomBytes(8).toString("hex");
import { InMemorySessionStore } from "./SessionStore";
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
    const updatedGameProperties: GameProperties = { ...gameProperties };
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

const sessionStore = new InMemorySessionStore();
socketIO.use((socket: SessionSocket, next: NextFunction) => {
    const sessionID: string = socket.handshake.auth.sessionID;
    if (sessionID) {
        const session = sessionStore.findSession(sessionID);
        if (session) {
            socket.sessionID = sessionID;
            socket.userID = session.userID;
            socket.userName = session.userName; // undifined for now TODO: fix it
            return next();
        }
    }
    const username = socket.handshake.auth.userName
    if (!username) {
        return next(new Error("invalid username"));
    }

    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.userName = username;
    next();
});

socketIO.on('connection', (socket: SessionSocket) => {
    console.log(`⚡: ${socket.id} user just connected!`);   
   // console.log(`⚡: ${socket.auth} username`);      

    sessionStore.saveSession(socket.sessionID as string, {
        userID: socket.userID as string,
        userName: socket.userName as string,
        connected: true,
    });
    socket.emit("session", {
        sessionID: socket.sessionID,
        userID: socket.userID,
    });
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        
        users = users.filter(user => user.socketID !== socket.id);
        socketIO.emit('updatingUsersResponse', users);
    });
    socket.on('newUser', (user: User) => {
        users.push(user);
        console.log("@@ users", users.length)
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
