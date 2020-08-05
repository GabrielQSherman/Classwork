window.onload = () => {
    //create a form
    
    //1) create 'blank' element
    
    const mainDiv = document.createElement('div');
    const heading = document.createElement('h1');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const usernameInput = document.createElement('input');
    const passInput = document.createElement('input');
    const passConfirmInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    
    //2) set properties and event listeners
    //add id property for each element, className for the inputs
    //set event listener for the submit button, log 'Submiting...', 
    //log the form/childElements one by one
    form.id = 'form'

    heading.innerText = 'Register Today!!';
    heading.id = 'heading';
    
    emailInput.placeholder = 'Enter Email';
    emailInput.type = 'email';
    emailInput.class = 'input';
    emailInput.name = 'email';

    usernameInput.placeholder = 'Enter Username';
    usernameInput.class = 'input';
    usernameInput.name = 'username';

    passInput.placeholder = 'Enter Password'
    passInput.type = 'password';
    passInput.class = 'input';
    passInput.name = 'password';
    
    passConfirmInput.placeholder = 'Enter Password Again';
    passConfirmInput.type = 'password';
    passConfirmInput.class = 'input';
    passConfirmInput.name = 'password2';

    submitBtn.innerText = 'Register';
    submitBtn.id = 'submitbtn';
    // submitBtn.onclick = 
    submitBtn.onclick = submitReg;

    //3) append to the DOM
    document.body.appendChild(mainDiv);
    mainDiv.appendChild(heading);
    mainDiv.appendChild(form);
    mainDiv.appendChild(submitBtn);
    form.appendChild(emailInput);
    form.appendChild(usernameInput);
    form.appendChild(passInput);
    form.appendChild(passConfirmInput);

}

function submitReg() {
    
    const formElm = document.getElementById('form');

    const reqBody = {};

    for (const input of formElm) {

        reqBody[input.name] = input.value;
        
    }

    const endpoint = location.origin + '/user/post/new';

    // //XHR
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/user/post/new');
    xhr.onload = () => {
        console.log(xhr.responseText);
        const res = JSON.parse(xhr.responseText);
        console.log(res);
    }

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(reqBody))

}