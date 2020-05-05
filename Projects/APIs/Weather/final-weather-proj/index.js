const meteoStatKey = '2HW3CaI3',

      OWapiKey = `1d9310268663c451264a0a75aef60939`;


//this is where all the main html elements are created
window.onload = () => {

    let mainDiv = createDivElement({id: 'mainDiv'});

    document.body.appendChild(mainDiv);

    initCurFrontEnd()

    initHisFrontEnd()

    cityIn.value = '02906';

    requestCurApi()

}

function initHisFrontEnd() {

     let mainTitle = createHeading({text: 'Historical Weather', size: 1}),

         mainDiv = document.getElementById('mainDiv'),

         dateText = createHeading({text: '', size: 3, id: 'dateText'}),

         hisDiv = createDivElement({id: 'historicalDiv'}),

         UIdiv = createDivElement({id: 'uidiv'}),

         weatherDiv = createDivElement({id: 'hisWeatherDiv'}),

         copyrightDiv = createDivElement({id: 'crDiv'}),

         yearArr = Array.from({ length: dateInfo.year+1 }, (a, b) => b).slice(dateInfo.year-40).reverse(),

         yearSelect = createSelectElement({array: yearArr, id: 'yearSelect', defaultText: 'Select A Year', onchangeFunc: yearSelected}),

         userInput = createInput({placeholder: 'Enter A City Name', id: 'cityName'}),

         submitBtn = document.createElement('button');

    submitBtn.innerText = 'Request Weather Data';

    submitBtn.id = 'submitBtn';

    submitBtn.onclick = searchStationReq;

    userInput.onkeyup = testUserSubmits;

    submitBtn.style.display = 'none';

    copyrightDiv.innerHTML = 'Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.';

    mainDiv.appendChild(hisDiv)

    hisDiv.appendChild(mainTitle);
    hisDiv.appendChild(UIdiv);
    hisDiv.appendChild(weatherDiv);
    hisDiv.appendChild(copyrightDiv);

    UIdiv.appendChild(dateText);
    UIdiv.appendChild(submitBtn);
    UIdiv.appendChild(userInput);
    UIdiv.appendChild(yearSelect);

}

function initCurFrontEnd() {

    let mainDiv = document.getElementById('mainDiv'),
        
        reqWeatherBtn = document.createElement('button'),

        cityNameInput = createInput({placeholder: 'Enter A City Name OR Zipcode', id: 'cityIn'}),

        curWeatherUI = createDivElement({id: 'curUiDiv'}),

        currentTitle = createHeading({text: 'Current Weather', size: 1}),

        infoDiv = createDivElement({id: 'infodiv'}),

        curDiv = createDivElement({id: 'currentDiv'});
        
    reqWeatherBtn.onclick = requestCurApi;
    reqWeatherBtn.innerText = 'Get the current weather';

    mainDiv.appendChild(curDiv)

    curWeatherUI.appendChild(currentTitle)
    curWeatherUI.appendChild(cityNameInput)
    curWeatherUI.appendChild(reqWeatherBtn)
    

    curDiv.appendChild(curWeatherUI)
    curDiv.appendChild(infoDiv)
    
}

function displayCurData(data) {

    let windDirection = getWindDirect(data.wind.deg),
    
        currentWeatherDiv = document.getElementById('infodiv'),

        infoDiv = document.createElement('div'),

        iconImg = document.createElement('img'),

        cityName = createHeading({size: 2, text: data.name});

        iconImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        currentWeatherDiv.appendChild(infoDiv)

        infoDiv.appendChild(cityName)

        infoDiv.appendChild(iconImg)

    for (const key in data) {
       
       if (key == 'main' ) {


           for (const k in data[key]) {
               let dataType = k.substring(0,1).toUpperCase() + k.substring(1,k.length).replace(/_/, ' ');

               for (let i = 0; i < dataType.length; i++) {
                   
                   if (dataType[i] == ' ') {

                       console.log(dataType[i],dataType[i+1].toUpperCase());
                       
                       dataType = dataType.substring(0,i+1) + dataType.substring(i+1,i+2).toUpperCase() + dataType.substring(i+2,dataType.length);
                   }
 
               }

                let infoHeading = createHeading({size: 4, text: `${dataType} - ${data[key][k]}`})

                infoDiv.appendChild(infoHeading)
           }
           
       }
    }

     let deleteButton = document.createElement('button');

    deleteButton.innerText = 'X';

    deleteButton.onclick = deleteADiv;

    infoDiv.appendChild(deleteButton);
    
}

function displayHisWeatherData(weather, station) { //weather contains the object that has important weather info, station is the weather station object that was used in the request

    // console.log(station);

    let stationDiv = createDivElement({}),
        weatherDiv = document.getElementById('hisWeatherDiv'),

        stationNameHead = createHeading({size: 2, text: station.name});

        stationDiv.appendChild(stationNameHead);

    for (const k in weather) {
    
        if (weather[k] != null) {
            
            let infoType = k.substring(0,1).toUpperCase() + k.substring(1,k.length),

                convertedData = convertData(k, weather[k]),

                weatherInfoHead = createHeading({size: 4, text: `${infoType}: ${convertedData}`});

            //append to the stationDiv
            stationDiv.appendChild(weatherInfoHead);
            
        }
        
    }

    let deleteButton = document.createElement('button');

    deleteButton.innerText = 'X';

    deleteButton.onclick = deleteADiv;

    stationDiv.appendChild(deleteButton);

    //append the stationDiv To weatherDiv
    weatherDiv.appendChild(stationDiv);

}

function testUserSubmits() { //data sanitize func

    // console.log(this);

    let cityName = document.getElementById('cityName').value.trim(),

        submit = document.getElementById('submitBtn');

        numbers = /[0-9]/;
    
    if (cityName.length < 3 || cityName.length >= 58 || numbers.test(cityName) || !userProvidedDate) {
        
        submit.style.display = 'none';

    } else {
    
        submit.style.display = 'inline';
    }
}

function deleteADiv() {

    this.parentElement.remove()

}

function convertData(key, value) {

    switch (key) {

        case 'peakgust':
        case 'windspeed':

            return (Math.round((value / 1.609344)*10))/10 + 'mph'
            
        case 'precipitation':

            return (Math.round((value / 25.4)*100))/100 + 'in.'

        case 'pressure': 
            return value + 'hPa'

        case 'snowdepth':
        case 'snowfall':
            
            return (Math.round((value/2.54)*100))/100 + 'in.'
        case 'temperature':
        case 'temperature_min':
        case 'temperature_max':

            return (Math.round(((value*9/5)+32)*10))/10 + '°F'
        case 'winddirection':

            return getWindDirect(value)
        case 'date':

            return value
    
    }

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
