
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    createAvlDsply() {

        // console.log('showing a', movieRental.avlMov);

        let heading = movieRental.createHeadingElm('Movie Selection', 1), //create a heading elm

            avlDiv = document.getElementById('avldiv'), //get access to the avlDiv inside this method (it is not globally defined)

            list = document.createElement('ol'); //create the currently 'blank' ordered list element

            //THIS PREVENTS REPEATING ELEMENTS ON THE DOM
            avlDiv.innerHTML = ''; //clear div of all info, new elements will be inserted at end of this method

            for (let i = 0; i < movieRental.avlMov.length; i++) { //itterate through all the available movies
                
                let listElm = document.createElement('li'); //create a new 'list-item' element for each of the elements in the array

                listElm.innerText = movieRental.avlMov[i]; //set the inner text to the elements value

                list.appendChild(listElm) //append it to the parent list element

                //list-item elements append to the parent 'ol' element one at a time 
                
            }
            //the div should be blank inside because the innerHTML was assigned to = '' (nothing)

            avlDiv.appendChild(heading) //append the heading first

            avlDiv.appendChild(list) //then the list follows

    }, 

    createRntDsply() {

        // console.log('showing r', movieRental.rntMov);

        let heading = movieRental.createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            rntDiv.innerHTML = ''; //clear data in div

            for (let i = 0; i < movieRental.rntMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = movieRental.rntMov[i];

                list.appendChild(listElm)
                
            }

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
    },

    rentRandomMov() { 
        //the purpose of thie method is to only move data from one array to another,
        // this does not do the work of updating the dom, that is for the 'create display' methods

        let arrLength = movieRental.avlMov.length

        if (arrLength == 0) {

            alert('No more movies left')

            return 
            //if there are no movies to rent but the user clicks the button,
            // they should be alerted and the rest of the method discontinued   

        }

        let ranIndex = Math.floor(arrLength * Math.random());

        //an element is being pushed to RENTED Movies to AVAILABLE Movies. 
        //splice is the best method to extract data from an array at a specific index. 
        //splice returns an array so in order to get the data into its pure element form the spread-operator (...) is used
        movieRental.rntMov.push(...movieRental.avlMov.splice(ranIndex,1));

        document.getElementById('avlbtn').innerText = 'Update Info';
        document.getElementById('rntbtn').innerText = 'Update Info';

    },

    createHeadingElm(text, size) {

        let 
        headingSize = 'h' + size,
        head = document.createElement(headingSize);

        head.innerText = text;

        return head

    },

    createInitalElement() {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div'),
              avlBtn = document.createElement('button'),
              rntBtn = document.createElement('button'),
              randomBtn = document.createElement('button');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlBtn.id = 'avlbtn';
        rntBtn.id = 'rntbtn';
        randomBtn.id = 'testbtn';

        avlBtn.innerText = 'See Movie Choices';
        rntBtn.innerText = 'See What Others Are Watching Now';
        randomBtn.innerText = 'testing'

        avlBtn.onclick = movieRental.createAvlDsply;
        rntBtn.onclick = movieRental.createRntDsply;
        randomBtn.onclick = movieRental.rentRandomMov;

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        // avlDiv.style.textAlign = 'center';
        
        document.body.appendChild(avlDiv);
        document.body.appendChild(avlBtn);
        document.body.appendChild(rntDiv);
        document.body.appendChild(rntBtn);
        document.body.appendChild(randomBtn);

    }

}

movieRental.createInitalElement()

movieRental.createAvlDsply()

movieRental.createRntDsply() 