
document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {

        case 'ArrowLeft':

            movieRental.AdisplayStart = movieRental.AdisplayStart > 0 ? --movieRental.AdisplayStart : movieRental.allMovies.filter( movie => {return movie.available}).length-1;

            movieRental.AdisplayEnd = movieRental.AdisplayEnd > 0 ? --movieRental.AdisplayEnd : movieRental.allMovies.filter( movie => {return movie.available}).length-1;

            movieRental.displayAllMovies()

            break;

        case 'ArrowRight':

            movieRental.AdisplayStart = movieRental.AdisplayStart < movieRental.allMovies.filter( movie => {return movie.available}).length-1 ? ++movieRental.AdisplayStart : 0;

            movieRental.AdisplayEnd = movieRental.AdisplayEnd < movieRental.allMovies.filter( movie => {return movie.available}).length-1 ? ++movieRental.AdisplayEnd : 0;

            movieRental.displayAllMovies()

            break;

        case 'Comma':

             movieRental.RdisplayStart = movieRental.RdisplayStart > 0 ? --movieRental.RdisplayStart : movieRental.allMovies.filter( movie => {return !movie.available}).length-1;

            movieRental.RdisplayEnd = movieRental.RdisplayEnd > 0 ? --movieRental.RdisplayEnd : movieRental.allMovies.filter( movie => {return !movie.available}).length-1;

            movieRental.displayAllMovies()


            break;

        case 'Period':

             movieRental.RdisplayStart = movieRental.RdisplayStart < movieRental.allMovies.filter( movie => {return !movie.available}).length-1 ? ++movieRental.RdisplayStart : 0;

            movieRental.RdisplayEnd = movieRental.RdisplayEnd < movieRental.allMovies.filter( movie => {return !movie.available}).length-1 ? ++movieRental.RdisplayEnd : 0;

            movieRental.displayAllMovies()
            
            break;
    
        default:
            break;
    }
    
}


let movieRental = {
     allMovies: [

        {title: 'Looper',             release: 2012, available: false, imbdLink: 'https://www.imdb.com/title/tt1276104/', img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, imbdLink: 'https://www.imdb.com/title/tt0088763/', img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: false, imbdLink: 'https://www.imdb.com/title/tt1375666/', img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: true, imbdLink: 'https://www.imdb.com/title/tt0246578/', img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: true, imbdLink: 'https://www.imdb.com/title/tt0390384/', img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, imbdLink: 'https://www.imdb.com/title/tt0103064/', img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        {title: 'Source Code',        release: 2011, available: true, imbdLink: 'https://www.imdb.com/title/tt0945513/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Source_Code_Poster.jpg/220px-Source_Code_Poster.jpg' },
        {title: 'Déjà Vu',            release: 2006, available: false, imbdLink: 'https://www.imdb.com/title/tt0453467/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DejaVuBigPoster.jpg/220px-DejaVuBigPoster.jpg' }

    ],

    AdisplayStart: 0,

    AdisplayEnd: 3,

    RdisplayStart: 0,

    RdisplayEnd: 3,
 
    displayAllMovies() {

        document.getElementById('aDiv').innerHTML = '';
        document.getElementById('rDiv').innerHTML = '';

        this.allMovies.sort( (a,b) => {return a.title > b.title } )

        let moviesInA = this.allMovies.filter( movie => {return movie.available}),

            moviesInR = this.allMovies.filter( movie => {return !movie.available}),

            aFinished = false, rFinished = false, aIndex = this.AdisplayStart, rIndex = this.RdisplayStart;


            while (!aFinished) {

                // console.log(aIndex);
                

                let AmovieDiv = moviesInA[aIndex] != undefined ? createMovieDiv(moviesInA[aIndex]) : undefined;

                if (AmovieDiv != undefined) {

                    document.getElementById('aDiv').appendChild(AmovieDiv);

                } else {

                    console.log(aIndex);
                    
                }


                if (aIndex == moviesInA.length) {
                    aIndex = 0
                } else if (aIndex < moviesInA.length) {
                    aIndex++
                } else {

                }

                if (aIndex == this.AdisplayEnd) {
                    aFinished = true
                }
                
                
            }

            while (!rFinished) {

                // console.log(rIndex);
                

                let rmovieDiv = moviesInR[rIndex] != undefined ? createMovieDiv(moviesInR[rIndex]) : undefined;

                if (rmovieDiv != undefined) {

                    document.getElementById('rDiv').appendChild(rmovieDiv);

                } else {

                    console.log(rIndex);
                    
                }


                if (rIndex == moviesInR.length) {
                    rIndex = 0
                } else if (rIndex < moviesInR.length) {
                    rIndex++
                }

                if (rIndex == this.RdisplayEnd) {
                    rFinished = true
                }
                
                
            }

           

    },

    createMovieSelects() {

        //create two empt arrays
        //the elements will be used to set the innerText and value of each option of the select elements
        let availableMoviesArr = [],
            rentedMoviesArr = [];

        movieRental.allMovies.forEach( movieObject => {

            // console.log(movieObject);

            if (movieObject.available === true) {

                availableMoviesArr.push(movieObject.title)
                
            } else if (movieObject.available === false) {

                rentedMoviesArr.push(movieObject.title)
            } 
        });

        //create two select elements from thoes arrays
         let aSelectHeading = createHeading({text: 'Available Movies', size: 2}),
             rSelectHeading = createHeading({text: 'Movies Being Rented', size: 2}),
             avaialbleSelect = createSelectElement({defaultText: 'Select An Available Movie', array: availableMoviesArr, class: 'movieSelects'}),
             rentedSelect = createSelectElement({defaultText: 'Select A Movie To Return', array: rentedMoviesArr, class: 'movieSelects'});
        //append them to our sidebar

        //set onchange property to be linked to the object method of movieRental
        avaialbleSelect.onchange = movieRental.transferMovie;
        rentedSelect.onchange = movieRental.transferMovie;

        //add the available elements to the sidebar
        document.getElementById('sideBar').appendChild(aSelectHeading);
        document.getElementById('sideBar').appendChild(avaialbleSelect);

        //then the rented
        document.getElementById('sideBar').appendChild(rSelectHeading);
        document.getElementById('sideBar').appendChild(rentedSelect);

    },

    //create a method to switch the state of a movie
    //this method can only be called from a select element
    transferMovie() {

        let eventObject = this, //the parent element that called the method

            choosenMovie = eventObject.value != undefined ? eventObject.value : eventObject.alt.replace(/ Image/, '');

        console.log(choosenMovie);

        //itterate through my array of objects,

        movieRental.allMovies.forEach( movieObject => {

                // console.log(movieObject.title, choosenMovie);

                // if (movieObject.title === choosenMovie && movieObject.available) {

                //         movieObject.available = false
                    
                // } else if (movieObject.title === choosenMovie && !movieObject.available) {

                //         movieObject.available = true
                // }

                // if (movieObject.title === choosenMovie) {

                //     movieObject.available = movieObject.available ? false : true;
                    
                // }

                if (movieObject.title === choosenMovie) {

                    movieObject.available = !movieObject.available;
                    
                }

                // movieObject.available = movieObject.title === choosenMovie ? !movieObject.available : movieObject.available;

                
        })
        // find the object that match the name of 'chooseMovie'
        //access the available property and switch its value from true to false or visa versa

        // console.log(movieRental.allMovies);
        
        //before moving on to the frontend, console log movieRental.allMovies

        //update the frontend
            //update (delete and refresh with new data) the movieDivs
            //update the selectElements

        document.getElementById('sideBar').innerHTML = '';
        document.getElementById('aDiv').innerHTML = '';
        document.getElementById('rDiv').innerHTML = '';

        movieRental.displayAllMovies()
        movieRental.createMovieSelects()

    }


}

//Method/Function Calls

createInitalDivs()

movieRental.displayAllMovies()
movieRental.createMovieSelects()

// movieRental.transferMovie()

//FUNCTIONS THAT CREATE HTML ELEMENTS
function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id
        
    }

    return heading
    
}

function createImg(imageObj) {

    let image = document.createElement('img');

    image.src = imageObj.src != undefined ? imageObj.src : './img.jpeg';

    image.alt = imageObj.alt != undefined ? imageObj.alt : 'Image Could Not Load';

    if (imageObj.id != undefined && document.getElementById(imageObj.id) == null ) {

        image.id = imageObj.id;
        
    }

    if ( imageObj.class != undefined ) {

        image.className = imageObj.class;
        
    }

    return image 
}

function createDivElement(divObject) {

    //class and id

    const div = document.createElement('div');

    if (divObject.id != undefined && document.getElementById(divObject.id) == null) {

        div.id = divObject.id; 
        
    }

    if (divObject.class != undefined ) {

        div.className = divObject.class;
        
    }

    // console.log(div);

    return div
    
}

function createHyperLink(linkObject) {

    //class and id

    const link = document.createElement('a');


    //set my Id in the case that I define that property in my linkObject
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null) {

        link.id = linkObject.id; 
        
    }

    //set my Id in the case that I define that property in my linkObject
    if (linkObject.class != undefined ) {

        link.className = linkObject.class;

    }

    //property name openNewTab

    if ( linkObject.openNewTab === true ) {

        link.target = '_blank';
        
    }

    link.innerText = linkObject.text != undefined ? linkObject.text : 'Untitled Link';

    link.href = linkObject.hrefLink != undefined ? linkObject.hrefLink : 'No Link';

    // console.log(link);

    return link
    
}

//create our rented div and available div
function createInitalDivs() {

    let mainContainer = createDivElement({id: 'mainContainer'});

    let movieDisplays = createDivElement({id: 'movieDisplays'});

    let sideBar = createDivElement({id: 'sideBar'});

    let available = createDivElement({id: 'aDiv', class: 'movieDivs'});

    let rented = createDivElement({id: 'rDiv', class: 'movieDivs'});

    document.body.appendChild(mainContainer);

    mainContainer.appendChild(movieDisplays);
    mainContainer.appendChild(sideBar);

    movieDisplays.appendChild(available);
    movieDisplays.appendChild(rented);
    
}

// document.createElement('select'); //parent

// document.createElement('option'); //child




function createSelectElement(selectObject) {
    // console.log(selectObject);

    let select = document.createElement('select');

    //id

    if (selectObject.id != undefined && document.getElementById(selectObject.id) == null) {
        select.id = selectObject.id;
    }
    //className

    if (selectObject.class != undefined ) {
        select.className = selectObject.class;
    }

    let defaultOpt = document.createElement('option');

    defaultOpt.innerText = selectObject.defaultText == undefined ? 'Select An Option' : selectObject.defaultText;

    defaultOpt.value = '';

    select.appendChild(defaultOpt);
    //create default option *
    //set properties of default option *
    //append it to parent

    for (let i = 0; i < selectObject.array.length; i++) {

        let option = document.createElement('option');

        option.innerText = selectObject.array[i];

        option.value = selectObject.array[i];

        select.appendChild(option);
    }

    //iterate through a given array, create child element for each one
    //innerText
    //value
    //append to parent

    //optionally add a onchange property (link rent/return methods)

    return select
    //return
    
}

function createMovieDiv(singleMovie) {

     let 
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

        let clickMeText;

        if ( singleMovie.available === true ) {

            clickMeText = createHeading({size: 5, text: 'Double Click To Rent', class: 'clickme'});

        } else {

            clickMeText = createHeading({size: 5, text: 'Double Click To Return', class: 'clickme'});
        }

        //adding ondblclick property to movie element
        // movieImage.ondblclick = movieRental.transferMovie;
        clickMeText.ondblclick = movieRental.transferMovie;

        clickMeText.value = singleMovie.title;

        movieImgDiv.appendChild(movieImage);
        movieImgDiv.appendChild(clickMeText);

        return singleMovieDiv
    
}