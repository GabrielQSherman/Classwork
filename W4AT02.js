function where4artArnell() {
    let array = arguments[0], needs = arguments[1], keys = Object.keys(needs);
   
    
    let result = array.filter( function (obj) {
 
        for (let i = 0; i < keys.length; i++) {

            if (!obj.hasOwnProperty(keys[i]) || obj[keys[i]] !== needs[keys[i]]) {
                return false;

            } else if (i === keys.length - 1) {

                return true;
            }
        }
    })
    console.log(result);
    return result
}

where4artArnell([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 })