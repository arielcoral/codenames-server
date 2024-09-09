import express from "express";
import cors from "cors";
import { GameProperties, GamePropertiesKey , SessionSocket, user } from "./utils/types";
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
import { getUsersByChatRoomID, getHeaders,  getChosenParts, getUserByUserName } from "./utils/sdk";

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

const setGameProperties = async (updatedProperties: GameProperties) => {
    const gamePropertiesJson = await fetch(`${REST_API_BASE_URL}/gameProperties/${updatedProperties.chatRoomID}`);
    const gameProperties = await gamePropertiesJson.json() as GameProperties [];
    if(gameProperties.length === 0){
        console.error('no game properties has been found for chatRoomID:',updatedProperties.chatRoomID)
    }
    const updatedGameProperties: GameProperties = { ...gameProperties[0] };
    for (const [key, value] of Object.entries(updatedProperties)) {
        (updatedGameProperties[key as GamePropertiesKey] as GameProperties)= value as GameProperties; 
    }
    try{
        axios.patch(`${REST_API_BASE_URL}/gameProperties`, updatedGameProperties)
    }
    catch(error){
        console.error(error);
    }
    return updatedGameProperties
}

const socketIO = new SocketIOServer(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});


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
            const disconnectedUser = (await getUserByUserName(socket.userName as string))
            const currentChatRoomID = disconnectedUser.chatRoomID 
            const offlineUserProperties = {
                isOnline: false,
                userName: socket.userName as string
            }
            await axios.patch(`${REST_API_BASE_URL}/user`, offlineUserProperties, {
                headers: getHeaders()
            });
            const usersInRoom = (await getUsersByChatRoomID(currentChatRoomID)) as user []
            if(usersInRoom.length - 1 === 0)
            { // TODO: delete the game from the db also after the game ends (when a team clicks on the assasin or finishes it's words)
                await axios.delete(`${REST_API_BASE_URL}/gameProperties/${currentChatRoomID}`, {
                    headers: getHeaders()
                });
            }
            socketIO.emit('updatingUsersResponse', usersInRoom);
        } catch (error) {
            console.error(error);
        }  
    });
    socket.on('getChosenParts', async (chatRoomID: number) => {
        const users = (await getUsersByChatRoomID(chatRoomID)) as user  []
        
        socketIO.emit('updatingUsersResponse', users);
        socketIO.emit('partsResponse', getChosenParts(await getUsersByChatRoomID(chatRoomID))); // to see the avilable parts in the waiting room (after a user enters the game)
    });
    socket.on('newUser', async (user: user, chatRoomID: number | undefined) => {
        if(chatRoomID === 0 || chatRoomID === undefined){ // the game is refrehed
            const us = (await getUserByUserName(user.userName))
            chatRoomID = us.chatRoomID 
        }
        const onlineUserProperties = {
            isOnline: true,
            userName: user.userName
        }
        await axios.patch(`${REST_API_BASE_URL}/user`, onlineUserProperties, {
            headers: getHeaders()
        });
        const users = (await getUsersByChatRoomID(chatRoomID)) as user  []
        
        socketIO.emit('updatingUsersResponse', users);
        socketIO.emit('partsResponse', getChosenParts(await getUsersByChatRoomID(chatRoomID))); // to see the avilable parts in the waiting room (after a user enters the game)
    });
    socket.on('gameStart', async (gameStartProperties: GameProperties) => {  
        const gamesCreatedJson = await fetch(`${REST_API_BASE_URL}/gameProperties/${gameStartProperties.chatRoomID}`);
        const gamesCreated = await gamesCreatedJson.json() as GameProperties [];
        if (gamesCreated.length === 0){
            try {
                await axios.post(`${REST_API_BASE_URL}/gameProperties`, gameStartProperties, {
                    headers: getHeaders()
                });
                const gameProperties = await setGameProperties(gameStartProperties)
                socketIO.emit('updateGamePropertiesResponse', gameProperties);
            } catch (error) {
                console.error(error);
                return { response: false, data: null };
            }  
        }
    });
    socket.on('updateGameProperties', async (gameProperties: GameProperties | 'none', userName?: string) => {
        if(gameProperties !== 'none'){
            const updatedGameProperties = await setGameProperties(gameProperties)
            socketIO.emit('updateGamePropertiesResponse', updatedGameProperties);
        }
        else if(userName){ // when a browser is refreshed
            const user = (await getUserByUserName(userName))
            const currentChatRoomID = user.chatRoomID
            const updatedGameProperties = await setGameProperties({chatRoomID: currentChatRoomID})
            socketIO.emit('updateGamePropertiesResponse', updatedGameProperties);
        }
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
