//These arrays will be changeds and info from them displayed to the dom

let availableRoom = [101,102,103,104];

let bookedRoom = [202,203];

//CREATE 

  //make a new function along with a new button 
 //display the bookedroom array items as options of <select> tag 
//There should also be a default option, ie. 'Select a Room'

//You can copy and paste code from below so that you can rewrite code with refrence
// write your own code at least one time. Then copying code is fair play.



//EXAMPLE / ANSWER
//ONLY USE AFTER YOU CAN NOT REMEMBER ANY MORE STEPS
//1. create a button on the html //done for you

let butnElm = document.createElement('button'); //1) create a HTML element

console.log(butnElm);

butnElm.innerText = 'Available Rooms' //2) Set element's(javascript object) properties

butnElm.onclick = display_available_room; //2 

document.getElementById("bodyID").appendChild(butnElm); //3) 
//Communicate to the HTML page that a new child element is going to be appended to DOM

//end of button creation for 'available rooms'


function display_available_room() {

    //2. Insert my heading 'Available Rooms' //done

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