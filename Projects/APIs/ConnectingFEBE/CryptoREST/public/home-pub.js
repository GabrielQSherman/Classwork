window.onload = () => {

    //start the log in div as hidden
    log_in_div.style.display = 'none';
    //function allows a button on DOM to switch two divs from being hidden to shown, only one showing at a time
    switch_form.onclick = switchFormView
}

function switchFormView() {

    const logInDiv = log_in_div.style.display; 
    
    if (logInDiv == 'none') {

        log_in_div.style.display = 'inline';
        sign_up_div.style.display = 'none';
    } else {

        log_in_div.style.display = 'none';
        sign_up_div.style.display = 'inline';
    }
}