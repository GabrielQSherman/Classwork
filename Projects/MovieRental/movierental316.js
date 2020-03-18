
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    createAvlDsply() {

        console.log(this);
        

        let heading = movieRental.createHeadingElm('Movie Selection', 1), //create a heading elm (SEE createHeadingElm TO FINDOUT HOW MAKING A HEADING CAN BE WRITTEN SO SIMPLY )

            avlDiv = document.getElementById('avldiv'), //get access to the avlDiv inside this method (it is not globally defined)

            list = movieRental.createListElm(false, movieRental.avlMov, 'avlMovList'); //create the currently 'blank' ordered list element

            //THIS PREVENTS REPEATING ELEMENTS ON THE DOM
            avlDiv.innerHTML = ''; //clear div of all info, new elements will be inserted at end of this method

            //the div should be blank inside because the innerHTML was assigned to = '' (nothing)

            avlDiv.appendChild(heading) //append the heading first

            avlDiv.appendChild(list) //then the list follows

    }, 

    createRntDsply() {

        let heading = movieRental.createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            for (let i = 0; i < movieRental.rntMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = movieRental.rntMov[i];

                list.appendChild(listElm)
                
            }

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
    }

}



// movieRental.createParagraphElm( 'hello world', 'avldiv', 'available')
// movieRental.createParagraphElm('hello asdfworld', 'rntdiv', 'rented')
// movieRental.createParagraphElm('hello asdworld', 'asdf')

//if isOrdered is true make an ordered list, otherwise make the list unordered
movieRental.createListElm = (isOrdered, listData, listId) => {

    let list = isOrdered === true ? document.createElement('ol') : document.createElement('ul');

    // if (isOrdered === true) {

    //     console.log('o');
    //     list = document.createElement('ol');
        
    // } else {

    //     console.log('u');
    //     list = document.createElement('ul');

    // }

    if (listId != undefined && document.getElementById(listId) == null) {

        list.id = listId
        
    }


    for (let i = 0; i < listData.length; i++) { //itterate through all the elements in the given array
                
        let listElm = document.createElement('li'); //create a new 'list-item' element for each of the elements in the array

        listElm.innerText = listData[i]; //set the inner text to the elements value

        list.appendChild(listElm); //append it to the parent list element

        //list-item elements append to the parent 'ol' element one at a time 
                
    }

    return list

};

let arr = [1,2,3,4];

movieRental.createListElm(true, movieRental.avlMov, 'test')



//this method will create elements that do not require dynamic creation, ie some buttons and divs
movieRental.createInitalElement = () => {

    console.log('test');
    

    const avlDiv = document.createElement('div'),
          rntDiv = document.createElement('div');

    avlDiv.id = 'avldiv';
    rntDiv.id = 'rntdiv';

    avlDiv.style.backgroundColor = 'pink';
    rntDiv.style.backgroundColor = 'lightgreen';

    document.body.appendChild(avlDiv);
    document.body.appendChild(rntDiv);

};

//extra function made to make workflow declaring a heading element less repetitive
// and only appear as one line in the objects methods
movieRental.createHeadingElm = (text, size, childid) => {

    let headingSize = 'h' + size; //creates a string like 'h1', 'h2', etc.

    let head = document.createElement(headingSize); //pass the string as an argument of createElement so you get the desired heading size

    head.innerText = text;

    if (childid != undefined && document.getElementById(childid) == null) {

        //not only do you want to check if the childid param was passed as an argument, 
        //but also that another element has not taken that id, 
        //remember that an element's id is unique to only element and one element only PER dom
        head.id = childid

    }

    return head 
    //using return varName is very useful. 
    //It allows the complex variable declaration to take place soley inside this method,

};


movieRental.createParagraphElm = (text, parentID, childID) => {

        console.log(parentID, childID);

        //1. 
        let paragraph = document.createElement('p');

        paragraph.innerText = text;

        // if (childID != undefined) {

        //     paragraph.id = childID;

        // } else {

        //      paragraph.id = 'default';

        // }

        paragraph.id = childID != undefined ? childID : 'default';

        console.log(paragraph);
        
        if (document.getElementById(parentID) != null) {

            document.getElementById(parentID).appendChild(paragraph);

        } else {

            document.body.appendChild(paragraph);
        }


};

//METHOD CALLS

movieRental.createInitalElement()

movieRental.createAvlDsply()

movieRental.createRntDsply()


