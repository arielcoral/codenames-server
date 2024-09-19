import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import indexRouter from "./routes";
import mongoose from "mongoose";
import { MONGO_DB_URI, PORT } from "./utils/constants";
import { deleteOldUsers } from "./controllers/user.controllers";
import { deleteOldGames } from "./controllers/gameProperties.controllers";

mongoose
.connect(MONGO_DB_URI as string)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});

setInterval(async () => {
    deleteOldUsers();
    deleteOldGames();
}, 60 * 60 * 1000); // every 5 minutes

app.use(indexRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})