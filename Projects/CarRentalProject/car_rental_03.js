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


//currently this will not transfer cars from availble to rented and will only promt one user at a time
console.log("Welcome to JavaScript Car Rentals!\n\nAvailable Cars");

for (var i = 0; i < availableCars.length; i++) {
    console.log("  ", i+1+".", availableCars[i],"\n");
}

rl.question("Please enter your name\n",
    (name) => {
   
       console.log(`Thank you for choosing us ${name}, please make your selection now\n`);

         rl.question("Select A Car Number and Length of days:  ------------------  EXAMPLE ENTRY: \'1,7\' = Honda Civic for 1 week\n",
         (carAndDays) =>{
     
         var rentalData = [];
         rentalData = rentalData.concat(carAndDays.split(","));
     
         console.log(rentalData);
                            rl.question("Would like like to confirm this rental (Yes/No)", (confirm) => {
                                if (confirm == true) {
                                    console.log("Thank you");
                                    
                                } else {
                                    console.log("Okay, goodbye");
                                    
                                    rl.close();
                                }
                            }) //Question 3
         }); //Question 2

});//Question 1



    

