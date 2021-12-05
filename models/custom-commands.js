const { Schema, model } = require('mongoose');

module.exports = model("costumecmd", new Schema({
        Guild: String,
        Command: String,
        Response: String
    })
);