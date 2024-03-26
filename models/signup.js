const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
    id: String,
    name: String
});

const SignupModel = mongoose.model("Signup", SignupSchema);

module.exports = SignupModel;
