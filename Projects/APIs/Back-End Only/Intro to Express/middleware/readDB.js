const fs = require('fs');

function retrieveDB( req, res, next ) {

    let textFile = process.cwd() + '/database/database.txt';
    
    const rawData = fs.readFileSync( textFile, 'utf8');

    const parsedData = JSON.parse(rawData);

    req.dbData = parsedData;

    next()

}

module.exports = retrieveDB;