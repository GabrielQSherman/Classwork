const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

let dateInfo = {


    year: new Date().getFullYear(),
    month: new Date().getMonth() +1,
    day: new Date().getDate(),
}

 let myKey = '2Y4dgeGYMnhG3XrzoYfrUSeOBkcEfhCBK936CLfJ'; //your key here


 function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');
 
    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';
 
    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {
 
        heading.id = headingObj.id
        
    }
 
    return heading
    
 }

window.onload = () => {

    let heading = createHeading({
        size: 2,
        text: `Welcome to Nasa's Photo Of The Day`,
        id: 'headingID'
    });

    //make first request to Nasa to get today's picture

    //make the button elm
    let mainDiv = document.createElement('div');

    mainDiv.id = 'nasaDiv';

    let nasaDiv = document.createElement('div');

    nasaDiv.id = 'NasaPOTD';

    let randomBtn = document.createElement('button');

    randomBtn.id = 'ranBtn';

    randomBtn.onclick = reqRanImg;

    randomBtn.innerText = 'Im Feelin Lucky';

    let startSelection = document.createElement('button');

    startSelection.id = 'startBtn';

    startSelection.onclick = startSquence;

    startSelection.innerText = 'Select A Date';

    document.body.appendChild(mainDiv);

    document.body.appendChild(nasaDiv);

    mainDiv.appendChild(heading);

    mainDiv.appendChild(randomBtn);

    mainDiv.appendChild(startSelection);

    // make the year select elm, current year back to 1995

    let yearNum = 2020,
        yearArr = [];
    while (yearNum > 1994) {

        yearArr.push(yearNum)
        yearNum--
    }

    let yearSelect = createSelectElement({
        defaultText: 'Select A Year', 
        array: yearArr, id: 'yearSelect',
        id: 'yearSelect',
        onchangeFunc: yearSelected
        
    });

    yearSelect.style.display = 'none';

    mainDiv.appendChild(yearSelect);

    requestApod()

}


//XHR Function

function requestApod () {

   const day = dateInfo.day < 10 ? '0' + dateInfo.day : dateInfo.day,
         month = dateInfo.month < 10 ? '0' + dateInfo.month : dateInfo.month;
         date = `${dateInfo.year}-${month}-${day}`;

    let xhr = new XMLHttpRequest(),
    method = 'GET',
    endpoint = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${date}&hd=true`;

    //open send and onload

    xhr.open(method, endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);

        displayApod(response);

    }

    xhr.send()
}


function displayApod(data) {

    let nasaPotd = document.getElementById('NasaPOTD');

    if (data.code != undefined) {

        alert(`Error Code: ${data.code}\nError Message: ${data.msg}`)

        console.log(data.code, data.msg);

    } else if (data.media_type == 'video') {

        alert('The media type was a video check the console log to get a link to view it')

        console.log('Video Link', data.url);
     } else { 

        nasaPotd.innerHTML = '';

        let crOwner = data.copyright == undefined ? 'Public Domain' : data.copyright;

        let copyrightText = createHeading({
            size:5,
            text: 'Copyright: ' + crOwner
        })

        let title = createHeading({size: 4, text: data.title})
         
        let img = document.createElement('img');

        img.src = data.hdurl;

        img.alt = 'loading image';

        img.id = 'imgId' 

        let exp = document.createElement('p');

        exp.id = 'exp';
    
        exp.innerText = data.explanation;

        let div = document.createElement('div');

        div.appendChild(img);

        div.appendChild(exp);

        nasaPotd.appendChild(div);

        nasaPotd.appendChild(title);

        nasaPotd.appendChild(copyrightText);

        img.onload = () => {
            exp.style = `transform: translate(-50%, ${- img.clientHeight*3/4}px ); display: block`;
            // exp.style.display = 'block';
        }


    }

}

function reqRanImg() {
      
      
        dateInfo.year = 1995 + Math.floor(Math.random() * (dateInfo.year - 1995));
        
        dateInfo.month = Math.floor(Math.random() * (12));

        dateInfo.day = Math.ceil(Math.random() * (daysInMonth[dateInfo.month])); 
        requestApod()
}


//startSquence
//Functions for selecting a date

function startSquence() {

    this.style.display = 'none'; //hides the button without deleting it

    yearSelect.style.display = 'none';

    let yearS = document.getElementById('yearSelect');

    yearS.style.display = 'inline';



    
}

function yearSelected() {

    
    //extract the year that was selected
    let year =  this.value;

    //set the year property of the new date object
    dateInfo.year = year;


    //hide the year select

    this.style.display = 'none'; 

    //create the month select 

    let monthsArr = [1,2,3,4,5,6,7,8,9,10,11,12];

    if (year == 1995) {

        monthsArr.splice(0,5,);

        console.log(monthsArr);

    } else if (year == new Date().getFullYear() ) {

        let currMonth = new Date().getMonth() + 1;

        monthsArr.splice(currMonth, 12);



    }

    if (document.getElementById('monthSelect') != null ) {

        let child = document.getElementById('monthSelect');

        document.getElementById('nasaDiv').removeChild(child);
        
    }

    let monthSelect = createSelectElement({
        defaultText: 'Select A Month', 
        id: 'monthSelect',
        onchangeFunc: monthSelected,
        array: monthsArr

    });

    document.getElementById('nasaDiv').appendChild(monthSelect);

}

function monthSelected() {


    let month = this.value; //extract value from select

    dateInfo.month = month; //set dateinfo prop accordingly

    this.style.display = 'none';

    //create the day select elm

    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    let daysArr = [];

    let count = 1;
    let days = []

   for (let i =1; i <= daysInMonths[month-1]; i++) {

    daysArr.push(i)

   }

   if (dateInfo.year == 1995 && month == 6) {

    daysArr.splice(0,15)

   } else if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() + 1) {

        console.log(new Date().getDate(), daysArr.length-1);

        daysArr.splice( new Date().getDate(), daysArr.length-1);
    

   }

   
    if (document.getElementById('daySelect') != null ) {

        let child = document.getElementById('daySelect');

        document.getElementById('nasaDiv').removeChild(child);
        
    }
  
    let daySelect = createSelectElement({
        defaultText: 'Select A Day',
        id: 'daySelect',
        onchangeFunc: daySelected,
        array: daysArr
    })
    
    //append the select element to the dom

    document.getElementById('nasaDiv').appendChild(daySelect);

}



function daySelected() {

    this.style.display = 'none';

    let day = this.value; 

    dateInfo.day = day;

    document.getElementById('startBtn').style.display = 'initial';
    document.getElementById('yearSelect').value = '';



    console.log(`${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);
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




    return select;
}