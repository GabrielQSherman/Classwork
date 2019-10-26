//1.Variable Deleration
//import realine module from nodeJs
var readLine = require('readline');

//creates our get input and use output objects
var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//variables for "Javascript Car Rentals&Returns"
//2D array to store cars availble
var availableCars = [["Honda Civic", 27], ["Nissan Maxima", 35], ["Volkswagen Jetta", 42], ["Hyundai Elantra", 47], ["Chevy Camaro", 55], ["Ford Mustang", 62], ["Ford Fusion", 77], ["Mercedes Benz CLA", 91],  ["BMW 5 Series", 98], ["Mercedes S Class", 110]];

//2D array to store cars currently rented
var rentedCars = [];

//variable for all temporary rental data (includes name, days of rental, and the car subarray)
var rentalData = [];

//2. First function; Main Navigation of CLI
console.log("Welcome to JavaScript Cars, Rentals and Returns!\n----------------------------------------\n");
function rent_OR_return() {

    rl.question("Would you like to rent a new car or return a rental car? (rental/return)\n(you may also quit the program by entering 'exit', or enter 'display' to show currently rented out cars)\n", (rentOReturn) => {
        rentOReturn = rentOReturn.toLowerCase();

        if (rentOReturn == "rental" || rentOReturn == "rent") { //sends user through the Rental CLI component
            car_rental();

        } else if (rentOReturn == "return") { //sends user through the Return CLI component
            car_return();

        } else if (rentOReturn == "exit") { //exits the CLI
            rl.close();

        } else if (rentOReturn == "display") { //logs all current cars being rented

            for (let i = 0; i < rentalData.length; i++) {
                console.log(`--------------\nName - ${rentalData[i][0]}, Car: ${rentalData[i][1][0]}, Rental Period; ${rentalData[i][2]} day/days.`);   
                            
            }
            console.log("-----------------------\n");
            rent_OR_return(); //returns to main naviagtion options

        } else { //incase an invalid entry is entered, info is given

            console.log("That is an invalid entry please only enter 'rental' or 'return', Thank you.\n");
            rent_OR_return(); //returns to main naviagtion options
        }
    })
} //Function End


//3. Rental Function
function car_rental() {
        console.log("You selected Car Rentals!\n");
            if (availableCars.length < 1) {
                console.log("Sorry, but there are no availble cars at this time, someone will need to return one in order for you to have an option");
                rent_OR_return();
            }
        rl.question("Please enter your name\n", //Question 1
            (rentName) => {
        
            console.log(`Thank you for choosing us ${rentName}, please make your selection now\n------------------------\nAvailable Cars\n`);
                for (var i = 0; i < availableCars.length; i++) {
                    console.log("  ", i+1 +".", availableCars[i][0] + ": $"+ availableCars[i][1]+"/day\n");
                }
                rl.question("Select A Car Number\n", //Question 2
                (carNum) =>{
                    //input is converted into number so its value can be compared to the availble cars, also to see if it is a positive integer
                    carNum = parseInt(carNum);
                     if (carNum <= availableCars.length && carNum > 0) {
            
                        for (let i = 0; i < availableCars.length; i++) {

                            if (i == carNum - 1) {

                                rl.question(`Great! You chose the ${availableCars[i][0]}. How many days would you like to rent this vehicle from us?\n`, (days) => { //Question 3
                                    days = parseInt(days);
                                    if (days > 0) {

                                    rl.question(`Would you like to confirm this rental (Y/N) --- it will cost $${(days * availableCars[i][1])}\nTax: $${(Math.round((days * availableCars[i][1]) * 7))/100}\n-------------\n`, (confirm) => { //Quesiton 4
                                        confirm = confirm.toLowerCase();

                                        if (confirm == true || confirm == "y" || confirm == "yes") {
                                            console.log(`Thank you ${rentName}, at the end of your ${days} days rental period you will owe JavaScript Rentals $${(Math.round((days * availableCars[i][1]) * 107))/100}.\n---------------------------------------------------\n\n`);  
                                            rentalData.push([rentName, availableCars[i], days]); 
                                            rentedCars = rentedCars.concat(availableCars.splice(i,1));    
                                            
                                            } else {
                                            console.log("Okay, goodbye");
                                            rent_OR_return();
                                        }
                                        rl.question("Would you like to set up a new rental or return?(rental/return)\n", (answer) => { //Question 5
                                            answer = answer.toLowerCase();

                                            if (answer == "rental" || answer == "rent") {
                                                console.log("Okay we will assist you in filing a new car rental momentarily!\n\n\n--------------------------------------------------------------");
                                                car_rental();
                                            } else if (answer == "return") {
                                                console.log("We are sending the return manager right your way, they should be here in a matter of milliseconds!");
                                                car_return();
                                            } else {        
                                                console.log("That was not a vaild response, so we are sending you back to the front desk");
                                                rent_OR_return();
                                            }

                                        });//Question 5

                                    }); //Question 4
                                } else { // end of days if-comparison
                                    console.log("This is not a valid number of days, please use an interger next time\n\n--------------------------------------");
                                    car_rental();
                                }
                                });//Question 3

                    }}/* <= end of for-loop*/} // <= end of if car num is valid

                    else{ // code runs if a string or number that is higher or lower than the availble car numbers is entered at question #2
                        console.log("---Sorry this is not a vaild car number please attempt our service again---\nWe are starting your application process over for you, please try again\n\n\n");
                        car_rental()
                      }

                    }); //Question 2

        });//Question 1
} //FunctionEnd

//4. Return Function
function car_return() {
    console.log("You selected Car Returns!\n"); //welcome messege

    if (rentedCars.length != 0) { //checks to see if there are any cars being rented

        rl.question("\nWould you please tell us your name so that we can match your rental-info file.\n", (returnName) => {

            for (let i = 0; i < rentalData.length; i++) {

              if (returnName == rentalData[i][0]) { //returns cars back to availble, usually not in order

                  console.log(`Thank you ${returnName} for returning our ${rentalData[i][1][0]} on time. After RI tax (7%), your total comes out to $${(Math.round((rentalData[i][2] * availableCars[i][1]) * 107))/100}. Please pay immediately.\n\n`);
                  availableCars = availableCars.concat(rentedCars.splice(i,1));
                  rentalData.splice(i,1);
                  rent_OR_return();

              } else { // when a "name" is entered that is not in 'rentalData'

                console.log("That is not a name in our files, please try again\n\n");
                  car_return();

              }  
            } //end of ForLoop
        }) //Question 1

    } else { //in case you enter returns when there are no current rentals taken out
        console.log("There are no cars being rented so we are sending you back to the front desk...\n\n------");
        rent_OR_return();
    }

} //Function End

//5.
//Function call
rent_OR_return();