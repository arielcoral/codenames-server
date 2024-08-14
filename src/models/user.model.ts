import mongoose, { Document, Schema  } from "mongoose";
import { role, team } from "../utils/types";

export interface User extends Document {
    id: string;
    userName: string;
    socketID: string;
    role: role;
    team: team;
}

const UserSchema = new Schema<User>({
    userName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
        unique: true
    },
    socketID: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30, // eather player or code-master
        unique: false
    },
    role: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11, // eather player or code-master
        unique: false
    },
    team: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 4, // eather red or blue
        unique: false
    }
});


export const UserModel = mongoose.model<User>('User', UserSchema);