
//GOAL: request the NASA-APOD API 
//and display the image and info to the user

//TODO
//create two divs 
  //append to the mainContainer

//create a title elmenent (h1) "Welcome"
//append to the top div (in MC)


//Challenge: when the button is clicked. 
//make a request to the NASA-APOD API
//console log the data you recieve

// EXAMPLE ELEMENT CREATION USING ONLY JS
// //INITALIZE ELEMENT (always comes first)
// const mainContainer = document.createElement("div");

// //SET PROPERTIES & EVENT LISTENERS
// mainContainer.innerText = "Hello World";

// //APPEND TO DOM (body or element)
// document.body.appendChild(mainContainer);

// console.log(mainContainer);


const buttonClickFunc = (event) => {
  event.target.style.color = "pink";
  event.target.style.backgroundColor = "blue";
}

//initalize
const mainContainer = document.createElement("div");
const button = document.createElement("button");


//props
button.innerText = "Click";
button.style.width = "300px";
button.onclick = buttonClickFunc;


//append
document.body.appendChild(mainContainer);
mainContainer.appendChild(button);



