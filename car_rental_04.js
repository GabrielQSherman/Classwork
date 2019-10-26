//import realine module from nodeJs
var readLine = require('readline');

//creates our get input and use output objects
var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//variables for "Javascript Car Rentals"
//2D array to store cars availble
var availableCars = ["Honda Civic", "Nissan Maxima", "Chevy Camaro", "Ford Mustang", "Mercedes S Class"];
//2D array to store cars currently rented
var rentedCars = [];
//seperate array for pricing
var carRentalPrice = [30, 40, 90, 90, 110];
var rentalData = [];


//currently this will not transfer cars from availble to rented and will only promt one user at a time
function new_car_rental() {
        console.log("Welcome to JavaScript Car Rentals!\n\nAvailable Cars");

        for (var i = 0; i < availableCars.length; i++) {
            console.log("  ", i+1+".", availableCars[i],"\n");
        }

        rl.question("Please enter your name\n",
            (name) => {
        
            console.log(`Thank you for choosing us ${name}, please make your selection now`);

                rl.question("Select A Car Number\n",
                (carNum) =>{
                    //input is converted into number so its value can be compared to the availble cars, also to see if it is a positive integer
                    carNum = parseInt(carNum);
                     if (carNum <= availableCars.length && carNum > 0) {
            
                        for (let i = 0; i < availableCars.length; i++) {

                            if (i == carNum - 1) {

                                rl.question(`Great! You chose ${availableCars[i]}. How many days would you like to rent this vehicle from us?\n`, (days) => {

                                    rl.question("Would like like to confirm this rental (Y/N)", (confirm) => {
                                        confirm = confirm.toLowerCase();

                                        if (confirm == true || confirm == "y") {
                                            console.log(`Thank you ${name} at the end of your ${days} days rental period you will owe JavaScript Rentals ${(days * carRentalPrice[i])}`);                                            
                                            rl.close();

                                            } else {
                                            console.log("Okay, goodbye");
                                            rl.close();

                                        }

                                    }); //Question 4

                                });//Question 3

                    }}/*end of for loop*/} 
                    else{
                        console.log("Sorry this is not a vaild car number please try our program again");
                         rl.close();
                      }

                    }); //Question 2

        });//Question 1
} //FunctionEnd


//Function call
new_car_rental();
  
// and Length of days:  ------------------  EXAMPLE ENTRY: \'1,7\' = Honda Civic for 1 week
// rentalData = rentalData.concat(carAndDays.split(","));