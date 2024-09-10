import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import indexRouter from "./routes";
import mongoose from "mongoose";

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

app.listen(3001, () => {
    console.log("server is running on port 3001")
})