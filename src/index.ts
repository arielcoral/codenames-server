import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://codenames3110:codenames440@codenames.l0w4vhy.mongodb.net/?retryWrites=true&w=majority&appName=codenames")
// mongoose.connect("mongodb://127.0.0.1:27017/codenanes")


app.listen(3001, () => {
    console.log("server is running on port 3001")
})