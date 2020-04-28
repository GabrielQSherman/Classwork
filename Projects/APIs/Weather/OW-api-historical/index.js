
//this is where all my main html elements are created
window.onload = () => {


    let mainTitle = createHeading({text: 'Welcome To The Historical Weather Databank', size: 1});

    let dateText = createHeading({text: '', size: 3, id: 'dateText'});

    let UIdiv = createDivElement({id: 'uidiv'});

    let weatherDiv = createDivElement({id: 'weatherDiv'});

    let yearArr = Array.from({ length: dateInfo.year+1 }, (a, b) => b).slice(dateInfo.year-40);

    let yearSelect = createSelectElement({array: yearArr, id: 'yearSelect', defaultText: 'Select A Year', onchangeFunc: yearSelected});

    let userInput = createInput({placeholder: 'Enter A City Name', id: 'cityName'});

    let submitBtn = document.createElement('button');

    submitBtn.innerText = 'Request Weather Data';

    submitBtn.onclick = requestApi;

    document.body.appendChild(mainTitle);
    document.body.appendChild(UIdiv);
    document.body.appendChild(weatherDiv);

    UIdiv.appendChild(dateText);
    UIdiv.appendChild(submitBtn);
    UIdiv.appendChild(userInput);
    UIdiv.appendChild(yearSelect);

}

function requestApi() {

    let weatherDiv = document.getElementById('weatherDiv'),

        cityName = document.getElementById('cityName').value.trim(),

        numbers = /[0-9]/;

    if (cityName < 3 || cityName > 33 || numbers.test(cityName)) {

        alert('Make Sure You Input A REAL City Name');
        return
        
    }

    let start = new Date(`${dateInfo.month} ${dateInfo.day}, ${dateInfo.year}`).getTime(),
        end = start + (8.64 * Math.pow(10,7));

    const endpoint = `http://history.openweathermap.org/data/2.5/history/city?q=${cityName},us&type=hour&start=${start}&end=${end}&APPID=${OWapiKey}`

    let xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint, true)

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);

        console.log(parsedData);

    }

    xhr.send()
    

}
