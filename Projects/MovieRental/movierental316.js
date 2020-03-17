
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    createAvlDsply() {

        let heading = movieRental.createHeadingElm('Movie Selection', 1), //create a heading elm (SEE createHeadingElm TO FINDOUT HOW MAKING A HEADING CAN BE WRITTEN SO SIMPLY )

            avlDiv = document.getElementById('avldiv'), //get access to the avlDiv inside this method (it is not globally defined)

            list = document.createElement('ul'); //create the currently 'blank' ordered list element

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
        
    },

    //this method will create elements that do not require dynamic creation, ie some buttons and divs
    createInitalElement() {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        document.body.appendChild(avlDiv);
        document.body.appendChild(rntDiv);
    },

    //extra function made to make workflow declaring a heading element less repetitive
    // and only appear as one line in the objects methods
    createHeadingElm(text, size, childid) {

        //when creating one of these time saving functions you must consider the methods purpose
        //in this case it makes creating a heading element take only one line (see line 12)

        //parameters are a must because thats what makes these methods time savers and line savers (take up less lines of code, less cluter)
        //in this case we are making the most simple element, a heading

        //we want to pass our text input directly into the innerText property of the heading
        //and to make this method more useful we can also pass the heading-size (1-5) 

        //why is the 'size' param so useful? without it we would need to make 5 seperate methods to achieve the same purpose

        //another extremely useful param you can implement into a method like this one is 'id', think about why this could be so useful?

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

    }, 

    createParagraphElm(text, parentID, childID) {

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


    }

}


//METHOD CALLS
movieRental.createInitalElement()

// movieRental.createAvlDsply()

// movieRental.createRntDsply()

movieRental.createParagraphElm('hello world', 'avldiv', 'available')
movieRental.createParagraphElm('hello asdfworld', 'rntdiv', 'rented')
movieRental.createParagraphElm('hello asdworld', 'asdf')
