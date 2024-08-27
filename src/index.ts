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
import { REST_API_BASE_URL } from "./utils/constants";
import axios from "axios";
import { getUsersByChatRoomID, getHeaders, getChatRoomIDFromUser } from "./utils/sdk";
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

// ----------------------------------------------------------------------------------------------------------------------------

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
    socket.on('disconnect', async () => {
        console.log('🔥: A user disconnected');
        try {
            const usersInRoom = (await getUsersByChatRoomID(await getChatRoomIDFromUser(socket.userName as string))) as User []
            await axios.delete(`${REST_API_BASE_URL}/user/${socket.userName}`, {
                headers: getHeaders()
            });
            socketIO.emit('updatingUsersOnlineResponse', usersInRoom.length - 1);
        } catch (error) {
            console.error(error);
        }  
    });
    socket.on('fillPart', (updatedParts: Parts) => {
        parts = updatedParts;
        socketIO.emit('partsResponse', parts);
    });
    socket.on('newUser', async (user: User, chatRoomID: number) => {
        const users = (await getUsersByChatRoomID(chatRoomID)) as User []
        users.push(user);
        socketIO.emit('updatingUsersOnlineResponse', users.length);
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
    console.log("socket is running on port 3002")
})
