//Create movie rental object

let movieRental = {

    //THESE ARRAYS SERVE THE PURPOSE OF OUR DATABASE

    availableMovies: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rentedMovies: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    //METHODS TO DISPLAY WHAT IS IN OUR DATABASE CURRENTLY
    displayAvailable() {

        console.log('_______________________\nAvailable Movies:\n');
        

        for (let i = 0; i < this.availableMovies.length; i++) {
            
            console.log(this.availableMovies[i]);
            
            
        }

    },

    displayRented() {

        console.log('_______________________\nMovies Currently Rented:\n');

        for (let i = 0; i < this.rentedMovies.length; i++) {
            
            console.log(this.rentedMovies[i]);
            
            
        }

    },

    //METHODS TO MODIFY DATA IN DATABASE

    rentARandomMovie() {

        let ranIndex = Math.floor(Math.random() * this.availableMovies.length);

        //splice will return an array of elements (strings)
        let randomMovie = this.availableMovies.splice(ranIndex, 1);

        // console.log(randomMovie);

        //the program must access the first index of the randomMovie array
        this.rentedMovies.push(...randomMovie); 

        console.log(`${randomMovie[0]} is now being rented.\n`);
        

    },

    returnARandomMovie() {

        let ranIndex = Math.floor(Math.random() * this.rentedMovies.length);
        //alternitivly the program can first push the element to the array first
        this.availableMovies.push(this.rentedMovies[ranIndex]);

        console.log(`${this.rentedMovies[ranIndex]} was just now returned.\n`);


        //the array that splice returns will not be stored anywhere so "splice's" only purpose is to remove the element
        this.rentedMovies.splice(ranIndex, 1);

    },

    //NEXT STEPS 

    //1. RENT A SPECIFIC MOVIE BY TITLE

    rentAMovieByTitle(...movieTitle) {

        //does the string ex in the array as an elem

        for (let i = 0; i < this.availableMovies.length; i++) {
            
            if (movieTitle === this.availableMovies[i]) {

                console.log('That movie is available', i);

                let removedMovie = this.availableMovies.splice(i, 1);

                // this.rentedMovies.push(removedMovie[0]);
                this.rentedMovies.push(...removedMovie); //elm1, elm2, 
                
                return
            } 

        }

        console.log('too bad so sad');


    },

    //2. RETURN A SPECIFIC MOVIE BY TITLE

    returnAMovieByTitle(movieTitle) {

    }

}

//TEST METHOD CALLS

movieRental.rentAMovieByTitle()

// movieRental.returnARandomMovie()

// movieRental.rentARandomMovie()


// movieRental.displayAvailable();
movieRental.displayRented();