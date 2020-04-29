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

        console.log(parsedData); //returns and object with an array of objects, each object represents a stations that this api has historical weather information from


        if (parsedData.data.length == 0) {

            alert('No stations found with that search, please try a diffrent city name')
            
        } else if (parsedData.data.length == 1) {
            //request historical info for the one station found

            reqHisData(parsedData.data[0])


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
                    id: stationSelect.value
                }

                reqHisData(stationObject)
            }

            selectElm.id = 'stationSelect';


            if (document.getElementById('stationSelect') != null) {

                document.getElementById('stationSelect').remove()

            }

            document.getElementById('uidiv').appendChild(selectElm);

            alert('Select a station to complete your submition')


            //make select element

            //create onchange function

            //req historical info

            //provide hitsorical info for the selected station
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

        console.log(endpoint);
 
        xhr.open('GET', endpoint, true)

        xhr.onload = () => {

                let parsedData = JSON.parse(xhr.responseText);

                console.log(parsedData); //returns and object with an array of objects, each object represents a stations that this api has historical weather information from

                //if parsedData.data is an empty array, the date provided is outside the limits of the given station
                let weatherInfo = parsedData.data[0];

                if (weatherInfo != undefined) {

                    //display info to the frontend

                    
                } else {

                    alert('Weather Data Not Available For This Location At The Date Provided')
                }


        };

        xhr.send()
    
}
