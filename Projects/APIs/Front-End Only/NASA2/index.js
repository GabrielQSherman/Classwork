
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




//initalize
const mainContainer = document.createElement("div");
const button = document.createElement("button");

mainContainer.style.textAlign = "center";
//props
button.innerText = "Click";
button.style.width = "100px";

button.onclick = buttonClickFunc;

//append
document.body.appendChild(mainContainer);
mainContainer.appendChild(button);


function buttonClickFunc (event) {
  event.target.style.color = "pink";
  event.target.style.backgroundColor = "blue";

  const xhr = new XMLHttpRequest();
  
  xhr.open("GET", "https://api.nasa.gov/planetary/apod?api_key=2Y4dgeGYMnhG3XrzoYfrUSeOBkcEfhCBK936CLfJ" );

  xhr.onload = () => {

      const rawResponse = xhr.responseText;

      console.log(rawResponse);

  }

  xhr.send();

}

