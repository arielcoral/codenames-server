import mongoose, { Document  } from "mongoose";
import { role, team } from "../utils/types";

export interface User extends Document {
    id: string;
    userName: string;
    role: role;
    team: team;
}
const userSchema = new mongoose.Schema({
    id: String,
    userName: String,
    role: String,
    team: String
});

export const UserModel = mongoose.model<User>('User', userSchema);