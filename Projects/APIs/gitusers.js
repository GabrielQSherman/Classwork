
//when the window loads create html elements
window.onload = () => {

    requestAllUsers()



}

function displayAUser(user) {
    
    // console.log(user);

    //create the div to store the users elements

    let div = createDivElement({class: 'userDiv'});

        div.style.backgroundImage = 'url(' +user.avatar_url + ')';

    //heading for the login 

    let heading = createHeading({text: user.login, size: 2});

    //image for the profile pic

    let img = createImg({src: user.avatar_url, alt: `${user.login} Profile Pic`});

    //link to their github

    let link = createHyperLink({hrefLink: user.html_url, text: `${user.login} GitHub Profile`, openNewTab: true});

    //button that shows more info (append more info to their div)

    let button = document.createElement('button');

    button.innerText = `See more info on ${user.login}`;

    button.onclick = displayInfo;

    div.appendChild(heading)
    div.appendChild(img)

    div.appendChild(link)

    div.appendChild(button)

    document.getElementById('allUsers').appendChild(div)

    //append children where needed

}

//make a request for a specific user to get more detailed infomation on their profile/account
function displayInfo() {

    // console.log(this);

    this.style.display = 'none';
    
    let username = this.innerText.replace(/See more info on /, ''),

        usersDiv = this.parentElement;

    console.log(usersDiv);
    
    //make the request 

    let xhr = new XMLHttpRequest(),
        endpoint = `http://api.github.com/users/${username}`;

    xhr.open('GET', endpoint);

    xhr.onload = () => {

        let rawRes = xhr.responseText,
            parsedRes = JSON.parse(rawRes),

            followersHead = createHeading({size: 5, text: `${parsedRes.followers}`});

            usersDiv.appendChild(followersHead);

            console.log(parsedRes);

    
            
    }

    xhr.send()

}

function requestAllUsers () {

       let xhr = new XMLHttpRequest();

        let apiURL = 'https://api.github.com/users', //https://api.github.com/users 'https://jsonplaceholder.typicode.com/users
            reqMethod = 'GET',
            asyncBool = true;

            xhr.open( reqMethod, apiURL, asyncBool) //2)open the channel for the request 

            xhr.onload = () => { //3) a function runs when the response has been recieved from the the server

                let rawResponseData = xhr.responseText;

                let parsedData = JSON.parse(rawResponseData);

                // console.log(parsedData);

                for (let i = 0; i < parsedData.length; i++) {

                    let userInfo = parsedData[i];

                    displayAUser(userInfo)
                }
                

            }  

            xhr.send() //params optional //4) finalizes the 'open' method and sends data along with the request when needed

}

function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');

    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';

    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {

        heading.id = headingObj.id
        
    }

    return heading
    
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

