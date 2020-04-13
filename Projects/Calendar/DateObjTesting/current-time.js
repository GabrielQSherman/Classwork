//render a digital and digitally anolog display of the current time

window.onload = () => {


    //variables for date and loop
    let frames = 0;

    //vars for html elements
    let timeString = document.createElement('h1');

        timeString.id = 'timeString';

    //vars for canvas

    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),

        width = canvas.width = 200,
        height = canvas.height = 200;

    //append the H1 to the DOM
    document.body.appendChild(timeString);

    //first call of the loop
    loop()

    function loop() {
        
        frames++

        console.log(frames);

        let time = getCurrentTime() // returns an object with all the relevent info of the current time

        updateAnalogDisplay(time) // updates clock display

        updateDigitalDisplay(time) // update string display
                
        //this conditional will cause the loop to end, otherwise it would go on until the browser window is closed
        if (frames < 100) { 
            setTimeout(window.requestAnimationFrame, 100, loop)
        }
    }
    
}
//creates variable that can be used in both time related functions
function getCurrentTime() {

    const dateObject = new Date(),

          months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
          
          daysOWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = dateObject.getDay(),
        date = dateObject.getDate(),
        month = dateObject.getMonth(),
        year = dateObject.getFullYear(),

        hours = dateObject.getHours(),
        minutes = dateObject.getMinutes(),
        seconds = dateObject.getSeconds(),
        milliseconds = dateObject.getMilliseconds();

    const timeObj = {
        
        dayInt: day,
        dayStr: daysOWeek[day],

        date: date,
        
        monthInt: month,
        monthStr: months[month],
        
        year: year,

        hr: hours,
        min: minutes,
        sec: seconds,
        ms: milliseconds

    };

    return timeObj

}


//creates a clock display on a canvas element
function updateAnalogDisplay(time) {

}

//updates the text to display the time/date in string format
function updateDigitalDisplay(time) {
    
    let hour, minutes;

     if (time.min == 0 ) {
        
        minutes = 'exactaly'
    
    } else if (time.min == 15) {

        minutes = 'quarter past'

    } else if (time.min < 30) {

        secondStr = time.sec == 1 ? 'second' : 'seconds';

        minutes = time.sec != 0 ? `${time.min} minutes and ${time.sec} ${secondStr} past` : `exactaly ${time.min} minutes past`

    } else if (time.min == 30) {

        minutes = 'half past'

    } else if (time.min == 45) {

        minutes = 'quarter till'

        time.hr++

    } else if (time.min > 30) {

        secondStr = time.sec == 59 ? 'second' : 'seconds';

        minutes = `${60 - time.min} minutes and ${60 - time.sec} ${secondStr} till`

        time.hr++

    }

    if (time.hr == 0 ) {
        hour = '12 AM'
    } else if (time.hr < 12) {
        hour = time.hr + ' AM'
    } else if (time.hr == 12) {
        hour = '12 PM'
    } else {
        hour = time.hr - 12 + ' PM'
    }


    document.getElementById('timeString').innerText = `It is now ${minutes} ${hour}`

}
