let currentPage = 1,

    maxPages;

window.onload = () => {

    let uiDiv = createDivElement({id: 'uiDiv'});

    let usersDiv = createDivElement({id: 'usersDiv'});

    const prevPage = document.createElement('button');
    prevPage.id = 'prevPage';
    prevPage.onclick = prevPageReq;
    prevPage.innerText = 'Previous Page';

    const nextPage = document.createElement('button');
    nextPage.id = 'nextPage';
    nextPage.onclick = nextPageReq;
    nextPage.innerText = 'Next Page';

    uiDiv.appendChild(prevPage);
    uiDiv.appendChild(nextPage);

    document.body.appendChild(uiDiv);
    document.body.appendChild(usersDiv);

    createPostForm()

    requestUsers(currentPage);

}

function prevPageReq() {

    currentPage = currentPage == 1 ? maxPages : currentPage-1;

    requestUsers(currentPage);
    
}

function nextPageReq() {

    currentPage = currentPage == maxPages ? 1 : currentPage+1;

    requestUsers(currentPage);

}

function displayUserPage(usersData) {

    usersDiv.innerHTML = '';

    let pageHeading = createHeading({size: 1, text: `Viewing Page #${currentPage}`});

    usersDiv.appendChild(pageHeading);

    // console.log(usersData);
    for (let i = 0; i < usersData.length; i++) {

            //sub-div
            let div = createDivElement({});

            div.id = usersData[i].id;

            //headings
            let nameHeader = createHeading({size: 3, text: `Name: ${usersData[i].first_name} ${usersData[i].last_name}` });
            let dobHeader = createHeading({size: 4, text: `Date of Birth: ${usersData[i].dob}`});
            let emailHeader = createHeading({size: 5, text: `Email: ${usersData[i].email}`});


            //inputs
            let fNameInput = document.createElement('input');
            fNameInput.placeholder = 'Enter A New First Name';
            fNameInput.name = 'first_name';

            let lNameInput = document.createElement('input');
            lNameInput.placeholder = 'Enter A New Last Name';
            lNameInput.name = 'last_name';

            let dobInput = document.createElement('input');
            dobInput.placeholder = 'Date-of-Birth Y-M-D';
            dobInput.name = 'dob';

            let emailInput = document.createElement('input');
            emailInput.placeholder = 'Enter A New Email';
            emailInput.name = 'email';

            //buttons shown when NOT in edit mode
            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit This User';
            editBtn.onclick = editUser;

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete This User'
            deleteBtn.onclick = deleteUser;

            //buttons shown when in edit mode
            let cancelBtn = document.createElement('button');
            cancelBtn.innerText = 'Cancel Edit';
            cancelBtn.onclick = cancelEdit;

            let confirmBtn = document.createElement('button');
            confirmBtn.innerText = 'Confirm Edit'
            confirmBtn.onclick = confirmEdit;

            //append to subdiv

            let displayDiv = document.createElement('div');
            let editDiv = document.createElement('div');

            div.appendChild(displayDiv);
            div.appendChild(editDiv);

            editDiv.style.display = 'none';

            //what displays when NOT in edit mode
            displayDiv.appendChild(nameHeader);
            displayDiv.appendChild(dobHeader);
            displayDiv.appendChild(emailHeader);
            displayDiv.appendChild(editBtn);
            displayDiv.appendChild(deleteBtn);

            //what displays when in edit mode
            editDiv.innerHTML += 'First Name: ';
            editDiv.appendChild(fNameInput);
            editDiv.innerHTML += '<br>Last Name: ';
            editDiv.appendChild(lNameInput);
            editDiv.innerHTML += '<br>Date of Birth: ';
            editDiv.appendChild(dobInput);
            editDiv.innerHTML += '<br>Email: ';
            editDiv.appendChild(emailInput);
            editDiv.innerHTML += '<br>';
            editDiv.appendChild(cancelBtn);
            editDiv.appendChild(confirmBtn);

            //append subdiv to main div
            usersDiv.appendChild(div);
       
    }

}

function editUser() {

    let editDiv = this.parentElement.parentElement.lastChild;

    editDiv.style.display = 'inline';
    
    //hide/show elements
    this.parentElement.style.display = 'none';
    
}

function deleteUser() {

    let userId = this.parentElement.parentElement.id;

    let confirm = prompt('type CONFIRM');

    if (confirm != null && confirm.toLowerCase() == 'confirm' ) {
        
        this.parentElement.parentElement.remove();

        deleteUserRequest(userId);

    } else {
        alert('The User Was Not Deleted')
    }

}

function cancelEdit() {

    alert('Nothing was edited');

    // console.log(this, this.parentElement,this.parentElement.parentElement);

    let displayDiv = this.parentElement.parentElement.firstChild;
    let editDiv = this.parentElement;

    displayDiv.style.display = 'inline';
    editDiv.style.display = 'none';

    // for (let i = 0; i < singleUserDiv.childNodes.length; i++) {
    //     const divElm = singleUserDiv.childNodes[i];

    //     if (divElm.style.display == 'none') {

    //         divElm.style.display = 'inline'
            
    //     } else {

    //         divElm.style.display = 'none'
            
    //     }
        
    // }
    
    
}

function confirmEdit() {

    // console.log(this, this.parentElement,this.parentElement.parentElement);

    let divChildren = this.parentElement.children,

        userId = this.parentElement.parentElement.id,

        updateReqBody = {};

    //itterate through all the elements in 'editDiv', extract input values into a JS object
    for (const htmlElm of divChildren) {

        if (htmlElm.localName == 'input' && htmlElm.value.trim() != '') { //or .type == 'text'
            
            updateReqBody[htmlElm.name] = htmlElm.value.trim();
            
        }
        
    }

    if (JSON.stringify(updateReqBody) === '{}') {
        // console.log('no inputs filled');
        alert('No input were filled, no were changes made.')
        return
        
    } 

    //stringify the object created from the input elements so it can be used in a XHR
    updateReqBody = JSON.stringify(updateReqBody);

    updateUserRequest(userId, updateReqBody); //call the PATCH request

    //switch back to the display elements showing
    let displayDiv = this.parentElement.parentElement.firstChild;
    let editDiv = this.parentElement;

    displayDiv.style.display = 'inline';
    editDiv.style.display = 'none';
    
}

function createPostForm() {

    let div = document.createElement('div');

    let input1 = document.createElement('input');

        input1.placeholder = 'Enter First Name'; 
        input1.name = 'first_name';
        
    let input2 = document.createElement('input');
    
        input2.placeholder = 'Enter Last Name';
        input2.name = 'last_name';

    let input3 = document.createElement('input');
        
        input3.placeholder = 'Enter Email';
        input3.name = 'email';

    let input4 = document.createElement('input');
        
        input4.placeholder = 'Gender (male/female)'
        input4.name = 'gender';

    let button = document.createElement('button');

    uiDiv.appendChild(div);

    div.appendChild(input1);
    div.appendChild(input2);
    div.appendChild(input3);
    div.appendChild(input4);
    div.appendChild(button);

    button.innerText = 'Make a New User';
    button.onclick = complieNewData;


    //adding default for testing purposes
    // input1.value = 'dadf'
    // input2.value = 'asdf'
    // input3.value = 'email@email.com'
    // input4.value = 'gender'
}

function complieNewData () {


            let divChildren = this.parentElement.children,

            requestBody = {};

        //itterate through all the elements in 'editDiv', extract input values into a JS object
        for (const htmlElm of divChildren) {

            if (htmlElm.localName == 'input' && htmlElm.value.trim() != '') { //or .type == 'text'

                requestBody[htmlElm.name] = htmlElm.value.trim();
                
            }
            
        }

        if ( Object(requestBody).length === 4 ) {
            // console.log('no inputs filled');
            alert('Not enough inputs filled. No User Created')
            return
            
        } 

        // console.log(requestBody.email);

        const e = requestBody.email,

              atRegEx = /@/g,

              dotRegEx = /\.\./,

              numOfAts = e.match(atRegEx).length;
        
        
        //must check there is only one @ symbol, and at least one dot after the @ symbol
        if ( e[0] == '.' || e[e.length-1] == '.' || numOfAts != 1 || dotRegEx.test(e)) {

            //alert them they email is in an incorect format
            alert('Your email input in not a vaild email');

            //return nothing to stop the request

            return
            
        }

        //stringify the object created from the input elements so it can be used in a XHR
        requestBody = JSON.stringify(requestBody);

        console.log('Make Req');
        
        // newUserReq(requestBody); //call the POST request


}