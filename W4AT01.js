function where4artArnell() {
    let array = arguments[0], mustHave = arguments[1], keys = Object.keys(mustHave);
    
    let found = array.filter( function (object) {
 
        for (let i = 0; i < keys.length; i++) {

            if (!object.hasOwnProperty(keys[i]) || object[keys[i]] !== mustHave[keys[i]]) {
                return false;

            } else if (i === keys.length - 1) {

                return true;
            }
        }
    })

    console.log(found);
    return found

}

where4artArnell([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 })