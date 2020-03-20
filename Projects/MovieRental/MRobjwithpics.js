
let movieRentalDB = {

    allMovies: [

        {title: 'Looper',             release: 2012, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: false, img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' }
    ],

    displayAvailable() {

        let aDiv = document.getElementById('avl'); //get local access to the div for available movies

        aDiv.innerHTML = ''; //clears the div of information to reset it before loading it with current info

        movieRentalDB.allMovies.filter( movieObj => movieObj.available === true).forEach( avlMovie => {


            let movieDiv = createDivElm(false, 'movieDiv'),
                title = createHeadingElm(avlMovie.title, 2),
                movieImg = createImgElm(avlMovie.img, avlMovie.title + ' Image'),
                releaseDate = createHeadingElm('Released In The Year ' + avlMovie.release, 5);

                // console.log(title, movieImg, releaseDate);
                
                movieImg.width = 200;

                movieImg.height = 300;

                movieDiv.appendChild(title);
                movieDiv.appendChild(movieImg)
                movieDiv.appendChild(releaseDate)

                movieDiv.style.margin ='5%';
                movieDiv.style.textAlign = 'center';

                // console.log(movieDiv);

                aDiv.appendChild(movieDiv)
            
        });

        // console.log(movieRentalDB.allMovies);
        
    },

    displayRented() {


        let rDiv = document.getElementById('rnt'); //get local access to the div for available movies

        rDiv.innerHTML = ''; //clears the div of information to reset it before loading it with current info

        movieRentalDB.allMovies.filter( movieObj => movieObj.available === false).forEach( avlMovie => {


            let movieDiv = createDivElm(false, 'movieDiv'),
                title = createHeadingElm(avlMovie.title, 2),
                movieImg = createImgElm(avlMovie.img, avlMovie.title + ' Image'),
                releaseDate = createHeadingElm('Released In The Year ' + avlMovie.release, 5);

                // console.log(title, movieImg, releaseDate);
                
                movieImg.width = 200;

                movieImg.height = 300;

                movieDiv.appendChild(title);
                movieDiv.appendChild(movieImg)
                movieDiv.appendChild(releaseDate)

                movieDiv.style.margin ='5%';
                movieDiv.style.textAlign = 'center'

                // console.log(movieDiv);

                rDiv.appendChild(movieDiv)
            
        });

    }


}



function createDivElm(id, divClass) {

    let div = document.createElement('div');

    if ( typeof id == 'string' ) div.id = id;

    if (typeof divClass == 'string') div.class = divClass;

    // console.log(div);

    return div
    
}

function createImgElm(src, alt, id) {

    let image = document.createElement('img');

    image.src = src;

    image.alt = alt == false ? 'no image' : alt;

    if (id != undefined && document.getElementById(id) == null) {

        image.id = id;
        
    }

    return image

}

function createHeadingElm(text, size) {

    let heading = size <= 5 && size >= 1 ? document.createElement('h' + size) : document.createElement('h3');

    heading.innerText = typeof(text) == 'string' ? text : 'no text entered';

    return heading
    
}

//before any methods are ran, create divs to store movies into

let availableDiv = createDivElm('avl'),
    rentedDiv = createDivElm('rnt');

document.body.appendChild(availableDiv);
document.body.appendChild(rentedDiv);
//styling that needs to be applied to divs

document.body.style.background = 'yellow';

availableDiv.style.display = 'flex';
availableDiv.style.background = 'pink';

rentedDiv.style.display = 'flex';
rentedDiv.style.background = 'lightblue';

//then call methods in desired order, it wont change the order on the dom, that is decided when the divs are appended to the body
movieRentalDB.displayAvailable()

movieRentalDB.displayRented()