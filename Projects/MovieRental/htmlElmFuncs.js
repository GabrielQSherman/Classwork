function createHeadingElm(text, size, headId) {

        if (parseInt(size) >= 1 && parseInt(size) <= 5) {

            size = parseInt(size); // if a float is given it will still pass the test and be converted to an integer
            
        } else {

            size = 5; //five will be the default if not specified

        }

        let headingSize = 'h' + size; //creates a string like 'h1', 'h2', etc.

        let head = document.createElement(headingSize); //pass the string as an argument of createElement so you get the desired heading size

        head.innerText = text; //text is an arugument of this function that the innerText property will be set to

        if ( headId != undefined && document.getElementById(headId) == null ) {

            //not only do you want to check if the Id param was passed as an argument, 
            //but also that another element has not taken that id, 
            //remember that an element's id is unique to only element and one element only PER dom
            head.id = headId

        } else {
            console.log('no id was set or it was already set to another elemnt');
            
        }

        return head 
        //using return varName is very useful. 
        //It allows the complex variable declaration to take place soley inside this method,

}

function createParagraphElm(text, paraId) { 

    let para = document.createElement('p');

    para.innerText = text;

    if (paraId != undefined && document.getElementById(paraId) == null) {

        para.id = paraId
        
    }

    return para


}

function createHyperLinkElm( link, text, HyperLinkId) {

    let hyperL = document.createElement('a');

    hyperL.href = link;

    if (text == undefined) {

        hyperL.innerText = '';
        
    } else {
        hyperL.innerText = text;
    }

    if (HyperLinkId != undefined && document.getElementById(HyperLinkId) == null) {

        hyperL.id = HyperLinkId
   
    }

    return hyperL

}


function createImageElement (imageSrc, imageAlt, ImageId) {

    let image = document.createElement('img');

    image.src = imageSrc;

    image.alt = imageAlt;

    if (ImageId != undefined && document.getElementById(ImageId) == null) {

        list.id = ImageId
        
    }

    return image
}

function createListElement() {

    let list = isOrdered === true ? document.createElement('ol') : document.createElement('ul');


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
    
}





    let heading1 = createHeadingElm('This is a heading in h3', 3);

    let heading2 = createHeadingElm('This heading will default to h5');
    
    let heading3 = createHeadingElm('So will this one but for a diffrent reason', 'asdf', 'heading3');

    let hyperLink1 = createHyperLinkElm('http://careerdevs.com/', 'CareerDevs', 'cdweblink');

    let image1 = createImageElement('https://cdn.drawception.com/images/panels/2012/6-27/qH3LsRsxgg-2.png', 'ternary operator chart')



    // console.log(hyperLink1);

    document.body.appendChild(hyperLink1);
     

    document.body.appendChild(heading1)
    document.body.appendChild(heading2)
    document.body.appendChild(heading3)

    document.body.appendChild(image1)

