
window.onload = () => {
    //set event listers 
    const submitReg = document.getElementById('submitReg');

    submitReg.onclick = submitRegistration;

    document.getElementById('p1').onkeyup = passwordCheck;
    document.getElementById('p2').onkeyup = passwordCheck;

}

//xhr post for users
function submitRegistration() {

    const regForm = document.getElementById('regForm'),
          formInfo = {},
          missingInputs = [];

    for (const input of regForm) {
        formInfo[input.name] = input.value
        if (input.value.trim() === '') {
            missingInputs.push(input.name);
        }
    }

    if (missingInputs.length > 0) {
        
        missingMsg = missingInputs.map( key => {
            return `${titleCase(key)} is required`
        }).join('\n\n')

        return alert(missingMsg)
        
    }

    if (formInfo.password !== formInfo.enter_password_Again) {
        return alert('Password inputs must match')
    }

    const 
    endpoint = `${location.origin}/user`,
    jsonBody = JSON.stringify(formInfo),
    requestObj = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'content-type': 'application/json'
        },
        body: jsonBody
    };

    fetch(endpoint, requestObj)
    .then( rs => {return rs.json()})
    .then( res => {
        if (res.validation_error != undefined) { //res.hasOwnProperty('validation_error')
            let errMsg = '';
            res.validation_error.forEach( error => {
                errMsg += `Error With ${titleCase(error.key)}:\n${error.message}\n\n\n`
            })
            alert(errMsg)
        }
    })
}

function passwordCheck() {
    const pass1 = document.getElementById('p1'),
          pass2 = document.getElementById('p2'),
          passMsg = document.getElementById('passmsg');
        
    passMsg.style.display = 'inline';

    if (pass1.value != pass2.value) {
        passMsg.style.color = 'red'
        passMsg.innerText = 'Passwords Do Not Match'
    } else {
        passMsg.style.color = 'green'
        passMsg.innerText = 'Passwords Match'
    }
}

function titleCase(str) {
    return str.substring(0,1).toUpperCase()+str.substring(1, str.length).toLowerCase()
}
