var hotel = {
    key: 'Value',
    availableRooms: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    bookedRooms: [],
    bookRoom: function () {
        this.bookedRooms.push(this.availableRooms.pop());
   
    },
    returnRoom: function () {
        this.availableRooms.push(this.bookedRooms.pop());
        
    },
    displayRoom: function () {
        this.bookedRooms.sort();
        this.availableRooms.sort();
        console.log("Available Room:", this.availableRooms);
        console.log("Booked Room:", this.bookedRooms);
    }
};

hotel.bookRoom();//103
hotel.bookRoom();//102
hotel.returnRoom();//102 return last room rented
hotel.displayRoom();
