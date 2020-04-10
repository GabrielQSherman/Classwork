let date = new Date();

let dateInfo = {

    year: date.getFullYear(),
    month: date.getMonth() +1,
    day: date.getDate(),

    dayInMonths: [31,28,31,30,31,30,31,31,30,31,30,31]

};





//function calls
createInitalElms()






//functions


//returns a string from the global 'dateInfo' js object
function createTextFromDateObj(separator) {

    let sep = separator != undefined ? separator : '/',

        dateObj = dateInfo,

        day = dateInfo.day > 9 ? dateInfo.day : '0' + dateInfo.day,

        month = dateInfo.month > 9 ? dateInfo.month : '0' + dateInfo.month;

        string = month + sep + day + sep + dateInfo.year;

        return string

}



//creates elements and puts them on the body
function createInitalElms(){

    createHeading({text: createTextFromDateObj('-'), id: 'dateHead'})

    //This creates the current date heading that is shown on the site
    let day = dateInfo.day >= 10 ? dateInfo.day : '0' + dateInfo.day;
    let month = dateInfo.month >= 10 ? dateInfo.month : '0' + dateInfo.month;
    let dateInfoString = `${month}/${day}/${dateInfo.year}`;


    
    //create the head elm
    //set the properties
    createHeading({text: dateInfoString, id: 'dateHead'})
    
    //create all the needed button elms



    //next day, prev day, next month, prev month, next year, prev year, (set back to current date)

    createButton({id: 'nextDay', class: 'navBtns', text: 'Next Day', onClickFunc: modifyDate}),
    createButton({id: 'prevDay', class: 'navBtns', text: 'Prev Day', onClickFunc: modifyDate}),
    createButton({id: 'nextMonth', class: 'navBtns', text: 'Next Month', onClickFunc: modifyDate}),
    createButton({id: 'prevMonth', class: 'navBtns', text: 'Prev Month', onClickFunc: modifyDate}),
    createButton({id: 'nextYear', class: 'navBtns', text: 'Next Year', onClickFunc: modifyDate}),
    createButton({id: 'prevYear', class: 'navBtns', text: 'Prev Year', onClickFunc: modifyDate});


}


//modify the date variable dpeending on which button was clicked
function modifyDate(){

    //find out what button was clicked

    console.log(this);  // Expect the HTML element whichthe functionwas called from 

    let id = this.id,
        curDay = dateInfo.day,
        curMonth = dateInfo.month,
        curYear = dateInfo.year;

    console.log(dateInfo, checkLeapYear(curYear));
    
    if (checkLeapYear(curYear)) {
        dateInfo.dayInMonths[1] = 29
    } else {
        dateInfo.dayInMonths[1] = 28
    }


    switch (id) {
        case 'nextDay':

            nextDay(curDay, curMonth)

            break;

        case 'prevDay':

            prevDay(curDay, curMonth)

            break;

        case 'nextMonth':

            nextMonth(curMonth)

            break;  
            
        case 'prevMonth':

            prevMonth(curMonth)

            break; 
            
        case 'nextYear':

            break;   

        case 'prevYear':

            break;    
 
    }

    
    console.log(dateInfo, checkLeapYear(curYear));

    //check for impossible dates like feb 31st
    if ( dateInfo.day > dateInfo.dayInMonths[dateInfo.month-1] ) {

        dateInfo.day = dateInfo.dayInMonths[dateInfo.month-1]

    }



    document.getElementById('dateHead').innerText = createTextFromDateObj('-')
        //update the clinet/ front end display

}

function nextDay(curDay, curMonth) {

    //what month are we in, what is the last day of the month
    //are we in the last day of the month, if so go to the next month.
    //is it demcember?  in which case go to the next year
    //if we are not on the last day of the month simply increase the 'day number by one

    

    if ( curDay < dateInfo.dayInMonths[curMonth-1] ) {
        dateInfo.day++
    } else if (curDay == dateInfo.dayInMonths[curMonth-1] && curMonth != 12 ) {      //at the end of the month, but not the end of the year

            dateInfo.day = 1;
            dateInfo.month++

    } else if (curDay == dateInfo.dayInMonths[curMonth-1] && curMonth == 12) {      //at the end of the month of december

        dateInfo.day = 1;
        dateInfo.month = 1;
        date.year++

    }


}

function prevDay(curDay, curMonth){

    


    if ( curDay > 1 ) {

        dateInfo.day--

    } else if( curDay == 1 && curMonth != 1 ){

        dateInfo.day = dateInfo.dayInMonths[curMonth-2];
        dateInfo.month--

    } else if ( curDay == 1 && curMonth == 1 ) {

        dateInfo.day = 31;
        dateInfo.month = 12;
        dateInfo.year--

    }

}

function nextMonth(curMonth){



    if ( curMonth < 12 ) {

        dateInfo.month++

    }else if ( curMonth == 12 ) {

        dateInfo.month = 1;
        dateInfo.year++

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}

function prevMonth(curMonth){


    if ( curMonth > 1 ) {

        dateInfo.month--

    }else if ( curMonth == 1 ) {

        dateInfo.month = 12;
        dateInfo.year--

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}


function checkLeapYear(year){

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0 )) {

        return true

    } else {

        return false

    }

}

function nextYear(curYear){



    if ( curYear < 1 ) {

        dateInfo.year++

    }else if ( curYear == 2021 ) {

        dateInfo.year++

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}

function prevYear(curYear){


    if ( curYear > 1 ) {

        dateInfo.month--

    }else if ( curMonth == 1 ) {

        dateInfo.month = 12;
        dateInfo.year--

    }else {
        console.log('something has gone wrong', dateInfo);
    }


}


//functions that create html elements
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

    if(buttonObj.id != undefined && document.getElementById(buttonObj.id) == null){
        button.id = buttonObj.id
    }
    

    if(buttonObj.class != undefined) {
    button.className = buttonObj.class
 }

    if ( buttonObj.onClickFunc != undefined) {
        button.onclick = buttonObj.onClickFunc;
    }

    if(buttonObj.text != undefined)
    button.innerText = buttonObj.text

    document.body.appendChild(button);
}
