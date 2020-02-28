var carsAvailble = ["Mercedes Benz CLA", "BMW 5 Series", "Hyundai Elantra", "Ford Fusion", "Volkswagen Jetta", "Nissan Maxima"],
    carsRented = [],
    renties = [];

console.log("Here at J.S. Car Rentals we have a NO confidentiality policy")
console.log("-------------------------------------------------------------");
console.log("\n");
console.log("-----------------");

function car_rentals(name, car) {

    for (let i = 0; i < carsAvailble.length; i++) {

       if (car === carsAvailble[i]) {

           console.log("Thank you", name + ", you are now renting the", carsAvailble[i] +".");
           console.log("\n");           
           carsRented = carsRented.concat(carsAvailble.splice(i,1));
           renties = renties.concat(name);
            return
       }
    }   


    for (let i = 0; i < carsRented.length; i++) {
        
       if (car === carsRented[i]) {
           console.log("Sorry", name + ", but the", carsRented[i], "is not availble.");
           console.log("\n");       }    
    }   
    
}

function car_returns(name, car) {
    for (let i = 0; i < carsRented.length; i++) {
       if (car === carsRented[i] && name === renties[i]) {
        console.log("Thank you", name + ", for returning the", carsRented[i]);
        console.log("\n");           
       } else if (car === carsRented[i] && name != renties[i]){
           console.log("Hello", name +  ", are you sure you rented the", carsRented[i] + "? We're pretty sure it was", renties[i], "who rented from us.");
           console.log("\n");
           
           
       } else if (car != carsRented[i] && name === renties[i] ){
           console.log("Hello", name + "! We see you've come to return a", car + ", but this is not the right one. You rented the", carsRented[i]);
           console.log("\n");
           
       } 
        
    }
    
}
//Rentals
car_rentals("Gabe", "Mercedes Benz CLA") 
car_rentals("Jaliyah", "BMW 5 Series") 
car_rentals("Juistin", "Hyundai Elantra") 
car_rentals("Placido", "Ford Fusion") 
car_rentals("Steve", "Volkswagen Jetta") 
car_rentals("John",  "Nissan Maxima") 
car_rentals("Darius", "Mercedes Benz CLA") 

//Returns
car_returns("Gabe", "Nissan Maxima")
car_returns("Steve", "Volkswagen Jetta") 

//console.log("Cars rented", carsAvailble, carsRented, renties);
