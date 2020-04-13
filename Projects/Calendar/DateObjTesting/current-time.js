//render a digital and digitally anolog display of the current time

//vars for canvas

//create a canvas element
let canvas = document.createElement('canvas'),
    //context (sometimes shortened to ctx) is a neccesarry variable to preform animations(chnages over time) or alterations to a canvas element
    context = canvas.getContext('2d'),

    //'width' and 'height' can now be accessed globally and the canvas width and height properties are defined at the same time 
    width = canvas.width = 200,
    height = canvas.height = 200;

//variables for date and loop
    //keeps count of how many times the animation cycle has ran
    let frames = 0;

    //vars for html elements
    //this will display the current time in a sentence format
    let timeString = document.createElement('h1');

    //set id so it can be accessed globally
    timeString.id = 'timeString';

    //append the H1 and canvas to the DOM
    document.body.appendChild(timeString);
    document.body.appendChild(canvas)

//this function will be called when the page loads, it will then enter a loop until the condition inside the 'loop' function is met, ending the loop
window.onload = () => {

    //first call of the loop
    loop() //once this is called, the function will continue to call itself at line 48

    function loop() {
        
        frames++

        console.log(frames); //shows number of loop cycles in console

        let time = getCurrentTime() // returns an object with all the relevent info of the current time

        updateAnalogDisplay(time) // updates clock display

        updateStringDisplay(time) // update string display
                
        //this conditional will cause the loop to end, otherwise it would go on until the browser window is closed
        if (frames < 10000) { 
            setTimeout(window.requestAnimationFrame, 30, loop)
        }
        //the code above is a form of controled, recursion (a function calling itself from within itself)
        //the set timeout global function allows a delay to be added so that 'loop' is not called until a given wait period
        //30 was choosen because thats a fairly standard refresh rate, and a faster refresh rate will not be distinguishable to the human eye, therefore more code is ran then is needed 
        //try commenting out lines 48-50 and have the recursion work via line 50
        //check the console log to find out how that small wait period of 30ms makes such a big diffrence
        // loop()
    }
    
}
//creates variable that can be used in both time related functions
function getCurrentTime() {

    //a instance of the globally accessible Date object is created to capture the current time according to the computers local time
    const dateObject = new Date(),
    //dateObject will contain all the information we need to extract
    //i will condense the information i need for this program into an new object, this object will the be returned so i can access the current time information in a format that i created
    //the reason for doing this is so that the method calls below only need to occur once per cycle
    //the global Date object does not have a convient way of accessing the month/day-of-week and returning a string, this function handles that for the program 

          //when creating my new 'time' object I wanted the string for the month, and day of the week to be included, this makes it so other functions dont need to do the interpertation,
          //the arrays below only need to be present in this function
          months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
          
          daysOWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //use the Date methods to extract the info this program needs from the current time/date
    let day = dateObject.getDay(),
        date = dateObject.getDate(),
        month = dateObject.getMonth(),
        year = dateObject.getFullYear(),

        hours = dateObject.getHours(),
        minutes = dateObject.getMinutes(),
        seconds = dateObject.getSeconds(),
        milliseconds = dateObject.getMilliseconds();

    //store all the variables created above concisely into an object, create two string properties aswell
    const timeObj = {
        
        dayInt: day, //an int 0-6, 0 being sunday
        dayStr: daysOWeek[day], //a string 'Sunday' - 'Saturday'

        date: date, //the day of the month
        
        monthInt: month, //an into 0-11. 0 being January
        monthStr: months[month], //the month represented as a string (full name)
        
        year: year, //int of the current year

        hr: hours, //hour of the day in 24 hours ie 5pm == 17
        min: minutes, //int 0-60
        sec: seconds, //int 0-60
        ms: milliseconds //int 0-1000

    };

    return timeObj //return the object of current time and date info to the level above

}


//creates a clock display on a canvas element
function updateAnalogDisplay(time) {

    // console.log(time);

    //clear the canvas of the last clock display
    context.save(); //save the current origin,rotation,and posistioning of the canvas element
    context.setTransform(1, 0, 0, 1, 0, 0); //set the origin and scale back to default (top left corner is (0,0) )
    context.clearRect(0, 0, width, height); //clear the whole canvas, just the background color will show
    context.restore(); //restore back to the settings when the save method was called

    //set the stroke color to black 
    context.strokeStyle = 'black';

    //create the clock circle
    context.beginPath() //declare that you want to create a shape or line

    context.arc(width/2, height/2, width/2, 0, Math.PI*2) //creates a circle path

    /* ABOUT THE ARC METHOD
       param 1&2; center of the circle. when using width/2 and height/2 to set x & y, the origin will be set to the center of the canvas 
       
       param 3; radius of the circle/arc, here half the width is being used for the radius,
                 so the circle/arc will extend to the edge of the canvas, 
                 when creating a circle in this manner one should use the whichever dimension is smallest,
                 but in this case they are equal so it does not matter which is used
       
       param 4&5; these two params indicate what angle the arc should start and at which angle the arc should end
                  these angles are taken in radians, to get a full circle one should start at 0 and end at 360deg in radians that is Pi * 2. Order does not matter in this case
    */
    context.stroke()

    //the three lines created below will all follow a similar pattern,
    // the most important part is where the context is rotated, this will detirmine where the line is along the circle

    //HOUR MARKS
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

    //HOUR HAND
    //create line that indicates hour hand

    let hour = time.hr > 12 ? time.hr -12: time.hr

    context.save();

    context.translate(width/2, height/2)
    context.beginPath()
    context.moveTo(0, 0)

    context.rotate(Math.PI/6 * (hour + (time.min/60)))
    
    context.lineTo(0, -width/3)
    context.stroke()

    context.restore();

    //MIN HAND
    //create line that indicates min hand

    context.save();

    context.translate(width/2, height/2)
    context.beginPath()
    context.moveTo(0, 0)

    context.rotate(Math.PI/30 * ((time.min) + time.sec/60))
    
    context.lineTo(0, -width/2 + width/10)
    context.stroke()

    context.restore();

    //SECOND HAND
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

    // console.log(time);
    //these three vars will be strings, when concatonated at the end of this function, a sentence will form
    let hour, minutes, date;

    //SET THE MINUTES STRING
     if (time.min == 0 ) {
        
        minutes = 'exactaly'
    
    } else if (time.min == 15) {

        minutes = 'quarter past'

    } else if (time.min < 30) {

        let secondStr = time.sec == 1 ? '1 second' : time.sec + ' seconds';

        minutes = time.sec != 0 ? `${time.min} minutes and ${secondStr} past` : `exactaly ${time.min} minutes past`

    } else if (time.min == 30) {

        minutes = 'half past'

    } else if (time.min == 45) {

        minutes = 'quarter till'

        time.hr++

        time.date = time.hr == 24 ? time.date+1 : time.date

    } else if (time.min > 30) {

        let secondStr = time.sec == 59 ? '1 second' : (60 - time.sec) + ' seconds';

        minutes = `${60 - time.min} minutes and ${secondStr} till`

        time.hr++

        time.date = time.hr == 24 ? time.date + 1 : time.date
    }

    //SET THE HOUR STRING
    if (time.hr == 24 || time.hr == 0) {
        hour = '12 AM'
    } else if (time.hr < 12) {
        hour = time.hr + ' AM'
    } else if (time.hr == 12) {
        hour = '12 PM'
    } else {
        hour = time.hr - 12 + ' PM'
    }

    //SET THE DATE STRING gives the numbers their proper ordinal sufix
    if (time.date == 1 || time.date.toString().substring(1,2) == '1' && time.date > 11) {
        date = time.date + 'st'
    } else if (time.date == 2 || time.date.toString().substring(1,2) == '2' && time.date > 12) {
        date = time.date + 'nd'
    } else if (time.date == 3 || time.date.toString().substring(1,2) == '3' && time.date > 13) {
        date = time.date + 'rd'
    } else {
        date = time.date + 'th'
    }

    //combined all strings and update the h1 element 
    document.getElementById('timeString').innerText = `It is now ${minutes} ${hour} on the ${date} of ${time.monthStr} in the year ${time.year}`

}
