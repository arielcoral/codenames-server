import mongoose, { Document  } from "mongoose";

export interface Signup extends Document {
    id: string;
    name: string;
}
const SignupSchema = new mongoose.Schema({
    id: String,
    name: String
});

export const SignupModel = mongoose.model("Signup", SignupSchema);

module.exports = SignupModel;
