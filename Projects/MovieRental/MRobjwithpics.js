//before any code is ran, create divs to store movies into

createDivOnBody('avl')
createDivOnBody('rnt')


let movieRentalDB = {

    allMovies: [

        {title: 'Looper',             release: 2012, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: false, img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' }
    ],


}



function createDivOnBody(id) {

    let div = document.createElement('div');

    div.id = id;

    document.body.appendChild(div);
    
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