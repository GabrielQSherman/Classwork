

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

    heading.innerText = 'Register Today!!';
    
    emailInput.placeholder = 'Enter Email';
    emailInput.type = 'email';
    
    usernameInput.placeholder = 'Enter Username';
    
    passInput.placeholder = 'Enter Password'
    passInput.type = 'password';
    
    passConfirmInput.placeholder = 'Enter Password Again';
    passConfirmInput.type = 'password';

    submitBtn.innerText = 'Register'

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