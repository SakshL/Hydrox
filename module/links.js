const mongoose = require("mongoose");
let hm = new mongoose.Schema({
    userID: String,
    userName: String,
    link: String, 
    code: String,
    server: String,
    name: String,
    time: String
});

module.exports = mongoose.model("links", hm);