window.onload = () => {

    createInitalElements()

    devStart()
    
}
function devStart() {

    const xhr = new XMLHttpRequest(),
    
    endpoint = `${location}movie/all`;
      
    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText);
        //display data to DOM with function
        console.log(response);

        displayAllMovies(response.movies)

    }

    xhr.send()

    console.log("Thank you API for allowing me to not write html code!\n");
}

function displayAllMovies(allMovies) {

    allMovies.forEach( singleMovie => {

        // console.log(singleMovie.img);

        //create html element variable that will be appended to the DOM 
         const  
         singleMovieDiv = createDivElement({class: 'movies'}),

             movieTitle = createHeading({size: 2, text: singleMovie.title}),

             movieRD = createHeading({text: `Year Released ${singleMovie.release}`, size: 4}),

             movieImgDiv = createDivElement({class: 'movieImgDiv'}),

             movieImage = createImg({class: 'movieImages', src: singleMovie.img, alt: singleMovie.title + ' Image'}),

             IMDBlink = createHyperLink({openNewTab: true, hrefLink: singleMovie.imbdLink, text: singleMovie.title + ' IMDB Page', class: 'imbdlink'});


        // console.log(movieTitle);
        
        //append to the child elements to the subdiv (one subdiv for each movie)
        singleMovieDiv.appendChild(movieTitle);

        singleMovieDiv.appendChild(movieImgDiv);

        singleMovieDiv.appendChild(movieRD);

        singleMovieDiv.appendChild(IMDBlink);

        //new variable to determine what div the subdiv(movieDiv) gets appended to 
        let appendLocation, clickMeText;

        //decide what div the movieDiv should be appened, depends on if its available or not
        if ( singleMovie.available === true ) {

            appendLocation = 'avldiv';

            clickMeText = createHeading({size: 5, text: 'Double Click To Rent', class: 'clickme'});

        } else {

            appendLocation = 'rntdiv';

            clickMeText = createHeading({size: 5, text: 'Double Click To Return', class: 'clickme'});
        }

        //append movie div to one of the main div containers
        document.getElementById(appendLocation).appendChild(singleMovieDiv);

        //adding ondblclick property to movie element
        // movieImage.ondblclick = movieRental.transferMovie;
        clickMeText.ondblclick = transferMovie;

        // clickMeText.style.display = 'none';
        clickMeText.value = singleMovie.title;

        movieImgDiv.appendChild(movieImage);
        movieImgDiv.appendChild(clickMeText);

    });

}

function rentRandomMov() {
    
}

function transferMovie() {
    
}