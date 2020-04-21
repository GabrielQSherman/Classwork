let dateInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    },

    myKey = '2Y4dgeGYMnhG3XrzoYfrUSeOBkcEfhCBK936CLfJ';
    
window.onload = () => {

    //make the first Nasa req to get todays picture

    requestApod()

    //make the button elm,

    let startSelection = document.createElement('button');

    startSelection.id = 'startBtn';

    startSelection.onclick = startSquence;

    startSelection.innerText = 'Select A Date';

    document.body.appendChild(startSelection);

    // make the year select elm

    let yearNum = 2020,
        yearArr = [];

    while (yearNum > 1994) {

        yearArr.push(yearNum)
        yearNum--
        
    }

    let yearSelect = createSelectElement({
        defaultText: 'Select A Year', 
        array: yearArr, 
        id: 'yearSelect',
        onchangeFunc: yearSelected
    });

    document.body.appendChild(yearSelect);

    yearSelect.style.display = 'none';
}

//XHR Function

function requestApod () {

    const day = dateInfo.day < 10 ? '0' + dateInfo.day : dateInfo.day,
          month = dateInfo.month < 10 ? '0' + dateInfo.month : dateInfo.month,
          date = `${dateInfo.year}-${month}-${day}`;

    let xhr = new XMLHttpRequest(),
        method = 'GET',
        endpoint = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${date}&hd=true`;

    xhr.open(method, endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);

        displayApod(response)
        
    }

    xhr.send()
}

function displayApod(data) {

    if (data.code != undefined) {

        alert(`Error Code: ${data.code}\nError Message: ${data.msg}`)

        console.log(data.code, data.msg);    
        
    } else if (data.media_type == 'video') {

        alert('The media type was a video check the console log to get a link to view it')

        console.log('Video Link', data.url);
        

    } else {

        let img = document.createElement('img');

        img.src = data.hdurl;

        img.alt = 'loading image';

        document.body.appendChild(img);

    }
    
}

//startSquence
//Functions for selecting a date

function startSquence() {

    this.style.display = 'none'; //hides the button without deleting it

    let yearS = document.getElementById('yearSelect');

    yearS.style.display = 'initial';
    
}

function yearSelected() {

    //extract the year that was selected
    let year = this.value;

    //set the year property of the date object
    dateInfo.year = year;

    //hide the year select

    this.style.display = 'none';

    //create the month select

    let monthsArr = [1,2,3,4,5,6,7,8,9,10,11,12]; 

    if (year == 1995) {
        monthsArr.splice(0,5);

        console.log(monthsArr);
        
    } else if (year == new Date().getFullYear() ) {

        let currMonth = new Date().getMonth() + 1;

        monthsArr.splice(currMonth, 12);

        console.log(monthsArr);
        
    }

    let monthSelect = createSelectElement({
        defaultText: 'Select A Month',
        id: 'monthSelect',
        onchangeFunc: monthSelected,
        array: monthsArr 
    });

    document.body.appendChild(monthSelect);
    
}

function monthSelected() {

    let month = this.value; //extract value from select

    dateInfo.month = month; //set dateinfo prop accordingly

    this.style.display = 'none';

    //create an array with all the days for the month

    const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    //create an array with just the numbers for the days of the selected month
    let daysArr = []; //create empty array

    for (let i = 1; i <= daysInMonths[month-1]; i++) { //fill it with only the info we
        
        daysArr.push(i)
        
    }

    if (dateInfo.year == 1995 && month == 6) {

        daysArr.splice(0,15)
        
    } else if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() + 1 ) {

        console.log(new Date().getDate(), daysArr.length-1);
        
        daysArr.splice( new Date().getDate(), daysArr.length-1)
    }

    //create select element

    let daySelect = createSelectElement({
        defaultText: 'Select A Day',
        id: 'daySelect',
        onchangeFunc: daySelected,
        array: daysArr 
    })

    //append the select element to the dom

    document.body.appendChild(daySelect);
    
}

function daySelected() {

    this.style.display = 'none';

    let day = this.value;

    dateInfo.day = day;

    document.getElementById('startBtn').style.display = 'initial';
    document.getElementById('yearSelect').value = '';

    // console.log(`${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);
    //call the api
    requestApod()
    
}

//functions to create html elements
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

    //onchange property

    select.onchange = selectObject.onchangeFunc != undefined ? selectObject.onchangeFunc : undefined;

    return select
    //return
    
}