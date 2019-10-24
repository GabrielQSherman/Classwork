var standard_input = process.stdin,
    cars = ["Mercedes Benz CLA", "BMW 5 Series", "Hyundai Elantra", "Ford Fusion", "Volkswagen Jetta", "Nissan Maxima"],
    buyers = [],
    rates = [];

standard_input.setEncoding('utf-8');


console.log ("Welcome to the Sherman Car-Rental Co.  The available cars for rental are...");
console.group("Cars");
for (let i = 0; i < cars.length; i++) {
    console.log(cars[i]);    
}
console.groupEnd("Cars");
console.log("-------------------------------------------------");

console.log("Please input Car you would like to purchase");

standard_input.on('data', (data) => {
    for (let i = 0; i < cars.length; i++) {
        
    if (data == cars[i] + '\r\n') {

        console.log("----------------------");
        
        console.log("You selected the", cars[i] + "! Now you will need to enter your name");
        console.log("----------------------");
    } else if (i == cars.length - 1) {
        console.log('Sorry, that entry is not avaible, please try again');
       
    }
}
});