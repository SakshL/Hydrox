const { Schema, model } = require('mongoose');

module.exports = model("Mod-logs", new Schema({
        Guild: String,
        Channel: String,
    })
);