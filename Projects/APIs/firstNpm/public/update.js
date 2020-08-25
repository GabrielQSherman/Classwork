window.onload = function () {

    const heading = document.createElement('h1')
    const div = document.createElement('div')
    const form = document.createElement('form')
    const userNameUpdate = document.createElement('input')
    const idInput = document.createElement('input')
    const emailUpdate = document.createElement('input')
    const passwordUpdate = document.createElement('input')
    const passwordValidatedUpdate = document.createElement('input')
    const button = document.createElement('button')
    
    heading.innerText = "Update"
    heading.id = 'heading'
    
    div.id = 'mainDiv'
    
    form.id = 'updateForm'
    
    button.id = 'submit'
    button.innerText = 'Submit'
    button.type = 'submit'
    
    idInput.className = 'input'
    idInput.type = 'text'
    idInput.name = 'id'
    idInput.placeholder = 'Enter User\'s Id' 

    userNameUpdate.className = 'input'
    userNameUpdate.type = 'text'
    userNameUpdate.name = 'username'
    userNameUpdate.placeholder = 'Enter Username'
    userNameUpdate.minLength = 3;
    userNameUpdate.maxLength = 33;

    
    emailUpdate.className = 'input'
    emailUpdate.type = 'email'
    emailUpdate.name = 'email'
    emailUpdate.placeholder = 'Enter Email'
    
    passwordUpdate.className = 'input'
    passwordUpdate.type = 'password'
    passwordUpdate.name = 'password'
    passwordUpdate.placeholder = "Enter Password"
    passwordUpdate.minLength = 7;
    
    passwordValidatedUpdate.className = 'input'
    passwordValidatedUpdate.type = 'text'
    passwordValidatedUpdate.name = 'username'
    passwordValidatedUpdate.placeholder = 'Re-Enter Password'
    
    document.body.appendChild(heading)
    document.body.appendChild(div)
    
    div.appendChild(form)
    div.appendChild(button)

    form.appendChild(idInput)
    form.appendChild(userNameUpdate)
    form.appendChild(emailUpdate)
    form.appendChild(passwordUpdate)
    form.appendChild(passwordValidatedUpdate)
    
    button.onclick = submitBtn
    }
    
    function submitBtn() {
    
        const formElm = document.getElementById('updateForm');
        const reqBody = {};
        const userID = formElm.id.value.trim();
        if ( userID == '') {
            return alert('Must provide user ID');
        } else if (userID.length != 24) {
            return alert('Id must be in proper format');
        }
    
        for (const input of formElm) {
            
            const val = input.value.trim();

            if (val != '' && input.name != 'id') { //only add non-empty values and exclude id from the request body
            
                reqBody[input.name] = val
            
            }
        }

        if (Object.keys(reqBody).length == 0) {
            return alert('One input must be filled');
        }

    console.log(Object.keys(reqBody).length);
    
    const endPoint = `${location.origin}/user/update/${formElm.id.value}` 
    
        const xhr = new XMLHttpRequest()
    
        xhr.open('PUT', endPoint)
    
        xhr.onload = () => {
           const res = JSON.parse(xhr.responseText) 
           console.log(res)
        }
    
        xhr.setRequestHeader('Content-Type', 'application/json')
    
        xhr.send(JSON.stringify(reqBody))
    }