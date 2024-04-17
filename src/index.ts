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

type User = {
    username: string;
    socketID: string;
}
type clueObj = {
    clue: string;
    num: number;
}
type team = "red" | "blue" | "assassin" | "civilian"
type cardData = {
    word: string;
    team: team;
    clicked: boolean;
}
export type GameProperties = {
   // [key: string]: any;
    gameArray?: cardData[][];
    firstTeamWords?: string[];
    secondTeamWords?: string[];
    civilianWords?: string[];
    assassinWord?: string [];
    turn?: team;
    firstTeam?: team;
    secondTeam?: team;
    codeMasterView?: boolean;
    guessPhase?: boolean;
    guessesRemaining?: number;
    allDisable?: boolean;
    firstTeamScore?: number;
    secondTeamScore?: number;
    firstTeamClues?: clueObj [];
    secondTeamClues?: clueObj [];
    gameOver?: boolean;
};
// type GamePropertiesKeys = 'gameArray' | 'firstTeamWords' |  'secondTeamWords' |
// 'civilianWords' |
// 'assassinWord'|
// 'turn' |
// 'firstTeam' |
// 'secondTeam' |
// 'codeMasterView' |
// 'guessPhase' |
// 'guessesRemaining' |
// 'allDisable' |
// 'firstTeamScore' |
// 'secondTeamScore' |
// 'firstTeamClues' |
// 'secondTeamClues' | 
// 'gameOver' 

const setGameProperties = (updatedProperties: GameProperties) => {
    let updatedGameProperties: GameProperties = { ...gameProperties };
    for (const [key, value] of Object.entries(updatedProperties)) {
        updatedGameProperties[key] = value; // TODO: fix compilation error
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
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users.forEach(user => {
            console.log(user.socketID, socket.id)
        })
        
        users = users.filter(user => user.socketID !== socket.id);
        socketIO.emit('newUserResponse', users);
    });
    socket.on('newUser', (user: User) => {
        users.push(user);
        socketIO.emit('newUserResponse', users);
    });
    socket.on('gameStart', (data: GameProperties) => {
        if(users.length > 1){
            socketIO.emit('updateGamePropertiesResponse', gameProperties );
        }
        else{
            socketIO.emit('updateGamePropertiesResponse', setGameProperties(data));
        }
    });
    socket.on('updateGameProperties', (data: GameProperties) => {
        const updatedGameProperties = setGameProperties(data)
        socketIO.emit('updateGamePropertiesResponse', updatedGameProperties);
    });
    socket.on('showClues', () => {
        socketIO.emit('updateGamePropertiesResponse', setGameProperties({codeMasterView: !gameProperties.codeMasterView}));
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