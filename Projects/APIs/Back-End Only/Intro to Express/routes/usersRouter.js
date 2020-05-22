let express = require('express'),

    fs = require('fs'),

    router = express.Router();

//general get request for all users 
router.get('/', (req, res) => {
    
    res.send('User\'s Page')

});

//test GET request
router.get('/test', (req, res) => {
    
    let textFile = process.cwd() + '/database/database.txt';

    let parsedData = fs.readFileSync(textFile, 'utf8');

    console.log(parsedData);
    

    if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {
        
        res.send('no users yet');

    } 
    parsedData = JSON.parse(parsedData);

    let allUsers = '';

    for (let i = 0; i < parsedData.user.length; i++) {

        for (const key in  parsedData.user[i]) {
            
            const value = parsedData.user[i][key];
            
            allUsers += `User ${i+1})${key} - ${value}\n`;
            
        }
        
    }

    res.send(allUsers)

});

//post a new user
router.post('/', (req, res) => {

    let textFile = process.cwd() + '/database/database.txt';

    let parsedData = fs.readFileSync(textFile, 'utf8');

    console.log(parsedData);

    if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {
        parsedData = '{}'
    }
    
    parsedData = JSON.parse(parsedData);

    if (parsedData.user == undefined) {
        parsedData.user = [req.body];
    } else {
        parsedData.user.push(req.body)
    }

    parsedData = JSON.stringify(parsedData);

    fs.writeFileSync(textFile, parsedData)    
    
    res.json({
        message: 'successful new user',
        status: 200,
        new_user: req.body
    });
   

});

module.exports = router;
