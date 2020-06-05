const mongoose = require('mongoose'),
      
      validator = require('validator');

      UserSchema = mongoose.Schema({
          name: {
              type: String,
              required: true,
              unique: true,

              minLength: 3,
              maxLength: 52,

          },

          email: {
              type: String,
              required: true,
              unique: true,
              validate: value => {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is not vaild')
                }
              }
          },

          password: {
              type: String,
              required: true,
              
              minLength: 7,
              maxLength: 1000
          }
      });

const Model = mongoose.model('User', UserSchema);

module.exports = Model;