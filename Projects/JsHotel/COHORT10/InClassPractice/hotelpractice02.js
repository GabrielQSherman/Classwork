

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

    let availableSelect = document.createElement('select');

    let defaultOption = document.createElement('option');

    defaultOption.innerText = 'Select An Available Room';

    availableSelect.appendChild(defaultOption);

    //forloop

    for (let i = 0; i < available.length; i++) {
        
        const element = available[i];

        console.log(element);

        let roomOption = document.createElement('option');

        roomOption.innerText = available[i]; //or element

        availableSelect.appendChild(roomOption)
        
    }

    

    //we will be using onchange event (event listener on ava)

    selectDiv.appendChild(availableSelect);
}


//2.Booked Rooms
function create_booked_select() {
    
}