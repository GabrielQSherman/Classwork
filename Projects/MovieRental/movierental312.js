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

    //1. RENT A SPECIFIC MOVIE BY TITLE (can only take one parameter)

    rentAMovieByTitle(movieTitle) {

        //does the string ex in the array as an elem

        for (let i = 0; i < this.availableMovies.length; i++) {
            
            //.toLowerCase() method is only used in our conditional, not modifying the movieTitle or element in database
            
            if (movieTitle.toLowerCase() === this.availableMovies[i].toLowerCase()) {

                // console.log('That movie is available', i);

                let removedMovie = this.availableMovies.splice(i, 1);

                // this.rentedMovies.push(removedMovie[0]);
                this.rentedMovies.push(removedMovie[0]); //elm1, elm2, 

                console.log(`You have choose to rent ${this.rentedMovies[this.rentedMovies.length - 1]}`);
                
                return
            } 

        }

        console.log(`${movieTitle} is not available`);


    },

    //2. RETURN A SPECIFIC MOVIE BY TITLE

    returnAMovieByTitle(...movieTitles) {

        // console.log(movieTitles); //Expected output is an array of strings, EVEN IF only one parameter is passed to method
        
        //METHOD ONE (harder to read) logically more difficult to wrap ones mind around

        for (let i = 0; i < movieTitles.length; i++) {
            
            // console.log(`Attempting to rent ${movieTitles[i]}...`);

            let movieReturned = false;

            for (let j = 0; j < this.rentedMovies.length; j++) {
                
                if ( movieTitles[i].toLowerCase() === this.rentedMovies[j].toLowerCase() ) {

                    this.availableMovies.push(...this.rentedMovies.splice(i, 1));

                    console.log(`You have returned ${this.availableMovies[this.availableMovies.length-1]}`);

                    movieReturned = true;
                    
                }
                
            }

            if (!movieReturned) { // !varName is a coding shorthand for varName == false, similarly just entering the varName in the conditional is a shorthand for varName == true
                
                console.log(`${movieTitles[i]} was not found in our rented movies`);
                
            }
            
        }

        //METHOD TWO utilize methods that clean up code but get the same result

        movieTitles.forEach( movieName => { //movie name will be equal to each element of the movieTitles array

            console.log(movieName);

            let movieNameLC = movieName.toLowerCase();

            let elementIndex = this.rentedMovies.indexOf(movieNameLC);

            console.log(elementIndex); 
            
            //if the element passed to indexOf is not found then it will return -1 
            //otherwise it will return the index number of the first occurance in the given array

            if (elementIndex != -1) { //does the element exist in our array
                
                this.availableMovies.push(...this.rentedMovies.splice(elementIndex, 1));

                console.log(`You have returned ${movieName}`);

            } else {

                console.log(`${movieName} was not found in our rented movies`);

            }
            
            
        });

    }

}

//TEST METHOD CALLS

// movieRental.rentAMovieByTitle('tHe Dark KnIgHt')

movieRental.returnAMovieByTitle('The Matrix', 'Avengers: Endgame', 'Kill Bill II', 'asdofhds', 'asdf');

// movieRental.returnARandomMovie()

// movieRental.rentARandomMovie()


// movieRental.displayAvailable();
movieRental.displayRented();