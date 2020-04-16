
//create the neccessary html elements, 
//do any javascript that needs to be done before the client can interact with the page
window.onload = () => {

    //create div to store all the users in

    let mainUsersDiv = createDivElement({id: 'mainUsersDiv'});

    document.body.appendChild(mainUsersDiv);

    requestAllUsers(getDogPics())

}

function getDogPics() {

    let array = [];
    
    for (let i = 0; i < 10; i++) {

        let xhr = new XMLHttpRequest(),
        method = 'GET',
        endpoint = 'https://dog.ceo/api/breed/rottweiler/images/random';

        xhr.open(method, endpoint);
        xhr.send()
        xhr.onload = () => {

            let imageLink = JSON.parse(xhr.responseText).message;

            array.push(imageLink);
            
        }
    
    }

    return array

}

//calls the jsonplaceholder api and gets all user's info
function requestAllUsers(dogPics) {
    
    setTimeout(() => {
          //set up xhr
    let xhr = new XMLHttpRequest(),
        method = 'GET',
        endpoint = 'https://jsonplaceholder.typicode.com/users/';

    xhr.open(method, endpoint, true);

    xhr.send() //potential informaiton that we want to send with the request

    xhr.onload = () => {

        let allUsers = JSON.parse(xhr.responseText);

        console.log(dogPics);
        

        for (let i = 0; i < dogPics.length; i++) {

            console.log(allUsers[i], dogPics[i]);
            
            
            indUser(allUsers[i], dogPics[i])
            
        }
        
    }


    }, 1000);

  
    // console.log('we\'re done')
}

function indUser(user, dogPic) { //takes an object as a parameter, the object must be from the JSON placeholder api
    
    console.log(dogPic);
    
    let userRealName = createHeading({size: 4, text: user.name }),
        catchPhrase = createHeading({size: 5, text: user.company.catchPhrase}),
        //link
        webLink = createHyperLink({ hrefLink:`http://${user.website}`, text: `${user.name}'s Website` }),
        //image
        imageElm = createImg({src: dogPic}),

        indUserDiv = createDivElement({}),

        mainDiv = document.getElementById('mainUsersDiv');

        webLink.target = '_blank';

        console.log(imageElm);
        
        
        mainDiv.appendChild(indUserDiv);

        indUserDiv.appendChild(userRealName);
        indUserDiv.appendChild(imageElm);
        indUserDiv.appendChild(webLink);
        indUserDiv.appendChild(catchPhrase);

}


function createImg(imageObj) {

    let image = document.createElement('img');

    image.src = imageObj.src != undefined ? imageObj.src : './img.jpeg';

    image.alt = imageObj.alt != undefined ? imageObj.alt : 'Image Could Not Load';

    if (imageObj.id != undefined && document.getElementById(imageObj.id) == null ) {

        image.id = imageObj.id;
        
    }

    if ( imageObj.class != undefined ) {

        image.className = imageObj.class;
        
    }

    return image 
}

function createDivElement(divObject) {

    //class and id

    const div = document.createElement('div');

    if (divObject.id != undefined && document.getElementById(divObject.id) == null) {

        div.id = divObject.id; 
        
    }

    if (divObject.class != undefined ) {

        div.className = divObject.class;
        
    }

    // console.log(div);

    return div
    
}

function createHyperLink(linkObject) {

    //class and id

    const link = document.createElement('a');


    //set my Id in the case that I define that property in my linkObject
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null) {

        link.id = linkObject.id; 
        
    }

    //set my Id in the case that I define that property in my linkObject
    if (linkObject.class != undefined ) {

        link.className = linkObject.class;

    }

    //property name openNewTab

    if ( linkObject.openNewTab === true ) {

        link.target = '_blank';
        
    }

    link.innerText = linkObject.text != undefined ? linkObject.text : 'Untitled Link';

    link.href = linkObject.hrefLink != undefined ? linkObject.hrefLink : 'No Link';

    // console.log(link);

    return link
    
}

function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id
        
    }

    return heading
    
}