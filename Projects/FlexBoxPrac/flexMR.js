let imageLink = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

let movieRental = {

    allMovies: [

        { title: `The Avengers`, release: 2012, img: imageLink, available: true },
        { title: `Guardians of the Galaxy`, release: 2014, img: imageLink, available: true },
        { title: `Spider-Man: Homecoming`, release: 2017, img: imageLink, available: true },
        { title: `Iron Man`, release: 2008, img: imageLink, available: true },
        { title: `Black Panther`, release: 2017, img: imageLink, available: true },
        { title: `Doctor Strange`, release: 2016, img: imageLink, available: true },
        { title: `Thor: Ragnarok`, release: 2017, img: imageLink, available: false },
        { title: `Captian America: Civil War`, release: 2016, img: imageLink, available: false }

    ],

    mainHeading() {

        let mainHeading = movieRental.createHeading({ text: `Movie Rental JS`, size: 1, id: `mainHeading` });

        mainHeading.align = `center`;

        document.body.appendChild(mainHeading);

    },

    mainContainers() {

        let availableDiv = movieRental.createDiv({ id: `availableDiv`, className: `movieContainers` });

        // availableDiv.align = `center`;

        document.body.appendChild(availableDiv);

        let rentedDiv = movieRental.createDiv({ id: `rentedDiv`, className: `movieContainers` });

        // rentedDiv.align = `center`;

        document.body.appendChild(rentedDiv);

    },

    displayAvailable() {

        let rentRandomButton = movieRental.createButton({ id: `rentRandomButton`, text: `Rent A Random Movie!`, method: movieRental.rentRandomMovie });
        let returnRandomButton = movieRental.createButton({ id: `returnRandomButton`, text: `Return A Random Movie!`, method: movieRental.returnRandomMovie });
        let availableHeading = movieRental.createHeading({ text: `<em>Avaiable Movies</em>`, size: 1, id: `availableMoviesHeading` });
        let allAvailable = movieRental.createDiv({ id: `allAvailable` });

        availableDiv.appendChild(rentRandomButton);
        availableDiv.appendChild(returnRandomButton);
        availableDiv.appendChild(availableHeading);

        movieRental.allMovies.filter(object => { return object.available == true }).sort((a, b) => { if (a.title > b.title) { return 1 } else { return -1 } }).forEach(movieObj => {

            let movieDiv = movieRental.createDiv({ id: `${movieObj.title.substr(0,3)}Div`, className: `movieDiv` });
            let movieTitle = movieRental.createHeading({ text: movieObj.title, size: 2, id: `${movieObj.title.substr(0,3)}Title` });
            let releaseDate = movieRental.createHeading({ text: movieObj.release.toString(), size: 4, id: `${movieObj.title.substr(0,3)}Release` });
            let movieImages = movieRental.createImage({ src: movieObj.img, alt: `${movieObj.title}.img`, id: `${movieObj.title.substr(0,3)}Img`, className: `marvel` });

            allAvailable.appendChild(movieDiv);
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(releaseDate);
            movieDiv.appendChild(movieImages);

            // if (movieObj.title == 'Black Panther') {

            //     movieDiv.style.flex = '3'
                
            // }

        })

        availableDiv.appendChild(allAvailable);

    },

    displayRented() {

        let rentedHeading = movieRental.createHeading({ text: `<em>Unavailable Movies</em>`, size: 1, id: `rentedMovies` });

        rentedDiv.appendChild(rentedHeading);

        // .filter() creates a new array of data that it filters
        // `object` in the filter takes on each index from within the array being filtered
        // to actually assign it to the filter() array you MUST `return`
        //* let rentedArray = movieRental.allMovies.filter(object => { return object.available == true });
        //^ can actually skip this step and place directly before the forEach()

        movieRental.allMovies.filter(object => { return object.available == false }).sort((a, b) => { if (a.title > b.title) { return 1 } else { return -1 } }).forEach(movieObj => {

            let movieDiv = movieRental.createDiv({ id: `${movieObj.title.substr(0,3)}Div`, className: `movieDiv` });
            let movieTitle = movieRental.createHeading({ text: movieObj.title, size: 2, id: `${movieObj.title.substr(0,3)}Title` });
            let releaseDate = movieRental.createHeading({ text: movieObj.release.toString(), size: 4, id: `${movieObj.title.substr(0,3)}Release` });
            let movieImages = movieRental.createImage({ src: movieObj.img, alt: `${movieObj.title}.img`, id: `${movieObj.title.substr(0,3)}Img`, className: `marvel` });

            rentedDiv.appendChild(movieDiv);
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(releaseDate);
            movieDiv.appendChild(movieImages);

        });

    },

    rentRandomMovie() {

        let availableArray = movieRental.allMovies.filter(object => { return object.available == true });
        let ranNum = Math.floor(Math.random() * availableArray.length);

        if (availableArray[ranNum] != undefined) {

            movieRental.allMovies.filter(object => { return object.available == true })[ranNum].available = false

            document.getElementById(`availableDiv`).innerHTML = ``;
            document.getElementById(`rentedDiv`).innerHTML = ``;
            movieRental.displayAvailable();
            movieRental.displayRented();

        } else { alert(`No movies left`); }

    },

    returnRandomMovie() {

        let rentedArray = movieRental.allMovies.filter(object => { return object.available == false });
        let ranNum = Math.floor(Math.random() * rentedArray.length);

        if (rentedArray[ranNum] != undefined) {

            movieRental.allMovies.filter(object => { return object.available == false })[ranNum].available = true;

            document.getElementById(`availableDiv`).innerHTML = ``;
            document.getElementById(`rentedDiv`).innerHTML = ``;
            movieRental.displayAvailable();
            movieRental.displayRented();

        } else { alert(`No movies left to return`); }

    }

    // movieDescriptionShow() {



    // },

    // movieDescriptionHide() {



    // }

}

movieRental.createDiv = function(divObj) {

    let div = document.createElement(`div`);

    div.id = divObj.id != undefined ? divObj.id : `>> No ID <<`;

    div.className = divObj.className != undefined ? divObj.className : ``;

    return div

};

movieRental.createHeading = function(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement(`h` + headingObj.size) : document.createElement(`h5`);

    heading.innerHTML = typeof headingObj.text == `string` ? headingObj.text : `>> No text <<`;

    heading.id = headingObj.id != undefined && headingObj.id != null ? headingObj.id : `>> No ID <<`;

    return heading

};

movieRental.createImage = function(imageObj) {

    let image = document.createElement(`img`);

    image.src = imageObj.src != undefined ? imageObj.src : `images/default.jpg`;

    image.alt = imageObj.alt != undefined ? imageObj.alt : `image couldn't load; broke`;

    image.id = imageObj.id != undefined && document.getElementById(imageObj.id) == null ? imageObj.id : `>> No ID <<`;

    image.className = imageObj.className != undefined ? imageObj.className : ``;

    image.onmouseover = imageObj.mouseover != undefined ? imageObj.mouseover : ``;

    image.onmouseout = imageObj.mouseout != undefined ? imageObj.mouseout : ``;

    image.height = `350`;

    image.width = `275`;

    return image

};

movieRental.createButton = function(buttonObj) {

    let button = document.createElement(`button`);

    button.id = buttonObj.id != undefined && document.getElementById(buttonObj.id) == null ? buttonObj.id : `>> No ID <<`;

    button.innerHTML = typeof buttonObj.text == `string` ? buttonObj.text : `>> No Text <<`;

    button.onclick = buttonObj.method != undefined && typeof buttonObj.method == `function` ? buttonObj.method : `>> No function <<`;

    return button

};

movieRental.mainHeading();
movieRental.mainContainers();
movieRental.displayAvailable();
movieRental.displayRented();
