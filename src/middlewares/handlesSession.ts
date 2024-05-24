import { NextFunction } from "express";
import { InMemorySessionStore } from "../SessionStore";
import { SessionSocket } from "../utils/types";
import { randomId } from "../utils/sdk";


// export const handlesSession = (socket: SessionSocket, next: NextFunction) => {
//     const sessionID: string = socket.handshake.auth.sessionID;
//     if (sessionID) {
//         const session = sessionStore.findSession(sessionID);
//         if (session) {
//             socket.sessionID = sessionID;
//             socket.userID = session.userID;
//             socket.userName = session.userName; // undifined for now TODO: fix it
//             return next();
//         }
//     }
//     const username = socket.handshake.auth.userName
//     if (!username) {
//         return next(new Error("invalid username"));
//     }

//     socket.sessionID = randomId();
//     socket.userID = randomId();
//     socket.userName = username;
//     next();
// };

export const handlesSession = (sessionStore: InMemorySessionStore) => {
    return (socket: SessionSocket, next: NextFunction) => {
        const sessionID: string = socket.handshake.auth.sessionID;
        if (sessionID) {
            const session = sessionStore.findSession(sessionID);
            if (session) {
                socket.sessionID = sessionID;
                socket.userID = session.userID;
                socket.userName = session.userName; // undefined for now TODO: fix it
                return next();
            }
        }
        const username = socket.handshake.auth.userName;
        if (!username) {
            return next(new Error("invalid username"));
        }

        socket.sessionID = randomId();
        socket.userID = randomId();
        socket.userName = username;
        next();
    };
};
