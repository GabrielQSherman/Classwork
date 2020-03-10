//Create movie rental object

let movieRental = {

    //add in 10 new movies AT LEAST

    availableMovies: ['Batman', 'movie1', 'movie2'],

    rentedMovies: ['Spiderman'],

    //display available

    displayAvailable() {

        for (let i = 0; i < this.availableMovies.length; i++) {
            
            console.log(this.availableMovies[i]);
            
            
        }

    },

    //do same for rented movies ^



    //removed a movie from available and place in in rented

    rentAMovie() {

        let ranIndex = Math.floor(Math.random() * this.availableMovies.length);

        //move the random movie to rented array

    }

    //do same for rented movies ^

}

// movieRental.displayAvailable();