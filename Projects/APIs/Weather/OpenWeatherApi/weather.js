window.onload = () => {

    let button = document.createElement('button');

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

    
    let general = document.createElement('h2'),

        infoDiv = document.getElementById('infodiv');

    //add data into html elements

    general.innerText = 'The weather is ' + data.weather[0].main;

    //clear the info div and add elements that were just created
    infoDiv.innerHTML = '';

    infoDiv.appendChild(general)

    
}