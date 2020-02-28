
//samee principle of searching for an object in an array of objects that matches up with a search object
function where4artArnell(collection, source) {
    let array = collection, searchFor = source, keys = Object.keys(searchFor), values = Object.values(searchFor), found = [];

        array.filter( (testObj) => {
        
            const foundObj = testObj;
 
        for (let i = 0; i < keys.length; i++) {
           
        //this keeps single primitive values ('strings', numbers, and booleans, or even falsly values) in an array of their own
        //this makes it much eaier to compare there values while also searching for multiple values if the property has them

            if ( searchFor[keys[i]] === undefined || searchFor[keys[i]] === null || searchFor[keys[i]].length === undefined || typeof searchFor[keys[i]] === 'string' ) {
                // searchFor[keys[i]] = [searchFor[keys[i]]]; //not neccesary for search to work, but keep all values strictly equal
                values[i] = [values[i]];
            } 

            //does the same for standalone primitive values on the test object
            if ( testObj[keys[i]] === undefined || testObj[keys[i]] === null || testObj[keys[i]].length === undefined || typeof testObj[keys[i]] === 'string' ) {
                testObj[keys[i]] = [testObj[keys[i]]];                       
                
            } 
            
            //iterates through all the possible values in each key. work is the key has one or many values
            for (let j = 0; j < values[i].length; j++) {
     
                //test first if the key exist in the test object, then if the object has the specifily value it is looking for in that key
                if (!testObj.hasOwnProperty(keys[i]) || testObj[keys[i]][j] !== values[i][j]) {
                    //this will end the loop for the object being tested, therefore it is not included
                    return false;

                } else if (i === keys.length - 1 && j == values[i].length - 1) {
                    //the loop returns true when all the properties have been tested and not returned false yet
                    
                    found.push(foundObj);
                    return false
                }        

            } //for loop through values array and interates for each value key/value pair check
            
        } //end of forloop through keys

    });

    console.log(found, "_____________________________", collection);
    return found
};

where4artArnell([{ "apple": [3, 7, 6]}], { "apple": [3, 7, 6]})