window.onload = () => {
    //create a form
    
    //1) create 'blank' element
    
    const mainDiv = document.createElement('div');
    const heading = document.createElement('h1');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passInput = document.createElement('input');
    const submitBtn = document.createElement('button');
    
    //2) set properties and event listeners
    //add id property for each element, className for the inputs
    //set event listener for the submit button, log 'Submiting...', 
    //log the form/childElements one by one
    form.id = 'form'

    heading.innerText = 'Login';
    heading.id = 'heading';
    
    emailInput.placeholder = 'Enter Email';
    emailInput.type = 'email';
    emailInput.class = 'input';
    emailInput.name = 'email';
    passInput.placeholder = 'Enter Password'
    passInput.type = 'password';
    passInput.class = 'input';
    passInput.name = 'password';
    

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
    form.appendChild(passInput);

}

function submitReg() {
    
    const formElm = document.getElementById('form');

    const reqBody = {};

    for (const input of formElm) {

        reqBody[input.name] = input.value;
        
    }

    const endpoint = location.origin + '/user/login';

    // //XHR
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', endpoint);
    xhr.onload = () => {
        console.log(xhr.responseText);
        const res = JSON.parse(xhr.responseText);
        console.log(res);
    }

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(reqBody))

}