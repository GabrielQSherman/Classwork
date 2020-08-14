const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 33,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    email:{
        type: String,
        required: true,
        minlength: 6,
        maxLength: 200,
        unique: true,
    },
    emailValidated:{
        type:Boolean,
        default: false
    }
})


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;