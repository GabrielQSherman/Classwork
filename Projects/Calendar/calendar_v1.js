/*

[*] create my buttons along with on heading elm

[*] set my event listeners -> modifyDate(function)

     create function/s (one function for each button OR a function that can distiguish what button called the function)

    [*] update the date variable/s 

        when it is determined what button was pressed..
        change the properties of the date object to reflect the request given by the client

    [*] update the heading to reflect the date var

        after the date object is changed, the front-end should show the changes, 
        one may create a new function that is used to refresh the frontend 


[*] set the heading text to the current date, store the current date in a variable

    [*] create a function that will convert the object properties into a string formate,
       optional parameters would be the date formatting and the spacers between unit

[*] track numbers of days in a month, and months in a year. Stored in array as a property of dateInfo

[] when changing a time unit, other units should change accordingly
    *when the going forward a day on the last day of the month OR when going back a day on the first day of the month, the month and day should shift in accordance.
    *what if the date is March 31st and the user goes back one month? make sure there is never an impossible date showing to the client ie. Febuary 31st
    *when an impossible date occurs, the day should be set to the nearest 'real' date
        *** for example, if the current day is set to 3/31 and the user goes back one month, there are two possible ways to solve this correctly, one the date should go to 2/28 or 2/29 depending on the leap year, or consider if it were 2/31, what day would that be in march? well on a leap-year it would be march 2nd but on a non leap year it would be 3rd. If you want the challenge try to make it work the second way ***

days in each month
    31,28,31,30,31,30,31,31,30,31,30,31

    array vs. set
    31day = {1,3,5,7,...}
    30day = [1,3,5,7]
*/

//global variables

let dateInfo = {


    year: 2020, 
    month: 1, //using index numbering for months, gets converted when displaying to the dom.
    day: 31,

    daysInMonths: [31,28,31,30,31,30,31,31,30,31,30,31]

};

//function calls
createInitalElms()

//functions 

//creates elements and puts them on the body
function createInitalElms() {
    
    //create the head elm
    // & set the properties
    createHeading({text: createTextFromDateObj('/'), id: 'dateHead'})

    //create all the needed button elms

    // next-day, prev-day, next-month, prev-month, next-year, prev-year (set back to current date)

    createButton({id: 'nextDay',   class: 'navBtns', text: 'Next Day',       onClickFunc: modifyDate}),
    createButton({id: 'prevDay',   class: 'navBtns', text: 'Previous Day',   onClickFunc: modifyDate}),
    createButton({id: 'nextMonth', class: 'navBtns', text: 'Next Month',     onClickFunc: modifyDate}),
    createButton({id: 'prevMonth', class: 'navBtns', text: 'Previous Month', onClickFunc: modifyDate}),
    createButton({id: 'nextYear',  class: 'navBtns', text: 'Next Year',      onClickFunc: modifyDate}),
    createButton({id: 'prevYear',  class: 'navBtns', text: 'Previous Year',  onClickFunc: modifyDate});
    
}

//returns a string from the global 'dateInfo' js object
function createTextFromDateObj(separator) {

    let sep = separator != undefined ? separator : '/',
        dateObj = dateInfo,
        day = dateInfo.day > 9 ? dateInfo.day : '0' + dateInfo.day,
        month = dateInfo.month > 9 ? dateInfo.month : '0' + dateInfo.month;
        string = month + sep + day + sep + dateInfo.year;
        return string
}


//modify the date variable depending on which button was clicked

function modifyDate() {

    //find out what button was clicked

    console.log(this); //Expect: html element from which the function was called

    let id = this.id,
        curDay = dateInfo.day,
        curMonth = dateInfo.month,
        curYear = dateInfo.year;


    checkLeapYear(curYear)

    //preform a change on dateInfo based on the button pressed
    switch (id) {
        case 'nextDay':

        //what month are we in, what is the last day of the month
    //are we on the last day of the month, if so go to the next month
    //is it december? in which case go to the next year
    //if we are not on the last day of the month, simply increase the 'day' number by one

   
    if (curDay < dateInfo.daysInMonths[curMonth-1]) {

        dateInfo.day++

    } else if (curDay == dateInfo.daysInMonths[curMonth-1] && curMonth != 12) { //at end of the month, but not end of the year
        dateInfo.day = 1;
        dateInfo.month++

    } else if (curDay == dateInfo.daysInMonths[curMonth-1] && curMonth == 12) { //at end of the month of december

        dateInfo.day = 1;
        dateInfo.month = 1;
        dateInfo.year++

    }


            // nextDay(curDay, curMonth)
            
            break;
        case 'prevDay':

        if (curDay > 1) {

        dateInfo.day--
        
    } else if (curDay == 1 && curMonth != 1) {

        dateInfo.day = dateInfo.daysInMonths[curMonth-2];
        dateInfo.month--
        
    } else if (curDay == 1 && curMonth == 1) {

        dateInfo.day = 31;
        dateInfo.month = 12;
        dateInfo.year--

    }

            break;
        case 'nextMonth':

        if (curMonth < 12) {

        dateInfo.month++
   
    } else if (curMonth == 12) {

        dateInfo.month = 1;
        dateInfo.year++

    } else {

        console.log('something has gone wrong', dateInfo);
        
    }

            break;
        case 'prevMonth':  
            
            if (curMonth > 1) {

            dateInfo.month--
    
            } else if (curMonth == 1) {

                dateInfo.month = 12;
                dateInfo.year--

                } else {

                         console.log('something has gone wrong', dateInfo);
        
                }

            break;
        case 'nextYear':


            dateInfo.year = dateInfo.year < 2222 ?  dateInfo.year + 1 : 1111;
            
            break;
        case 'prevYear':

            dateInfo.year = dateInfo.year > 1995 ? dateInfo.year - 1 : 1777;
            
            break;
    }

    console.log(dateInfo);

    //check for impossible dates
    if (dateInfo.day > dateInfo.daysInMonths[dateInfo.month-1]) {
        dateInfo.day = dateInfo.daysInMonths[dateInfo.month-1];
    }

    //update the client/front-end display

    document.getElementById('dateHead').innerText = createTextFromDateObj('/')
    //update the client/front-end display
    
}


function checkLeapYear(year) {

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0 )) {

        dateInfo.daysInMonths[1] = 29
        
    } else {

        dateInfo.daysInMonths[1] = 28
    
    }
    
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


