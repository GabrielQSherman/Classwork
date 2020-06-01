const mongoose = require('mongoose'),
      
      validator = require('validator'),

      UserSchema = mongoose.Schema({
          name: {
              type: String,
              required: true,
              unique: true

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
          }
      });

const Model = mongoose.model('User', UserSchema);

module.exports = Model;