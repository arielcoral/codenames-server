const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const LoginModel = require('./models/login')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://codenames3110:codenames440@codenames.l0w4vhy.mongodb.net/?retryWrites=true&w=majority&appName=codenames")

app.post("/signup", (req, res) => {
    LoginModel.create(req.body)
        .then(login => {
            res.json(login);
            return; 
        })
        .catch(err => res.json(err))
});



app.listen(3001, () => {
    console.log("server is running on port 3001")
})