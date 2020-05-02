function searchStationReq() {

    let weatherDiv = document.getElementById('weatherDiv'),

        cityName = document.getElementById('cityName').value.trim().toLowerCase();

    //https://api.meteostat.net/v1/stations/search?q=toronto&key=XXXXXXXX

    //https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}

    const endpoint = `https://api.meteostat.net/v1/stations/search?q=${cityName}&key=${meteoStatKey}`

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
        
        endpoint = `https://api.meteostat.net/v1/history/daily?station=${stationObj.id}&start=${start}&end=${end}&key=${meteoStatKey}`,

        xhr = new XMLHttpRequest();

        // console.log(endpoint);
 
        xhr.open('GET', endpoint, true)

        xhr.onload = () => {

                let parsedData = JSON.parse(xhr.responseText);

                // console.log(parsedData); //returns and object with an array of objects, each object represents a stations that this api has historical weather information from

                //if parsedData.data is an empty array, the date provided is outside the limits of the given station
                let weatherInfo = parsedData.data[0];

                if (weatherInfo != undefined) {

                    displayHisWeatherData(weatherInfo, stationObj)

                    
                } else {

                    alert('Weather Data Not Available For This Location At The Date Provided')
                }


        };

        xhr.send()
    
}

function requestCurApi() {

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

            displayCurData(weatherData)
            
        }

    //finalize the request being sent
    xhr.send();
    
}
