let database = {
    movies: [
        {title: 'Looper',             release: 2012, available: false, imbdLink: 'https://www.imdb.com/title/tt1276104/', img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, imbdLink: 'https://www.imdb.com/title/tt0088763/', img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: false, imbdLink: 'https://www.imdb.com/title/tt1375666/', img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: true, imbdLink: 'https://www.imdb.com/title/tt0246578/', img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: false, imbdLink: 'https://www.imdb.com/title/tt0390384/', img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, imbdLink: 'https://www.imdb.com/title/tt0103064/', img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        {title: 'Source Code',        release: 2011, available: true, imbdLink: 'https://www.imdb.com/title/tt0945513/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Source_Code_Poster.jpg/220px-Source_Code_Poster.jpg' },
        {title: 'Déjà Vu',            release: 2006, available: false, imbdLink: 'https://www.imdb.com/title/tt0453467/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DejaVuBigPoster.jpg/220px-DejaVuBigPoster.jpg' }
    ],

    users: []
}

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

app.use('/users', userRouter)


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

// app.get('/movies', (req, res) => {

//     res.json({
//         message: 'All the movies in our database',
//         all_movies: database
//     })

// })

// app.get('/movies/:id', (req, res) => {

//     const moviePick = parseInt(req.params.id);

//     if (isNaN(moviePick)) {
        
//         res.json({
//             status: 404,
//             message: 'The selection you make must be a number between 1 and ' + database.length
//         })

//     } else if ( moviePick > 0 && moviePick < database.length) {

//         res.json({
//             status: 200,
//             message: `You picked the movie ${database[moviePick-1].title}`,
//             movie: database[moviePick-1]
//         })


//     } else {

//         res.json({
//             status: 404,
//             message: `${moviePick} is not in the valid range of movies`
//         })
//         //if moviePick is a num but not in the DB
//     }

// })

app.listen(port, () => {
    console.log(`Listening on port:${port}`);
    
})
