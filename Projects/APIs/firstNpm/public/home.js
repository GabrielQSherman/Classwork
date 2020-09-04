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
    usernameInput.minLength = 3;
    usernameInput.maxLength = 33;


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

        reqBody[input.name] = input.value.trim();
        
    }

    let passedValidation = true;

    if (reqBody.username.length > 33 || reqBody.username.length < 3) {
        alert('Username must be within the range of 3-33 characters');
        passedValidation = false;
    }

    if (reqBody.password.length < 7) {
        alert('Password did not meet requirements');
        passedValidation = false;
    }

    if (reqBody.password !== reqBody.password2) {
        alert('Passwords did not match');
        passedValidation = false;
    }

    const email = reqBody.email;
    
    if (
           email.length < 6 
        || email.length > 200 
        || !email.includes('@') //does not account for multipule @ 
        || !email.substring(email.indexOf('@')).includes('.') //does not account for multipule . after the @
    ) {
        alert('Please Enter Valid Email');
        passedValidation = false;
    }

    if (passedValidation) {
        
        const endpoint = location.origin + '/user/register';
    
        // //XHR
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.onload = () => {
            console.log(xhr.responseText);
            const res = JSON.parse(xhr.responseText);
            
            if (xhr.status === 201) {
                alert('Your Account Was Created Successfully')
            } else if (xhr.status === 400 && res.valErrors != undefined) {
                
                //1
                const errMsg = res.valErrors.map( err => {
                    return `Error with ${err.key}: ${err.error}`;
                }).join('\n\n')

                //2
                // let errMsg = '';
                // for (let i = 0; i < res.valErrors.length; i++) {
                //     const err = res.valErrors[i]; 
                //     errMsg += `Error with ${err.key}: ${err.error}\n\n`
                // }

                alert(errMsg)
            } else {
                alert('Unknown Server Error Occured')
            }
        }
    
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(reqBody))

    }

}