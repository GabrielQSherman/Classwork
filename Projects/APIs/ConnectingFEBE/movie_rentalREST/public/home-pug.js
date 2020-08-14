// set event listers for button/s (rent/return)
// set up xhr ('patch') in the 'onclick' event handler 
// -- proper responses to the client (alert, error element/dom element update)

window.onload = () => {

    console.log(document.cookie);
    
    setEventListeners()

    const editDivs = document.getElementsByClassName('editMovie');

        for (const div of editDivs) { div.style.display = 'none'};

    const displayDivs = document.getElementsByClassName('displayMovie');

        for (const div of displayDivs) { div.style.display = 'flex'};

    
    allMovies.style.display = 'flex'; //display will be none while images and elements load

}

function setEventListeners() {

    const getButtons = document.getElementsByClassName('getMovie');

        for (const button of getButtons) { button.onclick = reqSingleMovieData };

    const deleteButtons = document.getElementsByClassName('deleteMovie');

        for (const btn of deleteButtons) { btn.onclick = deleteSingleMovie};

    const editViewButtons = document.getElementsByClassName('editMovieBtn');

        for (const button of editViewButtons) { button.onclick = changeEditView};

    const editSubmitButtons = document.getElementsByClassName('submitEdit');

        for (const button of editSubmitButtons) { button.onclick = submitEditReq};

    const rentButtons = document.getElementsByClassName('rentMovie');

        for (const button of rentButtons) { button.onclick = rentReq};


    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminPage');

    if (loginBtn) {
        
        loginBtn.onclick = loginUser;
    } 

    if (logoutBtn) {

        logoutBtn.onclick = logoutUser;
    } 

    if (adminBtn) {

        adminBtn.onclick = redirectAdmin;
        
    }

 
    
}

function rentReq() {
    const movieId = this.parentElement.id;
    
    const movieTitle = this.parentElement.title;

    const isRenting = this.innerText.includes('Rent');

    const reqBody = {
        movieId: movieId,
        isRenting: isRenting,
    }

    const endpoint = `${location.origin}/user/rent_or_return`, 
          reqObj = {
              method: "PATCH",
              body: JSON.stringify(reqBody),
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  Accept: 'application/json',
                  'content-type': 'application/json'
              }
          };

    fetch(endpoint, reqObj)
    .then( rs => {
        const action = isRenting ? 'Rent' : 'Return';

        if (rs.status == 200) {
            const newText = !isRenting ?  `Rent ${movieTitle}` : `Return ${movieTitle}`;
            this.innerText = newText;
            alert(`You Successfully ${action}ed ${movieTitle}`)
        } else {
            alert(`A Problem Occured Attempting To ${action} ${movieTitle}`)
        }

        return rs.json()
    })
    .then( res => {
        console.log(res);
    })
}

function redirectAdmin() {

    location = location.origin+'/admin'
    
}

function loginUser() {

    location = location.origin+'/login';
}


function logoutUser() {

    const token = document.cookie.indexOf('token')

    if ( token !== -1 ) {
        document.cookie = "token=; expires=`Thu, 01 Jan 1970 00:00:00 UTC`; path=/;";
        alert('Logged Out')
        location.reload();
    } else {
        alert('You are not logged in.')
    }
 
}

function submitEditReq() {
    
    const movieId = this.parentElement.parentElement.parentElement.id;
    const form = this.parentElement;

    let validationErr = [];

    let reqBody = {};

    for (const input of form) {

        let inputValue = input.value.trim();
        
        if (inputValue != '') reqBody[input.name] = inputValue;

        if (input.validationMessage != '') validationErr.push(`${input.name}: ${input.validationMessage}`);

    }

    // if ( !(imdbRegEx.test(form.imdb_link)) ) {
    //      validationErr.push('IMDB Link Provided Did Not Include imdb');
    // }

    if (validationErr.length > 0) {
        const message = `Error/s Occured:\n\n${validationErr.join('\n')}`;
         
        return alert(message);
    }

    //make patch request via fetch api

    const endpoint = `http://localhost:4000/movie/patch/${movieId}`, 
          reqObj = {
              method: "PATCH",
              body: JSON.stringify(reqBody),
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  Accept: 'application/json',
                  'content-type': 'application/json'
              }
          };

    fetch(endpoint, reqObj)
    .then( rs => {
        return rs.json()
    })
    .then( res => {
        console.log(res);

        //check if success
            //if success switch back to orig screen
            
        //alert user of error with message
        
    })

    console.log(reqBody);
    
}

function reqSingleMovieData () {

    //VANILLA XHR
    // const movieId = this.parentElement.id,
    //       endpoint = `http://localhost:4000/movie/${movieId}`,
    //       xhr = new XMLHttpRequest();
    // xhr.open('GET', endpoint, true);
    // xhr.onload = () => {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    // }
    // xhr.send()

    //FETCH
    const movieId = this.parentElement.id,

          endpoint = `${location.origin}/movie/${movieId}`;

    fetch(endpoint)
    .then(rs => {
        console.log(rs);
        
        
        return rs.json()
    })
    .then(res => {

        console.log(res);
        
    })

}

function deleteSingleMovie() {

    //prompt user to prevent accidental deletion
    let confirm = prompt('Type "confirm" to delete document');

    //check if the user typed confirm
    if (confirm != 'confirm') return alert('Document Deletion Canceled');

    const movieId = this.parentElement.parentElement.id,

          endpoint = `${location.origin}/movie/delete/${movieId}`,

          reqObj = {
              method: 'DELETE'
          };

    fetch(endpoint, reqObj)
    .then(rs => {
        
        if (rs.status === 200) { //doc DB deletion success, delete element from FE
            
            this.parentElement.parentElement.remove();

        } else { //alert the user that the req was unsuccessful

            const resMsg = "An error occured trying to deleted movie from DB";

            alert(resMsg)

        }
    
    })

    // const movieId = this.parentElement.id,
    //       endpoint = `${location.origin}/movie/delete/${movieId}`,
    //       xhr = new XMLHttpRequest();
    // xhr.open('DELETE', endpoint, true);
    // xhr.onload = () => {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    // }
    // xhr.send()
    
}

function changeEditView() {
    
    // console.log(this.parentElement.parentElement);
    const movieDivChildren = this.parentElement.parentElement.childNodes;

    movieDivChildren.forEach( node => {

        if (node.className === 'displayMovie' || node.className === 'editMovie') {

            node.style.display = node.style.display == 'none' ? 'flex' : 'none';
            
        }
        
    });

    // console.log(movieDivChildren);
    
    
}