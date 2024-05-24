import express from "express";
import cors from "cors";
import { GameProperties, GamePropertiesKey , Parts, SessionSocket, User } from "./utils/types";
const app = express();
app.use(express.json());
app.use(cors());
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
const http = createServer(app);
import { InMemorySessionStore } from "./SessionStore";
import { handlesSession } from "./middlewares/handlesSession";
import indexRouter from "./routes";
import mongoose from "mongoose";
// mongoose.connect("mongodb+srv://codenames3110:codenames440@codenames.l0w4vhy.mongodb.net/?retryWrites=true&w=majority&appName=codenames")

// app.post("/signup", (req, res) => {
//     LoginModel.create(req.body)
//         .then(login => {
//             res.json(login);
//             return; 
//         })
//         .catch(err => res.json(err))
// });
mongoose
.connect('mongodb://localhost:27017/codenames')
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});

app.use(indexRouter)


const setGameProperties = (updatedProperties: GameProperties) => {
    const updatedGameProperties: GameProperties = { ...gameProperties };
    for (const [key, value] of Object.entries(updatedProperties)) {
        (updatedGameProperties[key as GamePropertiesKey] as GameProperties)= value as GameProperties; 
    }
    gameProperties = updatedGameProperties;
    return updatedGameProperties
}

const socketIO = new SocketIOServer(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

let users: User[] = [];
let gameProperties: GameProperties = {}
let parts = {
    blueCM: false,
    redCM: false,
    blueP: false,
    redP: false
}

const sessionStore = new InMemorySessionStore();
socketIO.use(handlesSession(sessionStore));

socketIO.on('connection', (socket: SessionSocket) => {
    console.log(`⚡: ${socket.id} user just connected!`);   

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
    socket.on('fillPart', (updatedParts: Parts) => {
        parts = updatedParts;
        socketIO.emit('partsResponse', parts);
    });
    socket.on('newUser', (user: User) => {
        users.push(user);
        socketIO.emit('updatingUsersResponse', users);
        socketIO.emit('partsResponse', parts); // to see the avilable parts in the waiting room (after a user enters the game)
    });
    socket.on('gameStart', (data: GameProperties) => {        
        socketIO.emit('updateGamePropertiesResponse', setGameProperties(data));
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
