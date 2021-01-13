const mongoose = require('mongoose')
module.exports = mongoose.model('user', new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, minlength: 5, maxlength: 256},
    password: {type: String, required: true, minlength: 6, maxlength: 100},
}))