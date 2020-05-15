const goRestKey = '0DFH5_VaeIULaMvKIzTYywXwblC062V-hQfl';

// requestUsers(2)

function requestUsers(pageNum) {
    
    let xhr = new XMLHttpRequest(),

        endpoint = `https://gorest.co.in/public-api/users?page=${pageNum}`;

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response._meta.pageCount);
        
        maxPages = response._meta.pageCount;

        let allUsers = response.result;

        displayUserPage(allUsers)
        
    };

    xhr.setRequestHeader('Authorization', `Bearer ${goRestKey}`);

    xhr.send();

}

function deleteUserRequest(userId) {

    let xhr = new XMLHttpRequest(),

    endpoint = `https://gorest.co.in/public-api/users/${userId}`;

    xhr.open('DELETE', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);
        
    };

    xhr.setRequestHeader('Authorization', `Bearer ${goRestKey}`);

    xhr.send();
    
} 

function updateUserRequest(userId, body) {

    let xhr = new XMLHttpRequest(),

        endpoint = `https://gorest.co.in/public-api/users/${userId}`;

    xhr.open('PATCH', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${goRestKey}`);

    xhr.send(body);

}

function newUserReq(body) {

    let xhr = new XMLHttpRequest(),

        endpoint = `https://gorest.co.in/public-api/users`;

    xhr.open('POST', endpoint, true);

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText);

        console.log(response);
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${goRestKey}`);

    xhr.send(body);
    
}