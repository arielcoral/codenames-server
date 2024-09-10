import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import indexRouter from "./routes";
import mongoose from "mongoose";
import { MONGO_DB_URI, PORT } from "./utils/constants";

mongoose
.connect(MONGO_DB_URI as string)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error.message);
    process.exit(1);
});

app.use(indexRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})