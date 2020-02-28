
var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),


hotel = {
    availableRooms: [1,2,3],
    bookedRooms: [ ],
    bookARoom: function () {


        
    },
    returnARoom: function () {


        
    },
    displayRoom: function name(params) {
        console.log(this.bookedRooms, this.availableRooms);
        
    }

};


hotel_menu();

function hotel_menu() {
    rl.question('1.Book A Room\n2.Return A Room\n3.Display\n4.Exit\n\nInput:', (input) => {
        switch (input) {
            case '1':

            break;
            case '2':

            break;
            case '3':
                hotel.displayRoom();
            break;
            case '4':
                console.log('goodbye');
                rl.close()
            break;
            default: 
                console.log('this input is not an option\n try again...');
                hotel_menu();
                
        }
    });
    
}
rl.question('')