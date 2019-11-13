//remember this is just an advance search tool for an array of simple objects (Ctrl + F)
function whatIsInAName(collection, source) {

        var sourceArrayKeys = (Object.keys(source)), sourceArrayValues = (Object.values(source)), foundObjects = [];
        
        for (let i = 0; i < collection.length; i++) {
            let totalTrueProperties = 0;

        for (let j = 0; j < sourceArrayKeys.length; j++) {

            let key = sourceArrayKeys[j], value = sourceArrayValues[j];

            if (collection[i].hasOwnProperty(key) && collection[i][key] == value) {

                totalTrueProperties++;

            }
            if (totalTrueProperties === sourceArrayKeys.length) {

                    foundObjects.push(collection[i]);
            }
            

        } //end of sourcekeys forloop

    } // end of collection forloop

    //display the found objects at the end of the function
    console.log(foundObjects);
    return foundObjects
    
 
} //end of function
  
whatIsInAName([{ "bat": 2 },{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2});


