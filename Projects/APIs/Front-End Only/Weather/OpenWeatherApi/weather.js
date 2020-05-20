 let nasaKey = '2Y4dgeGYMnhG3XrzoYfrUSeOBkcEfhCBK936CLfJ', //your key here


     OWapiKey = `1d9310268663c451264a0a75aef60939`,

     uiHidden = false;


window.onload = () => {

    let reqWeatherBtn = document.createElement('button'),
        reqNasaImg = document.createElement('button'),
        uiHideBtn = document.createElement('button'),

        cityNameInput = document.createElement('input'),
        nasaInfo = document.createElement('p');

    reqWeatherBtn.id = 'reqBtn';
    uiHideBtn.id = 'uiHideBtn';
    nasaInfo.id = 'nasaInfo';
    cityNameInput.id = 'cityIn';
    
    reqWeatherBtn.onclick = requestApi;
    uiHideBtn.onclick = hideUI;
    reqNasaImg.onclick = reqRanImg;
    
    reqWeatherBtn.innerText = 'Get the current weather';
    reqNasaImg.innerText = 'Change NASA Image';
    uiHideBtn.innerText = 'Hide UI';
    cityNameInput.placeholder = 'Enter A City Name OR Zipcode';


    let UI = document.createElement('div'),
        info = document.createElement('div'),
        nasa = document.createElement('div');

    UI.id = 'uidiv';
    info.id = 'infodiv';
    nasa.id = 'nasaDiv';

    document.body.appendChild(UI);

    document.body.appendChild(info);

    document.body.appendChild(nasa);

    nasa.appendChild(nasaInfo)
    nasa.appendChild(reqNasaImg)
    nasa.appendChild(uiHideBtn)
    
    UI.appendChild(cityNameInput)
    UI.appendChild(reqWeatherBtn)

    reqRanImg()

}

function requestApi() {

    //declare variable for endpoint

    const userIn = document.getElementById('cityIn').value.trim();

    console.log(userIn.length);

    let num = /[0-9]/g,
        alpha = /[A-z]/;

    let query;

    if (userIn.length < 3 || userIn.length > 30) {
        alert('That is not a vaild city name or zipcode, try something with more characters!')
        return
    } else if (num.test(userIn) && alpha.test(userIn)) {
        alert('There can not be numbers and letters in your search.')
        return
    } else if ( !alpha.test(userIn) && userIn.match(num).length === 5 ) { //vail zip

        query = `zip=${userIn}`;

    } else if ( alpha.test(userIn) ) { //vaild string

        query = `q=${userIn}`;

    } else { //invaild zip

        console.log(userIn.match(num));
        
        alert('The numbers you entered were not a zipcode')
        return
    }
    //check for vaild zipcode format only 5numbers

    let endPoint = `https://api.openweathermap.org/data/2.5/weather?${query}&APPID=${OWapiKey}&units=imperial`,

    //create instance of xhr object
        xhr = new XMLHttpRequest();

    //open channel to the internet
        xhr.open('GET', endPoint, true);

    //once a response gets back, run this function to handle the information received
        xhr.onload = () => {

            const weatherData = JSON.parse(xhr.responseText);

            if (weatherData.weather == undefined) {

                document.getElementById('cityIn').value = '';
                document.getElementById('cityIn').placeholder = weatherData.message;
                return;

            }
            // console.log(weatherData);

            updateDisplay(weatherData)
            
        }

    //finalize the request being sent
    xhr.send();
    
}

function updateDisplay(data) {

    const windDirection = getWindDirect(data.wind.deg);

    
    let general = document.createElement('div'),

        infoDiv = document.getElementById('infodiv'),

        iconImg = document.createElement('img');

    //add data into html elements

    general.innerHTML = `<h1>Currently in ${data.name} it is...</h1><br><h3>On average ${data.main.temp}°F.  With a high of ${data.main.temp_max}°F and a low of ${data.main.temp_min}°F.</h3><br><h3>The humidity is ${data.main.humidity}%, and the pressure is ${data.main.pressure}hPa.</h3><br><h3>Winds are coming from the ${windDirection} with speeds of ${data.wind.speed}mph.</h3><br>`

    iconImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    //clear the info div and add elements that were just created
    infoDiv.innerHTML = '';


    infoDiv.appendChild(iconImg)
    infoDiv.appendChild(general)


    
}

function getWindDirect(deg) {

    if (deg >= 0 && deg < 11.25 || deg >= 326.25 && deg <= 348.75) {
        return 'North'
    } else if (deg >= 11.25 && deg < 56.25) {
        return 'North East'
    } else if (deg >= 56.25 && deg < 101.25) {
        return 'East'
    } else if (deg >= 101.25 && deg < 146.25) {
        return 'South East'
    } else if (deg >= 146.25 && deg < 191.25) {
        return 'South'
    } else if (deg >= 191.25 && deg < 236.25) {
        return 'South West'
    } else if (deg >= 236.25 && deg < 281.25) {
        return 'West'
    } else if (deg >= 281.25 && deg < 326.25) {
        return 'North West'
    }

}

//variables to make NASA api work

const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

let dateInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() +1,
    day: new Date().getDate(),
}, currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() +1,
    day: new Date().getDate(),
};

//XHR Function for nasa api

function requestApod () {

   const day = dateInfo.day < 10 ? '0' + dateInfo.day : dateInfo.day,
         month = dateInfo.month < 10 ? '0' + dateInfo.month : dateInfo.month;
         date = `${dateInfo.year}-${month}-${day}`;

    let xhr = new XMLHttpRequest(),
    method = 'GET',
    endpoint = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${date}&hd=true`;

    //open send and onload

    xhr.open(method, endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        //only set the background image if an image is returned, others try another image
        if (response.media_type == 'image') {

            let crOwner = response.copyright == undefined ? 'Public Domain' : response.copyright;

            document.getElementById('nasaInfo').innerHTML = `Copyright ${crOwner}<br>NASA APOD ${date}<br>Title: '${response.title}'`

            document.body.style.backgroundImage = `url(${response.hdurl})`
        } else {
            reqRanImg()
        }


    }

    xhr.send()
}


function reqRanImg() {
      
    dateInfo.year = 1995 + Math.floor(Math.random() * (currentDate.year - 1995));
    
    dateInfo.month = Math.floor(Math.random() * (12));

    dateInfo.day = Math.ceil(Math.random() * (daysInMonth[dateInfo.month])); 

    requestApod()
}

function hideUI() {

    let UiDiv = document.getElementById('uidiv'),
        weatherDiv = document.getElementById('infodiv'),
        nasaDiv = document.getElementById('nasaDiv'),
        uiHideBtn = document.getElementById('uiHideBtn');

    if (!uiHidden) {

        uiHideBtn.innerText = 'Show UI'

        UiDiv.style.opacity = '0%';
        weatherDiv.style.opacity = '0%';
        nasaDiv.style.opacity = '10%';

        uiHidden = true;
        
    } else {

        uiHideBtn.innerText = 'Hide UI'

        UiDiv.style.opacity = '100%';
        weatherDiv.style.opacity = '100%';
        nasaDiv.style.opacity = '100%';

        uiHidden = false;

    }  
}