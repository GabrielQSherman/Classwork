// working with functions
//a code block within a computer program that can take in parameters and create useful and reuseable executables, some take paramerters which makes their use dynamic, others are just meant to be used more than one time throughout a program

//DRY == DONT REPEAT YOURSELF (OR YOUR OWN CODE) ie use loops and funcitons when it is reasonable
//WET == WRITE EVERY TIME

console.log("A random number from 0-1 is the irational number PI, then it is being multiplied by one hundred");

console.log((Math.PI * Math.random() * 100));

console.log("----------------");
console.log("Rounded Circles Area\n");


function circle_area(num1, num2) {
    console.log("Number of Circles", num1);
    
    console.log(Math.round(Math.PI * (num2 * num2) * num1));
}
//num1 = how many circles num2 = radius of the circles
circle_area(4, 6);


//WARNING BAD CODE BELOW
console.log("\nthis was written the wrong way to log the area a circle with the radius of 3");

console.log(Math.round(Math.PI * (3 * 3) * 1));