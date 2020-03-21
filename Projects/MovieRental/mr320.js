let movieRental = {
     allMovies: [

        {title: 'Looper',             release: 2012, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: true, img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        {title: 'Source Code',        release: 2011, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Source_Code_Poster.jpg/220px-Source_Code_Poster.jpg' },
        {title: 'Déjà Vu',            release: 2006, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DejaVuBigPoster.jpg/220px-DejaVuBigPoster.jpg' }

    ],

    displayRented() {

        let arrayOfRented = movieRental.allMovies.filter( object => { return object.available == false});

        // let arrayOfAvailable = movieRental.allMovies.filter( object => { return object.available == true});

        arrayOfRented.forEach( movieObject => {

            console.log(movieObject.title);
            
            let movieTitleHeading = createHeading({text: movieObject.title, size: 1});

            document.body.appendChild(movieTitleHeading);

            let movieImage = createImg({src: movieObject.img, alt: movieObject.title+' Image Could Not Load', class: 'movieImages'});

            document.body.appendChild(movieImage)

            let movieRelease = createHeading({text: movieObject.release.toString(), size: 4});

            document.body.appendChild(movieRelease);
            
        });

    }

}

movieRental.displayRented()

// console.log(movieRental.allMovies);
//create Html elment method CREATES HEADING ELEMENTS PARAMERTERS: heading-text, heading-size

//return the heading element


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

    image.src = imageObj.src != undefined ? imageObj.src : 'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg'
    
    image.alt = imageObj.alt != undefined ? imageObj.alt : 'image could not load/broken';

    if (imageObj.id != undefined && document.getElementById(imageObj.id) == null) {

        image.id = imageObj.id;
    }

    if (imageObj.class != undefined) {

        image.class = imageObj.class;
        
    }

    return image 
}


// let heading1= createImg({id: 'stuff'})
// console.log(heading1);
