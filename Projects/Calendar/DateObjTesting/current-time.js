//render a digital and digitally anolog display of the current time

//vars for canvas

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    width = canvas.width = 200,
    height = canvas.height = 200;

//this function will be called when the page loads, it will then enter a loop until the condition inside the 'loop' function is met, ending the loop
window.onload = () => {

    //variables for date and loop
    let frames = 0;

    //vars for html elements
    let timeString = document.createElement('h1');

        timeString.id = 'timeString';

    //append the H1 to the DOM
    document.body.appendChild(timeString);

    //first call of the loop
    loop()

    function loop() {
        
        frames++

        // console.log(frames); //shows number of loop cycles in console

        let time = getCurrentTime() // returns an object with all the relevent info of the current time

        updateAnalogDisplay(time) // updates clock display

        updateDigitalDisplay(time) // update string display
                
        //this conditional will cause the loop to end, otherwise it would go on until the browser window is closed
        if (frames < 10000) { 
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

    //clear the canvas of the last clock display
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.restore();

    //create the clock circle
    context.beginPath()
    context.arc(width/2, height/2, width/2, 0, Math.PI*2)
    context.stroke()

 
}

//updates the text to display the time/date in string format
function updateDigitalDisplay(time) {
    
    let hour, minutes, date;

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

    if (time.date == 1 || time.date.toString().substring(1,2) == '1' && time.date > 11) {
        date = time.date + 'st'
    } else if (time.date == 2 || time.date.toString().substring(1,2) == '2' && time.date > 12) {
        date = time.date + 'nd'
    } else if (time.date == 3 || time.date.toString().substring(1,2) == '3' && time.date > 13) {
        date = time.date + 'rd'
    } else {
        date = time.date + 'th'
    }

    document.getElementById('timeString').innerText = `It is now ${minutes} ${hour} on the ${date} of ${time.monthStr} in the year ${time.year}`

}
