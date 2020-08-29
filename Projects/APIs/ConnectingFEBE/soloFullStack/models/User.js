const mongoose = require("mongoose");

const User = new mongoose.Schema({

    email: {
        required: true,
        type: String,
        unique: true
    },

    username: {
        required: true,
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20
    },

    password: {
        required: true,
        type: String,
        minlength: 7,
        maxlength: 100
    },

    adminProp: {
        adminLevel: {
            type: Number,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },

});

module.exports = mongoose.model("user", User );