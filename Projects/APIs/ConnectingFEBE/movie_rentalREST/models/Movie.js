const mongoose = require('mongoose');

const validator = require('validator');

const Movie = new mongoose.Schema({

    title: {
        unique: true,
        required: true,
        type: String 
    },

    release: {
        required: true,
        type: Number
    },

    imdb_link: {
        required: true,
        type: String,
        validate: (value) => {
            
            const urlTest = !validator.isURL(value),

                  imdbTest = /imdb/;

            if (urlTest && imdbTest.test(value)) { //if the URL was not vaild

                throw new Error('IMDB link was invalid')
                
            }

        }
    },

    img: {
        required: true,
        type: String,
        validate: (value) => {

            const test = !validator.isURL(value)
            
            if ( test ) {
                throw new Error('Image Link Not Valid')
            }
        }
    },

    inventory: {

        required: false,

        type: Object,

        default: {
            available: {
                type: Number,
                min: 0,
                default: 10
            },
            rented: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'users',
                default: []
            }
        }

    }

})

module.exports = mongoose.model('Movie', Movie);//what we export