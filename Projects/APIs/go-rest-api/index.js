let currentPage = 1;

window.onload = () => {

    let uiDiv = createDivElement({id: 'uiDiv'});

    let usersDiv = createDivElement({id: 'usersDiv'});

    let prevPage = document.createElement('button');
    prevPage.id = 'prevPage';
    prevPage.onclick = prevPageReq;
    prevPage.innerText = 'Previous Page';

    let nextPage = document.createElement('button');
    nextPage.id = 'nextPage';
    nextPage.onclick = nextPageReq;
    nextPage.innerText = 'Next Page';

    uiDiv.appendChild(prevPage);
    uiDiv.appendChild(nextPage);

    document.body.appendChild(uiDiv);
    document.body.appendChild(usersDiv);

    requestUsers(currentPage);

}

function prevPageReq() {

    currentPage = currentPage == 1 ? 100 : currentPage-1;

    requestUsers(currentPage);
    
}

function nextPageReq() {

    currentPage = currentPage == 100 ? 1 : currentPage+1;

    requestUsers(currentPage);

}

function displayUserPage(usersData) {

    usersDiv.innerHTML = '';

    let pageHeading = createHeading({size: 1, text: `Viewing Page #${currentPage}`});

    usersDiv.appendChild(pageHeading);

    console.log(usersData);
    for (let i = 0; i < usersData.length; i++) {

            let div = createDivElement({});

            div.id = usersData[i].id;

            let nameHeader = createHeading({size: 3, text: `Name: ${usersData[i].first_name} ${usersData[i].last_name}` });
            let dobHeader = createHeading({size: 4, text: `Date of Birth: ${usersData[i].dob}`});
            let emailHeader = createHeading({size: 5, text: `Email: ${usersData[i].email}`});

            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit This User';
            editBtn.onclick = editUser;

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete This User'
            deleteBtn.onclick = deleteUser;

            div.appendChild(nameHeader);
            div.appendChild(dobHeader);
            div.appendChild(emailHeader);
            div.appendChild(editBtn);
            div.appendChild(deleteBtn);

            usersDiv.appendChild(div);
       
    }

}

function editUser() {
    
}

function deleteUser() {

    let userId = this.parentElement.id;

    let confirm = prompt('type CONFIRM');

    if (confirm != null && confirm.toLowerCase() == 'confirm' ) {
        
        this.parentElement.remove();

        deleteUserRequest(userId);

    } else {
        alert('The User Was Not Deleted')
    }

    
    
}