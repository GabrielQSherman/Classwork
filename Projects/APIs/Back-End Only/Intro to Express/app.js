
const express = require('express'),

    morgan = require('morgan'),

    reqBodyLog = require('./middleware/reqBodyLog');

require('dotenv').config();

const port = process.env.PORT || 3000;

console.log(__dirname + '/static/home.html');

const app = express();

app.use(express.static(__dirname +'/static'));
app.use(morgan('dev'));
app.use(express.json());

const homeRouter = require('./routes/homeRouter');

app.use('/', homeRouter);

const userRouter = require('./routes/usersRouter');

app.use('/users', userRouter);

const movieRouter = require('./routes/movieRouter')//file name

app.use('/movie', movieRouter)


// app.get('/about', (req, res) => {
//     res.send('Learn more about me!')
// })

// app.get('/query', (req, res) => {

//     const q = req.query;

//     const name = q.name;
//     const saying = q.say;
//     const color = q.color;

//     console.log(req.query);
//     res.json({
//         status: 200,
//         message: `A person named ${name}'s favorite color is ${color}, they have a catchphrase '${saying}'.`
//     })
// })


app.listen(port, () => {

    console.log(`Listening on port:${port}`);
    
})


// updating database with read/write file
//NOT BEING USED, only used once to transfer database obj to txt document

        // const fs = require('fs');

        // let textFile = process.cwd() + '/database/database.txt';

        // let parsedData = fs.readFileSync(textFile, 'utf8');

        // if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {
        //     parsedData = '{}'
        // }

        // parsedData = JSON.parse(parsedData);

        // parsedData.movies = database.movies;

        // console.log(parsedData);

        // parsedData = JSON.stringify(parsedData);

        // fs.writeFileSync(textFile, parsedData)    