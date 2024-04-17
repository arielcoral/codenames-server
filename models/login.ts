import mongoose, { Document  } from "mongoose";

export interface Login extends Document {
    id: string;
    name: string;
}

const LoginSchema = new mongoose.Schema({
    id: String,
    name: String
});

export const LoginModel = mongoose.model<Login>("names", LoginSchema);


