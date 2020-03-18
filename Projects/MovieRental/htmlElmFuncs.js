function createHeadingElm(text, size, childId) {

        if (parseInt(size) >= 1 && parseInt(size) <= 5) {

            size = parseInt(size); // if a float is given it will still pass the test and be converted to an integer
            
        } else {

            size = 5; //five will be the default if not specified

        }

        let headingSize = 'h' + size; //creates a string like 'h1', 'h2', etc.

        let head = document.createElement(headingSize); //pass the string as an argument of createElement so you get the desired heading size

        head.innerText = text; //text is an arugument of this function that the innerText property will be set to

        if ( childId != undefined && document.getElementById(childId) == null ) {

            //not only do you want to check if the childId param was passed as an argument, 
            //but also that another element has not taken that id, 
            //remember that an element's id is unique to only element and one element only PER dom
            head.id = childId

        } else {
            console.log('no id was set or it was already set to another elemnt');
            
        }

        return head 
        //using return varName is very useful. 
        //It allows the complex variable declaration to take place soley inside this method,

}

function createParagraphElm(text, childId) { 

    let para = document.createElement('p');

    para.innerText = text;

    if (childId != undefined && document.getElementById(childId) == null) {

        para.id = childId
        
    }

    return para


}

function createHyperLinkElm( link, text, childId) {

    let hyperL = document.createElement('a');

    hyperL.href = link;

    if (text == undefined) {

        hyperL.innerText = '';
        
    } else {
        hyperL.innerText = text;
    }

    if (childId != undefined && document.getElementById(childId) == null) {

        hyperL.id = childId
   
    }

    return hyperL

}





    // let heading1 = createHeadingElm('This is a heading in h3', 3);

    // let heading2 = createHeadingElm('This heading will default to h5');
    
    // let heading3 = createHeadingElm('So will this one but for a diffrent reason', 'asdf', 'heading3');

    let hyperLink1 = createHyperLinkElm('http://careerdevs.com/', 'CareerDevs', 'cdweblink');

    console.log(hyperLink1);

    document.body.appendChild(hyperLink1);
     

    // document.body.appendChild(heading1)
    // document.body.appendChild(heading2)
    // document.body.appendChild(heading3)

