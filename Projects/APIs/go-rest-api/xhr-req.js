const goRestKey = '0DFH5_VaeIULaMvKIzTYywXwblC062V-hQfl';

// requestUsers(2)

function requestUsers(pageNum) {
    
    let xhr = new XMLHttpRequest(),

        endpoint = `https://gorest.co.in/public-api/users?access-token=${goRestKey}&page=${pageNum}`;

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        let allUsers = response.result;

        displayUserPage(allUsers)
        
    };

    xhr.send();

}

function deleteUserRequest(userId) {

    let xhr = new XMLHttpRequest(),

    endpoint = `https://gorest.co.in/public-api/users/${userId}?access-token=${goRestKey}`;

    xhr.open('DELETE', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);
        
    };

    xhr.send();
    
} 


function updateUserRequest(userId) {

    let firstname = prompt('First name', 'example first');
    let lastname = prompt('Last name', 'example last');

    const body = JSON.stringify({
        first_name: firstname,
        last_name: lastname
    });

    let xhr = new XMLHttpRequest(),

        endpoint = `https://gorest.co.in/public-api/users/${userId}?access-token=${goRestKey}`;

    xhr.open('PATCH', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);
    };

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);

}