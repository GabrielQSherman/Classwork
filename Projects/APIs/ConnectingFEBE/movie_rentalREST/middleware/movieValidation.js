const Movie = require('../models/Movie');
const validator = require("validator");

const validate = async (req, res, next) => {

  req.body.release = parseInt(req.body.release);
  req.body.available = parseInt(req.body.available);  

  const {title, img, imdb_link, release, available} = req.body;

        failedValues = [];
        
        if (!validator.isURL(img)) {
            failedValues.push({
                key: "image",
                message: "Poster Image Must Be A Link"
            })
        }

        if (!validator.isURL(imdb_link)) {
            failedValues.push({
                key: "imdb_link",
                message: "IMDB Page Must Be A Link"
            })
        }

        if (isNaN(release)) {
            failedValues.push({
                key: "release",
                message: "Release Year Must Be A Number"
            })
        }

        if (isNaN(available)) {
            failedValues.push({
                key: "available",
                message: "Release Year Must Be A Number"
            })
        }

        const titleExist = await Movie.findOne({ title: title }) != null; //expected outcome: boolean

        if (titleExist) {
            failedValues.push({
                key: "title",
                message: "Movie Title Already In Use"
            })
        }

        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else { next() }

}

module.exports = validate;