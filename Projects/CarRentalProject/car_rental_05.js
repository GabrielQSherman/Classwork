//1.
//import realine module from nodeJs
var readLine = require('readline');

//creates our get input and use output objects
var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//variables for "Javascript Car Rentals&Returns"
//2D array to store cars availble
var availableCars = ["Honda Civic", "Nissan Maxima", "Volkswagen Jetta", "Chevy Camaro", "Ford Mustang", "Ford Fusion", "Hyundai Elantra", "Mercedes Benz CLA",  "BMW 5 Series", "Mercedes S Class"];

//2D array to store cars currently rented
var rentedCars = [];

//seperate arrays for pricing
var carRentalPrice = [27, 35, 42, 50, 64, 77, 91, 98, 110, 115];
var rentalData = [];

//2.
console.log("Welcome to JavaScript Cars, Rentals and Returns!\n");
function rentORreturn() {
    rl.question("Would you like to rent a new car or return a rental car? (rental/return)\n(you may also quit the program by entering 'exit', or enter 'display' to show currently rented out cars)\n", (rentOReturn) => {
        rentOReturn = rentOReturn.toLowerCase();
        if (rentOReturn == "rental") {
            car_rental();
        } else if (rentOReturn == "return") {
            car_return();
        } else if (rentOReturn == "exit") {
            rl.close();
        } else if (rentOReturn == "display") {
            for (let i = 0; i < rentalData.length; i++) {
                console.log(rentalData[i]);   
                            
            }
            rentORreturn(); 
        } else {
            console.log("That is an invalid entry please only enter \'rental\' or \'return\', Thank you.\n");
            rentORreturn();
        }
    })
}


//3.
function car_rental() {
        console.log("You selected Car Rentals!\n");
            if (availableCars.length < 1) {
                console.log("Sorry, but there are no availble cars at this time, someone will need to return one in order for you to have an option");
                rentORreturn();
            }
        rl.question("Please enter your name\n",
            (rentName) => {
        
            console.log(`Thank you for choosing us ${rentName}, please make your selection now\n------------------------\nAvailable Cars\n`);
                for (var i = 0; i < availableCars.length; i++) {
                    console.log("  ", i+1 +".", availableCars[i] + ": $"+ carRentalPrice[i]+"/day\n");
                }
                rl.question("Select A Car Number\n",
                (carNum) =>{
                    //input is converted into number so its value can be compared to the availble cars, also to see if it is a positive integer
                    carNum = parseInt(carNum);
                     if (carNum <= availableCars.length && carNum > 0) {
            
                        for (let i = 0; i < availableCars.length; i++) {

                            if (i == carNum - 1) {

                                rl.question(`Great! You chose ${availableCars[i]}. How many days would you like to rent this vehicle from us?\n`, (days) => {

                                    rl.question(`Would you like to confirm this rental (Y/N) --- it will cost $${(days * carRentalPrice[i])}\n`, (confirm) => {
                                        confirm = confirm.toLowerCase();

                                        if (confirm == true || confirm == "y") {
                                            console.log(`Thank you ${rentName} at the end of your ${days} days rental period you will owe JavaScript Rentals $${(days * carRentalPrice[i])}.\n\n\n`);  
                                            rentalData.push([rentName, availableCars[i], days]); 
                                            rentedCars = rentedCars.concat(availableCars.splice(i,1));    
                                            
                                            } else {
                                            console.log("Okay, goodbye");
                                            rentORreturn();
                                        }
                                        rl.question("Would you like to set up a new rental or return?(rental/return)\n", (answer) => {
                                            answer = answer.toLowerCase();
                                            if (answer == "rental") {
                                                console.log("Okay we are running the program once more for you!\n\n\n--------------------------------------------------------------");
                                                car_rental();
                                            } else if (answer == "return") {
                                                console.log("We are sending the return manager right your way, they should be here in a matter of milliseconds!");
                                                car_return();
                                            } else {
                                                rentORreturn();
                                            }
                                        });//Question 5

                                    }); //Question 4

                                });//Question 3

                    }}/*end of for loop*/} 
                    else{
                        console.log("---Sorry this is not a vaild car number please try our program again---\nWe are starting the program over for you, please try again\n\n\n");
                        car_rental()
                      }

                    }); //Question 2

        });//Question 1
} //FunctionEnd

//4.
function car_return() {
    rl.question("Thank you for coming to return your rental car on time!\n\nWould you please enter your name so that we can match your file.\n", (returnName) => {
        for (let i = 0; i < rentalData.length; i++) {
          if (returnName == rentalData[i][0]) {
              console.log(`Thank you ${returnName} for returning our ${rentalData[i][1]}. After RI tax (7%), your total comes out to $${(rentalData[i][2] * carRentalPrice[i]) * 1.07}. Please pay immediately.\n\n`);
              availableCars = availableCars.concat(rentedCars[i]);

              rentalData.splice(i,1);
              rentORreturn();
          }
            
        }
    })
}


//5.
//Function call
rentORreturn();

rl.on("close", () => {
    console.log(rentedCars, availableCars,rentalData);
})
  
// and Length of days:  ------------------  EXAMPLE ENTRY: \'1,7\' = Honda Civic for 1 week
// rentalData = rentalData.concat(carAndDays.split(","));[]