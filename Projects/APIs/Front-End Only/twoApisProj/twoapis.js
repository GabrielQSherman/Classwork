//rottweiler


window.onload = () => {

    let mainDiv = createDivElement({id: 'mainContainer'});

    let loadingText = createHeading({size: 1, text: 'Loading Client Information, Pleas Wait...', id: 'loadTxt'});

    mainDiv.appendChild(loadingText)
    document.body.appendChild(mainDiv);
    
    requestDogPictures()

}

function requestDogPictures() {
    

    //xhr

    let count = 0,
        numOfImgs = 10,
        dogPictures = [];

    while (count < numOfImgs) {

        let xhr = new XMLHttpRequest();

        const endpoint = 'https://dog.ceo/api/breed/rottweiler/images/random';

        xhr.open('GET', endpoint, true); 
        
        xhr.send(); 
        
        xhr.onload = () => {

            let rawData = xhr.responseText,
                parsedData = JSON.parse(rawData);

             dogPictures.push(parsedData.message);   
            
            if (dogPictures.length == numOfImgs) {

                requestUserData(dogPictures)          
                
            }
   
        };
        
        count++

    }
    
}

function requestUserData(picsArray) {

    console.log(picsArray);

    let xhr = new XMLHttpRequest(),
        method = 'GET',
        endpoint = 'https://jsonplaceholder.typicode.com/users/';

    xhr.open(method, endpoint, true);

    xhr.send();

    xhr.onload = () => {

        let allUsers = JSON.parse(xhr.responseText),

            mainDiv = document.getElementById('mainContainer');

        mainDiv.innerHTML = '';
        

        for (let i = 0; i < allUsers.length; i++) {

            displayIndUser(allUsers[i], picsArray[i]);
            
        }

        // console.log(allUsers);
        
    };

}


function displayIndUser(userObj, imgUrl) {

    const userImg = createImg({src: imgUrl}),
          userName = createHeading({text: userObj.name, size: 2}),
          userWeb = createHyperLink({hrefLink: `http://${userObj.website}`, text: `${userObj.name}'s Website`, openNewTab: true}),

          div = createDivElement({}),
          mainDiv = document.getElementById('mainContainer');

          mainDiv.appendChild(div);
          div.appendChild(userName);
          div.appendChild(userImg);
          div.appendChild(userWeb);


    
}


//html functions 
//image, heading, hyperlink, div


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