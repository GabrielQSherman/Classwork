

/*

 Create a page that allows the user to move elements from 'Booked' to 'Available'

 There should be two select elements, one for 'Booked' and 'Available'

 Each select element should have an html <option> element for each element in the given array

 When a option is selected that room will be moved from one array to another

*/


let available = [101,102,103,104];
let booked = [107];

const selectDiv = document.getElementById('selectElementsDiv');




create_available_select()

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

        console.log(element);

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
    
}

function booked_select_onchange() {
    
}