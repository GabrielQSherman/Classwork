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
 
    displayAllMovies() {

        this.allMovies.forEach( singleMovie => {

            console.log(singleMovie.img);

            //create html element variable that will be appended to the DOM 
             let 
             singleMovieDiv = createDivElement({class: 'movies'}),

                 movieTitle = createHeading({size: 2, text: singleMovie.title}),

                 movieRD = createHeading({text: `Year Released ${singleMovie.release}`, size: 4}),

                 movieImage = createImg({class: 'movieImages', src: singleMovie.img, alt: singleMovie.title + ' Image'}),

                 IMDBlink = createHyperLink({openNewTab: true, hrefLink: singleMovie.imbdLink, text: singleMovie.title + ' IMDB Page', class: 'imbdlink'});


            console.log(movieTitle);
            
            //append to the child elements to the subdiv (one subdiv for each movie)
            singleMovieDiv.appendChild(movieTitle);

            singleMovieDiv.appendChild(movieImage);

            singleMovieDiv.appendChild(movieRD);

            singleMovieDiv.appendChild(IMDBlink);

            //new variable to determine what div the subdiv(movieDiv) gets appended to 
            let appendLocation;

            //decide what div the movieDiv should be appened, depends on if its available or not
            if ( singleMovie.available === true ) {

                appendLocation = 'aDiv';

            } else {

                appendLocation = 'rDiv';
            }

            //append movie div to one of the main div containers
            document.getElementById(appendLocation).appendChild(singleMovieDiv);
            
        });

    },

    createMovieSelects() {

        //create two arrays

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

        // console.log(availableMoviesArr, rentedMoviesArr);
        

        //create two select elements from thoes arrays
        let avaialbleSelect = createSelectElement({defaultText: 'Select An Available Movie', array: availableMoviesArr, class: 'movieSelects'});
        let rentedSelect = createSelectElement({defaultText: 'Select A Movie To Return', array: rentedMoviesArr, class: 'movieSelects'});
        //append them to our sidebar

        document.body.appendChild(avaialbleSelect);
        document.body.appendChild(rentedSelect);

    }

}

//Method/Function Calls
movieRental.createMovieSelects()
// let testSelect = createSelectElement(
//     {
//         defaultText: 'Test',
//         array: [1,2,3,4,5,6]
//     }
// )

// document.body.appendChild(testSelect);

createInitalDivs()

movieRental.displayAllMovies()


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

    let available = createDivElement({id: 'aDiv', class: 'movieDivs'});

    let rented = createDivElement({id: 'rDiv', class: 'movieDivs'});

    document.body.appendChild(available);

    document.body.appendChild(rented);

}

// document.createElement('select'); //parent

// document.createElement('option'); //child




function createSelectElement(selectObject) {
    console.log(selectObject);

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