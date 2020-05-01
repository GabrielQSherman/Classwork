const myKey = '2HW3CaI3';

//this is where all my main html elements are created
window.onload = () => {


    let mainTitle = createHeading({text: 'Welcome To The Historical Weather Databank', size: 1});

    let dateText = createHeading({text: '', size: 3, id: 'dateText'});

    let UIdiv = createDivElement({id: 'uidiv'});

    let weatherDiv = createDivElement({id: 'weatherDiv'});

    let copyrightDiv = createDivElement({id: 'crDiv'});

    let yearArr = Array.from({ length: dateInfo.year+1 }, (a, b) => b).slice(dateInfo.year-40).reverse();

    let yearSelect = createSelectElement({array: yearArr, id: 'yearSelect', defaultText: 'Select A Year', onchangeFunc: yearSelected});

    let userInput = createInput({placeholder: 'Enter A City Name', id: 'cityName'});

    let submitBtn = document.createElement('button');

    submitBtn.innerText = 'Request Weather Data';

    submitBtn.id = 'submitBtn';

    submitBtn.onclick = searchStationReq;

    userInput.onkeyup = testUserSubmits;

    submitBtn.style.display = 'none';

    copyrightDiv.innerHTML = 'Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.';

    document.body.appendChild(mainTitle);
    document.body.appendChild(UIdiv);
    document.body.appendChild(weatherDiv);
    document.body.appendChild(copyrightDiv);

    UIdiv.appendChild(dateText);
    UIdiv.appendChild(submitBtn);
    UIdiv.appendChild(userInput);
    UIdiv.appendChild(yearSelect);

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

function searchStationReq() {

    let weatherDiv = document.getElementById('weatherDiv'),

        cityName = document.getElementById('cityName').value.trim().toLowerCase();

    //https://api.meteostat.net/v1/stations/search?q=toronto&key=XXXXXXXX

    //https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}

    const endpoint = `https://api.meteostat.net/v1/stations/search?q=${cityName}&key=${myKey}`

    let xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint, true)

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);

        // console.log(parsedData); //returns and object with an array of objects, each object represents a stations that this api has historical weather information from


        if (parsedData.data.length == 0) {

            alert('No stations found with that search, please try a diffrent city name')
            
        } else if (parsedData.data.length == 1) {
            //request historical info for the one station found
            let stationObj = parsedData.data[0];

                stationObj.name = `${stationObj.name}, ${stationObj.country}`;

            reqHisData(stationObj)


        } else {
            //have the select a station

            // let stationNameArr = parsedData.data.map( )

            // let selectStation = createSelectElement({defaultText: 'Selection A Weather Station', })

            let selectElm = document.createElement('select');

            let defautlOpt = document.createElement('option');

                defautlOpt.innerText = 'Selection A Weather Station';

                selectElm.appendChild(defautlOpt);

            for (let i = 0; i < parsedData.data.length; i++) {
               
                let stationOpt = document.createElement('option');

                stationOpt.innerText = `${parsedData.data[i].name}, ${parsedData.data[i].country}`;

                stationOpt.value = parsedData.data[i].id;

                selectElm.appendChild(stationOpt);
                
            }

            selectElm.onchange = () => {

                let stationSelect = document.getElementById('stationSelect');
                let stationObject = {
                    id: stationSelect.value,
                    name: stationSelect.options[stationSelect.selectedIndex].text
                }

                reqHisData(stationObject)
            }

            selectElm.id = 'stationSelect';


            if (document.getElementById('stationSelect') != null) {

                document.getElementById('stationSelect').remove()

            }

            document.getElementById('uidiv').appendChild(selectElm);

            alert('Select a station to complete your submition')

        }

    }

    xhr.send()
    

}

function reqHisData(stationObj) {

    //define

        //endpoint  https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}

            //stationcode
            //startDate, endDate
            //station, start, end
    let month = dateInfo.month > 9 ? dateInfo.month : '0' + dateInfo.month,
        day = dateInfo.day > 9 ? dateInfo.day : '0' + dateInfo.day,

        start = `${dateInfo.year}-${month}-${day}`,

        end = start,
        
        endpoint = `https://api.meteostat.net/v1/history/daily?station=${stationObj.id}&start=${start}&end=${end}&key=${myKey}`,

        xhr = new XMLHttpRequest();

        // console.log(endpoint);
 
        xhr.open('GET', endpoint, true)

        xhr.onload = () => {

                let parsedData = JSON.parse(xhr.responseText);

                // console.log(parsedData); //returns and object with an array of objects, each object represents a stations that this api has historical weather information from

                //if parsedData.data is an empty array, the date provided is outside the limits of the given station
                let weatherInfo = parsedData.data[0];

                if (weatherInfo != undefined) {

                    displayWeatherData(weatherInfo, stationObj)

                    
                } else {

                    alert('Weather Data Not Available For This Location At The Date Provided')
                }


        };

        xhr.send()
    
}

function displayWeatherData(weather, station) { //weather contains the object that has important weather info, station is the weather station object that was used in the request

    // console.log(station);

    let stationDiv = createDivElement({}),
        weatherDiv = document.getElementById('weatherDiv'),

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
