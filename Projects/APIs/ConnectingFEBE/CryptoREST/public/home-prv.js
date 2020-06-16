let nomicsApiKey;

window.onload = () => {

    // https://api.nomics.com/v1

    retrieveKey()

}

function retrieveKey() {
    
    const cryptoEndP = `${location}getapikey`
    
    fetch(cryptoEndP)
    .then(rs => {return rs.json()})
    .then(res => {

        if (res.success) {
            nomicsApiKey = res.key
        } else {
            alert('The server can not supply Nomics API key.')
        }
        
    })

}