const mongoose = require('mongoose');

const UserConfig = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    coins: {
        type: Number,
        required: true,
        default: 10,
    },
    totalProjects: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model('UserConfig', UserConfig);