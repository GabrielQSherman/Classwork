window.onload = () => {

    submitUpdate.onclick = updateMovieReq;

    submitNew.onclick = newMovieReq;
}

function newMovieReq() {
    
    //complie submition from form
    let reqBody = {};

    //loop through thr form element
    
    for (const input of newMovieForm) {
        
        reqBody[input.name] = input.value;

    }

    reqBody.inventory = {available: reqBody.available, rented: 0};
    
    // returns
    //make xhr 
    const endpoint = `${location.origin}/movie/post`,

    reqObj = {

        headers: {
                    
            'Access-Control-Allow-Origin': '*',
             Accept: 'application/json',
            'content-type':'application/json'
        
        },

        method: 'POST',

        body: JSON.stringify(reqBody)
    }

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log(response);
        
    })

}

function updateMovieReq() {

    //validate the id provided
    if (idInput.value.trim() === '' || idInput.value.trim().length != 24) return alert('A valid Id must be provided');

    //set endpoint
    const endpoint = location.origin + '/movie/patch/' + idInput.value,
          reqBody = {};

    for (const input of updateMovieForm) {

        const temp = input.value.trim();

        if (temp != '' && input.name != 'id') {

            reqBody[input.name] = temp;
        } 
            
    }

    const reqObj = {

        headers: {
                    
            'Access-Control-Allow-Origin': '*',
             Accept: 'application/json',
            'content-type':'application/json'
        
        },

        method: 'PATCH',

        body: JSON.stringify(reqBody)

    };

    fetch( endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(res => {
        console.log(res);
        
    })
    .catch( err => {
        
    })
}