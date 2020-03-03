//ROOM ARRAYS

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


    //3. add one paragraph element to the "available_rooms" div for each room

    //create a loop that appends paragraph elements to the 'available rooms' div
    //each paragraph element should be a unique hotel room number

    //list out available rooms
    for (let i = 0; i < availableRoom.length; i++) {

        let pElement = document.createElement('p');
    
        pElement.innerHTML = availableRoom[i]
        console.log(pElement); //as you can see in the browser console. this is an object, meaning it can contain methods and properties
    
        document.getElementById("available_rooms").appendChild(pElement)
        
    }

    //4. delete button so the function can only be ran once

    butnElm.style.display = 'none'; //makes button disapear on the DOM when list is done loading
    
}

//LAST NIGHTS HOME WORK ANSWER 
//Task: Move a random room from available rooms array to booked rooms array 
//note: did not complete updating the display of the rooms once the room has been booked, this is something you should try on your own

//Move hotel rooms to bookedRoomsArray
let bookRoombBtnElm = document.createElement('button'); //1) create a HTML element

// console.log(bookRoombBtnElm); //what 'Type' of javascript variable is 'bookRoomBtmElm' now? Check the console to find out for yourself

//Answer: 

bookRoombBtnElm.innerText = 'IM FEELIN LUCKY' //2) Set element's(javascript object) properties

bookRoombBtnElm.onclick = book_ran_room; //2) set the function that will be called once button is clicked

document.getElementById("bodyID").appendChild(bookRoombBtnElm); //3) 


    function book_ran_room() { 

        //before continuing...
        //we should stop errors before they occur if we think they may come up. 
        //What if a client wants to book a room but there are none available?

        //MUST COMPLETE ****
        //Write some code that stops the room from being booked and lets the client know there is no room to book

        //Your Code HERE


        //**********************************************************************************************************
        //step one, get a randome index number. must include data when the index is accesed.
        
        //get a random number that is between 0 and the length of the array.
        // When multiplied by Math.Random() the number will never be exactly the length of the array, only less. 
        //when math.floor is used it is guarenteed the 'ranRoomNum' will be an integer ( 0 >= (ranRoomNum will be) <= last index of arr)
        const ranRoomNum = Math.floor(availableRoom.length * Math.random());

        //REPEAT THIS CODE ^ 

        //IMPORTANT * IMPORTANT * IMPORTANT 
        //your var names should be something diffrent, and when your done you will comment-out/delete my code.

        //step two:
        //get the randomly selected room out of available rooms, and into booked

        //Two line method

        //the room number being stored will be temporarily stored in this variable(transferingRoom), then 'pushed' to the booked rooms array
        
        //METHOD 1
        const transferingRoom = availableRoom.splice(ranRoomNum, 1);
        //splice will return the value of the removed array item/s while also updating the array

        bookedRoom.push(transferingRoom);

        //REPEAT THIS CODE ^ 
        //After you know the code you've written works, comment out or delete my code and answer the question below

        //One line method

        //METHOD 2
        // bookedRoom.push(availableRoom.splice(ranRoomNum, 1));


        //EXPERIMENT / QUESTION

        /*
            try method 1 and method 2. 

            1. what are the diffrences? AND what are the similarites?

            *answer here

            2. do you prefer method 1 OR method 2, and why?

            *answer here

            3. does it matter that we use the Array method 'push' in this function? * consider step three *

            *answer here

        */

        //step three: 
        //sort the array so that it logs with 100s coming before 200s 

        // bookedRoom.sort((a, b) => a - b); //you MUST look up Array 'sort' method and see why this works
        
        //After doing some research on this method, give a breif explination on how you beileve the sort method works
        // * your explination here *

        console.log(`Booked: ${bookedRoom}\nAvail: ${availableRoom}`);
        
        
    }