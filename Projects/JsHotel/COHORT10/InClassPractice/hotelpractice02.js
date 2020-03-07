

/*

 Create a page that allows the user to move elements from 'Booked' to 'Available'

 There should be two select elements, one for 'Booked' and 'Available'

 Each select element should have an html <option> element for each element in the given array

 When a option is selected that room will be moved from one array to another

*/


let available = [101,102,103,104];
let booked = [107];

const selectDiv = document.getElementById('selectElementsDiv');


//Change css via js file

document.body.style.backgroundImage = 'linear-gradient(rgb(224, 122, 255), red, yellow)';

create_available_select()
create_booked_select()


//1. Available Rooms
function create_available_select() {

    //inital creation of select element
    let availableSelect = document.createElement('select');

    // console.log(availableSelect);
    availableSelect.onchange = available_select_onchange;
    //availableSelect not yet accessable outside of this function

    availableSelect.id = 'availableSelectID';

    //default option creation and data transfer to DOM
    let defaultOption = document.createElement('option');

    defaultOption.value = 'default';

    defaultOption.innerText = 'Select An Available Room';

    availableSelect.appendChild(defaultOption);

    //forloop

    for (let i = 0; i < available.length; i++) {
        
        const element = available[i];

        // console.log(element);

        let roomOption = document.createElement('option');

        roomOption.value = available[i];

        roomOption.innerText = `Room ${available[i]}`; //or element

        availableSelect.appendChild(roomOption)
        
    }

    
    

    //we will be using onchange event (event listener on ava)

    selectDiv.appendChild(availableSelect);


}

//function is going to transfer selected to booked rooms
function available_select_onchange() {

    let selectElm = document.getElementById('availableSelectID');

    //bookedelm 

    // console.log('changed');

    // booked.push(available.splice(0, 1));

    if (selectElm.value == 'default') {

        console.log('That is not a room!');
        return //exit the function if the default was selected 

    } else {

        console.log(`Room ${selectElm.value} has been selected`);
        
    }
    
    for (let i = 0; i < available.length; i++) {
        
        // console.log(available[i], selectElm.value);
        
        if (available[i] == selectElm.value) {            

            booked.push(available.splice(i, 1));
            
        }
        
    }

    //method 1 (not best practice) delete old, create new

    selectDiv.removeChild(selectElm);

    create_available_select()

    //method 2 (best practice) update old



    console.log(`Available: ${available}\nBooked: ${booked}`);
    
}


//2.Booked Rooms
function create_booked_select() {

     //inital creation of select element
     let bookedSelect = document.createElement('select');

     // console.log(availableSelect);
     bookedSelect.onchange = booked_select_onchange;
     //availableSelect not yet accessable outside of this function
 
     bookedSelect.id = 'bookedSelectID';
 
     //default option creation and data transfer to DOM
     let defaultOption = document.createElement('option');
 
     defaultOption.value = 'default';
 
     defaultOption.innerText = 'Booked Rooms';
 
     bookedSelect.appendChild(defaultOption);
 
     //forloop
 
     for (let i = 0; i < booked.length; i++) {
         
         const element = booked[i];
 
        //  console.log(element);
 
         let roomOption = document.createElement('option');
 
         roomOption.value = booked[i];
 
         roomOption.innerText = `Room ${booked[i]}`; //or element
 
         bookedSelect.appendChild(roomOption)
         
     }
 
     
     
 
     //we will be using onchange event (event listener on ava)
 
     selectDiv.appendChild(bookedSelect);
 
 
 }
 
 //function is going to transfer selected to booked rooms
 function available_select_onchange() {
 
     let selectElm = document.getElementById('availableSelectID');
     let selectElmB = document.getElementById('bookedSelectID');
     //bookedelm 
 
     // console.log('changed');
 
     // booked.push(available.splice(0, 1));
 
     if (selectElm.value == 'default') {
 
         console.log('That is not a room!');
         return //exit the function if the default was selected 
 
     } else {
 
        //  console.log(`Room ${selectElm.value} has been selected`);
         
     }
     
     for (let i = 0; i < available.length; i++) {
         
         // console.log(available[i], selectElm.value);
         
         if (available[i] == selectElm.value) {            
 
             booked.push(available.splice(i, 1));
             
         }
         
     }
 
     //method 1 (not best practice) delete old, create new
 
        //  selectDiv.removeChild(selectElm);
    
        //  create_available_select()

        //  selectDiv.removeChild(selectElmB);
    
        //  create_booked_select()
 
     //method 2 (best practice) update old

     //access each element and remove/append only the option that was selected

     console.log(selectElm);
     

     let counter = 0;
     while(counter < selectElm.length) {
         
         console.log(selectElm[counter].value);

         counter++
         
     }
 
 
 
     console.log(`Available: ${available}\nBooked: ${booked}`);
    
}

function booked_select_onchange() {

    let selectElmA = document.getElementById('availableSelectID');
    let selectElm = document.getElementById('bookedSelectID');
 
    //bookedelm 

    // console.log('changed');

    // booked.push(available.splice(0, 1));

    if (selectElm.value == 'default') {

        console.log('That is not a room!');
        return //exit the function if the default was selected 

    } else {

        console.log(`Room ${selectElm.value} has been selected`);
        
    }
    
    for (let i = 0; i < booked.length; i++) {
        
        // console.log(available[i], selectElm.value);
        
        if (booked[i] == selectElm.value) {            

            available.push(booked.splice(i, 1));
            
        }
        
    }

    //method 1 (not best practice) delete old, create new
    selectDiv.removeChild(selectElmA);

    create_available_select()

    selectDiv.removeChild(selectElm);

    create_booked_select()

    //method 2 (best practice) update old



    console.log(`Available: ${available}\nBooked: ${booked}`);
   
    
}