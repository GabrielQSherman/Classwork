
window.onload = () => {
    //set event listers 
    const submitReg = document.getElementById('submitReg');

    submitReg.onclick = submitRegistration;

}

//xhr post for users
function submitRegistration() {

    const regForm = document.getElementById('regForm'),
          formInfo = {}; 

    for (const input of regForm) {
        formInfo[input.name] = input.value
    }

    if (formInfo.password !== formInfo.passwordRepeat) {
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
        if (res.hasOwnProperty('validation_error')) {
            let errMsg = '';
            res.validation_error.map( error => {
                errMsg += `Error With ${titleCase(error.key)}:\n${error.message}\n\n\n`
            })
            alert(errMsg)
        }
    })

}

function titleCase(str) {
    return str.substring(0,1).toUpperCase()+str.substring(1, str.length).toLowerCase()
}
