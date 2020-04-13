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

        updateStringDisplay(time) // update string display
                
        //this conditional will cause the loop to end, otherwise it would go on until the browser window is closed
        if (frames < 10000) { 
            setTimeout(window.requestAnimationFrame, 30, loop)
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

    //set the stroke color to black
    context.strokeStyle = 'black';

    //create the clock circle
    context.beginPath()
    context.arc(width/2, height/2, width/2, 0, Math.PI*2)
    context.stroke()

    //create the hour marks

    context.save()
    context.translate(width/2, height/2)
    for (let i = 0; i < 12; i++) {
        
        context.beginPath()
        context.moveTo(0, width/2 - width/10)
        context.lineTo(0, width/2)
        context.stroke()
        context.rotate(Math.PI/6)
    }
    context.restore()

    //create line that indicates hour hand

    let hour = time.hr > 12 ? time.hr -12: time.hr

    context.save();

    context.translate(width/2, height/2)
    context.beginPath()
    context.moveTo(0, 0)

    context.rotate(Math.PI/6 * (hour-1 + (time.min/30)))
    
    context.lineTo(0, -width/3)
    context.stroke()

    context.restore();

    //create line that indicates min hand

    context.save();

    context.translate(width/2, height/2)
    context.beginPath()
    context.moveTo(0, 0)

    context.rotate(Math.PI/30 * ((time.min) + time.sec/60))
    
    context.lineTo(0, -width/2 + width/10)
    context.stroke()

    context.restore();

    //create line that indicates sec hand
    //set the stroke color to a diffrent color to distiguish second and min hand
    context.strokeStyle = 'pink';

    context.save();

    context.translate(width/2, height/2)
    context.beginPath()
    context.moveTo(0, 0)

    context.rotate(Math.PI/30 * (time.sec + time.ms/1000))
    
    context.lineTo(0, -width/2 + width/20)
    context.stroke()

    context.restore();
}

//updates the text to display the time/date in string format
function updateStringDisplay(time) {

    console.log(time.hr);
    
    
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

        time.date = time.hr == 24 ? time.date+1 : time.date

    } else if (time.min > 30) {

        secondStr = time.sec == 59 ? 'second' : 'seconds';

        minutes = `${60 - time.min} minutes and ${60 - time.sec} ${secondStr} till`

        time.hr++

        time.date = time.hr == 24 ? time.date + 1 : time.date
    }

    if (time.hr == 24 ) {
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
