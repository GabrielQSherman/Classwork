window.onload = () => {

    let button = document.createElement('button');

    button.id = 'reqBtn';

    button.onclick = requestApi;

    button.innerText = 'Get the current weather';

    let cityNameInput = document.createElement('input');

    cityNameInput.placeholder = 'Enter A City Name OR Zipcode';

    cityNameInput.id = 'cityIn';

    let UI = document.createElement('div'),

        info = document.createElement('div');

    UI.id = 'uidiv';
    info.id = 'infodiv';

    document.body.appendChild(UI);

    document.body.appendChild(info);

    UI.appendChild(cityNameInput)
    UI.appendChild(button)

    cityNameInput.value = '02916';

    requestApi()

}

function requestApi() {

    //declare variable for endpoint

    const userIn = document.getElementById('cityIn').value.trim();

    console.log(userIn.length);

    let num = /[0-9]/g,
        alpha = /[A-z]/;

    //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

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

    const myKey = `1d9310268663c451264a0a75aef60939`, 

    endPoint = `https://api.openweathermap.org/data/2.5/weather?${query}&APPID=${myKey}&units=imperial`,


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

    general.innerHTML = `<h1>Currently in ${data.name} it is...</h1><br><h3>On average it is ${data.main.temp}°F.  With a high of ${data.main.temp_max}°F and a low of ${data.main.temp_min}°F.</h3><br><h3>The humidity is ${data.main.humidity}%, and the pressure is ${data.main.pressure}hPa.</h3><br><h3>Winds are coming from the ${windDirection} with speeds of ${data.wind.speed}mph.</h3><br>`

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
