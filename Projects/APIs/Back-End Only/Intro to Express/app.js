
const express = require('express'),

    morgan = require('morgan'),

    reqBodyLog = require('./middleware/reqBodyLog');

require('dotenv').config();

const port = process.env.PORT || 3000;

console.log(__dirname + '/static/home.html');

const app = express();

//Middleware

//middleware that will be executed on all routes with all request methods
app.use(express.static(__dirname +'/static'));
app.use(morgan('dev'));
app.use(express.json());


// client req -> express.static() -> morgan() -> express.json() -> specific route handling -> final middleware 

//middleware that will be executed on specific routes
    
//homepage
    const homeRouter = require('./routes/homeRouter');

    app.use('/', homeRouter);

//userpage
    const userRouter = require('./routes/usersRouter');

    app.use('/users', userRouter);

//movies page
    const movieRouter = require('./routes/movieRouter')//file name

    app.use('/movie', movieRouter)

app.listen(port, () => {

    console.log(`Listening on port:${port}`);
    
})