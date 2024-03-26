const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    id: String,
    name: String
});

const LoginModel = mongoose.model("names", LoginSchema);

module.exports = LoginModel;
