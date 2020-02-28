var availbleRooms = ["101","102","103","104","105","106"],
    bookedRooms = [];

console.log("Bookings");
console.log("\n----------------");


function roombooking(name, rooms) {
    if (rooms <= availbleRooms.length) {
        console.log("Hello "+ name, "welcome to the JS hotel. We have the availibity for your order!");
        bookedRooms = bookedRooms.concat([[name, availbleRooms.splice(0, rooms)]]);

    } else if (rooms > availbleRooms.length) {
        console.log("Hello "+ name, "welcome to the JS hotel. We unfortunately do not have the availibity for your order! Currently we have " +  availbleRooms,"that we are booking for you.");
        bookedRooms = bookedRooms.concat([[name, availbleRooms.splice(0, rooms)]]);
    }
}
roombooking("John", 2);
roombooking("Jake", 2);
roombooking("Arneezy", 3);
console.log("\nReturns\n-----------------");

function roomreturns(returnName) {
    for (let i = 0; i < bookedRooms.length; i++) {
        if (returnName == bookedRooms[i][0] && bookedRooms[i][1].length == 1) {
            console.log("Hello", returnName, "thank you for returning room", bookedRooms[i][1] + ". Please come again soon!");
            availbleRooms = availbleRooms.concat(bookedRooms[i][1]);
            bookedRooms.splice(i,1);
            
        } else if (returnName == bookedRooms[i][0] && bookedRooms[i][1].length == 2) {
            console.log("Hello", returnName, "thank you for returning rooms", bookedRooms[i][1].join(" and ") + ". Please come again soon!");
            availbleRooms = availbleRooms.concat(bookedRooms[i][1]);
            bookedRooms.splice(i,1);

        } else if (returnName == bookedRooms[i][0] && bookedRooms[i][1].length >= 3) {
            console.log("Hello", returnName, "thank you for returning rooms", bookedRooms[i][1].join(" , ") + ". Please come again soon!");
            availbleRooms = availbleRooms.concat(bookedRooms[i][1]);
            bookedRooms.splice(i,1);

        }
    }
    
}

// roomreturns("John");
// roomreturns("Jake");
// roomreturns("Arneezy")

console.log(bookedRooms);
console.log(availbleRooms);
