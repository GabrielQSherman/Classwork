let availableRoom = [101,102,103,104];

let bookedRoom = [202,203];


//EXAMPLE OF MY METHOD TO ADDING HTML ELEMENT TO THE DOM WITH JAVASCRIPT

//1. create a button on the html

let butnElm = document.createElement('button'); //1) create a HTML element

console.log(butnElm);

butnElm.innerText = 'Available Rooms' //2) Set element's(javascript object) properties

butnElm.onclick = display_available_room; //2 

document.getElementById("bodyID").appendChild(butnElm); //3) 
//Communicates to the HTML page (DOM) that a new child element (butnElm) is going to be appended to the body

//end of button creation for 'available rooms'


function display_available_room() {

    //2. Insert my heading 'Available Rooms'

    let heading = document.createElement('h2'); //create element

    heading.innerText = 'Available Rooms';    //set element properties (innerText is a key of 'heading') to your own values (in this case the value is set to 'Available Rooms' )

    document.getElementById("available_rooms").appendChild(heading) //send to dom


    //create a loop that appends paragraph elements to the 'available rooms' div
    //each paragraph element should be a unique hotel room number

    //list out available rooms
    for (let i = 0; i < availableRoom.length; i++) {

        let pElement = document.createElement('p');
    
        pElement.innerHTML = availableRoom[i]
        // console.log(pElement);
    
        document.getElementById("available_rooms").appendChild(pElement)
        
    }

    butnElm.style.display = 'none'; //makes button disapear on the DOM when list is done loading
    
}

/*CREATE 

make a new function along with a new button 
(this button will call the function that creates the select element along with option elements)

display the bookedroom array items as options of <select> tag 

There should also be a default option, ie. 'Select a Room'

You can copy and paste code below so that you can rewrite code with refrence


Each option element needs a value and innerText properties for proper completion of this assignment.

add a new button to 'submit' a booking request (this can be appended to same location as select element)
when pressed the rooms value should be console logged

BONUS

Have the arrays update when the submit button is pressed

*/