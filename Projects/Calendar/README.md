4/6/2020

first day working on calendar navigation project

the goal is to create a user-interface that allows a user to select a date easily and quickly
no dates should be left out, and no dates should be 'impossible' dates ie 'Feb. 29th 2019'

The first goal is to create buttons(controls the date being displayed) and a heading element(displays the date) on an html page using pure JS

[*] created functions that will create heading/button elements and append them to the dom
    utilized these functions to set up a user interface quickly

[*] create a function that will set up the user interface with one function call

[*] create the onclick function that will be called by each button, using the 'this' keyword the program can acess the element that called the function, then using the id property, the currentDate object will change accordingly 

4/9/2020

create v2 of calendar 

In this version a client can select a date via select elements. 
The user must first click the button that reads 'select a date' 
this will trigger a sequence of select elements. the user will pick a date by choose first the year, then month, then a day can be selected from the available days in that month, for example 29 will not be an option in feb in the year 2019 but if the year selected is a leap year than it will be an option. 
the fist two select elements are created once the button is pressed, and their display is set to none.
the once a select element needs to be used its display is set to in-line, then back to none when a selection is made.
the day select element is not created until the month is selected, this is the only element that will not be used again because its elements are dependent on the month selected
when the day selection has been made the date choosen will appear as a heading element above the select elements/button.
the button to start the cycle will reappear and the cycle can be continued as many times as desired

This project shows an easy way and space saving way to get a date selection from a client efficiently

4/13/2020

create v3 of calendar

This version will be a built out traditional calendar display. when the page loads the current month year and date are displayed up top. below is a display of the traditional calendar display. The dates are days appropriately placed on the day of the week they occur. The last days of the previous month and a small portion of the next month are displayed too but can not be interacted with

The next month and previous month buttons are implemented and working. I will create a way to navigate the years next. The plan to navigate day selection is by clicking on the box for that day, a plan/event form will appear when a box is selected and this will allow notes, events, etc to be stored on particular dates

I would like to implement a marking system so one can so marks on a given day to indicate things like bdays, holidays, ect

4/14/2020

add a special css styling for todays date. also instead of displaying the date up top when today's date is selected, it simply reads 'Today'

I added a footer div that allows the user to create events on any day that is selected. The button in this div will prompt the user to input the details of the event. If there is no event on the selected day a heading element will inform the client they should make an event for today. If there are events created on a selected date they should show in the footer div