
let dateRightNow = new Date();

console.log(dateRightNow);


let dateInfo = {

    year: dateRightNow.getFullYear(), 
    month: dateRightNow.getMonth(), //using index numbering for months, gets converted when displaying to the dom.
    day: dateRightNow.getDate(),

    daysInMonths: [31,28,31,30,31,30,31,31,30,31,30,31],

    leapYear: true

},

 months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novmeber', 'December'];


create_inital()

function create_inital() {
    //the date heading elm

    createHeading({id: 'dateHeading', text: '', size: 1});
    //button to start 

    createButton({id: 'startSelection', text: 'Select A Date', onClickFunc: startSelect});
    //select element years 1920-2020

    let startYear = 1920, endYear = 2020, 

        yearArr = [];
    while (startYear <= endYear) {
        yearArr.unshift(startYear)
        startYear++
    }

    let select = createSelectElement({id: 'selectYearSelect' , defaultText: 'Select A Year', array: yearArr});

    select.onchange = selectYear;

    select.style.display = 'none';

    document.body.appendChild(select)

    let selectMonths = createSelectElement({id: 'selectMonth' , defaultText: 'Select A Month', array: months});

    selectMonths.onchange = selectMonth;

    selectMonths.style.display = 'none';

    document.body.appendChild(selectMonths)
    //select element months 1-12

}

//when the button is pressed
function startSelect() {

    document.getElementById('selectYearSelect').style.display = 'initial';

    document.getElementById('startSelection').style.display = 'none';

}

//when the year select element is changed by user
function selectYear() {

    console.log(this.value);

    dateInfo.year = this.value

    this.value = '';

    document.getElementById('selectYearSelect').style.display = 'none';
    document.getElementById('selectMonth').style.display = 'initial';
    

}

//when month is selected by user
function selectMonth() {

    dateInfo.month = months.indexOf(this.value);

    this.value = '';
    

    // this.value = this.

    let count = 1, days = [];

    while (count <= dateInfo.daysInMonths[dateInfo.month]) {
        

        days.push(count)

        count++
    }

        //create the day select element

    if (document.getElementById('daySelectElm') != null) {

        let node = document.getElementById('daySelectElm');
        
        document.body.removeChild(node);

        
    }


    let daySelect = createSelectElement({id: 'daySelectElm', array: days, defaultText: 'Select A Day'});

    daySelect.onchange = selectDay;

    document.body.appendChild(daySelect);

    this.style.display = 'none';

}

function selectDay() {

    dateInfo.day = this.value;

    this.style.display = 'none';

    //show the text element and update its innerText with date

    document.getElementById('dateHeading').innerText = `${dateInfo.month + 1}/${dateInfo.day}/${dateInfo.year}`;

    document.getElementById('startSelection').style.display = 'initial';

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



function createSelectElement(selectObject) {
    // console.log(selectObject);

    let select = document.createElement('select');

    //id

    if (selectObject.id != undefined && document.getElementById(selectObject.id) == null) {
        select.id = selectObject.id;
    }
    //className

    if (selectObject.class != undefined ) {
        select.className = selectObject.class;
    }

    let defaultOpt = document.createElement('option');

    defaultOpt.innerText = selectObject.defaultText == undefined ? 'Select An Option' : selectObject.defaultText;

    defaultOpt.value = '';

    select.appendChild(defaultOpt);
    //create default option *
    //set properties of default option *
    //append it to parent

    for (let i = 0; i < selectObject.array.length; i++) {

        let option = document.createElement('option');

        option.innerText = selectObject.array[i];

        option.value = selectObject.array[i];

        select.appendChild(option);
    }

    //iterate through a given array, create child element for each one
    //innerText
    //value
    //append to parent

    //optionally add a onchange property (link rent/return methods)

    return select
    //return
    
}