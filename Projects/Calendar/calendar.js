/*

[*] create my buttons along with on heading elm

[*] set my event listeners -> create functions

       one function for each button, 
    [] update the date variable/s, 
    [] update the heading to reflect the date var


[] set the heading text to the current date, store the current date in a variable

[] track numbers of days in a month, how many month ( year is easiest to deal with)

*/

//global variables

let currentDate = {

    year: 2020, 
    month: 4,
    day: 6

};

//function calls
createInitalElms()


//functions 

//creates elements and puts them on the body
function createInitalElms() {
    
    //create the head elm
    // & set the properties
    createHeading({text: currentDate, id: 'dateHead'})

    //create all the needed button elms

    // next-day, prev-day, next-month, prev-month, next-year, prev-year (set back to current date)

    createButton({id: 'nextDay',   class: 'navBtns', text: 'Next Day',       onClickFunc: modifyDate}),
    createButton({id: 'prevDay',   class: 'navBtns', text: 'Previous Day',   onClickFunc: modifyDate}),
    createButton({id: 'nextMonth', class: 'navBtns', text: 'Next Month',     onClickFunc: modifyDate}),
    createButton({id: 'prevMonth', class: 'navBtns', text: 'Previous Month', onClickFunc: modifyDate}),
    createButton({id: 'nextYear',  class: 'navBtns', text: 'Next Year',      onClickFunc: modifyDate}),
    createButton({id: 'prevYear',  class: 'navBtns', text: 'Previous Year',  onClickFunc: modifyDate});
    
}

//modify the date variable depending on which button was clicked

function modifyDate() {

    console.log(this);
    
    
}

//FUNCTIONS THAT CREATE HTML ELEMENTS
function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id
        
    }

     document.body.appendChild(heading);
    
}


function createButton(buttonObj) {

    let button = document.createElement('button');

    if (buttonObj.id != undefined && document.getElementById(buttonObj.id) == null) {

        button.id = buttonObj.id
        
    }

    if (buttonObj.class != undefined ) {

        button.className = buttonObj.class
        
    }

    if (buttonObj.onClickFunc != undefined) {

        button.onclick = buttonObj.onClickFunc;
        
    }

    if (buttonObj.text != undefined ) {

        button.innerText = buttonObj.text
        
    }


     document.body.appendChild(button);
    
}