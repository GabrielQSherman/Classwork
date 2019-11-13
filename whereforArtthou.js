//remember this is just an advance search tool for an array of simple objects (Ctrl + F)
function whatIsInAName(collection, source) {

        //this variable is for every object key we want to seach for
        var sourceArrayKeys = (Object.keys(source));

        //this is for every object key value we want to search for
        var sourceArrayValues = (Object.values(source));

        //this is the variable for storing all the objects in our array that meet the criteria of 'source'
        var foundObjects = [];

        //This part goes through every object in our array they we will be searching in
        for (let i = 0; i < collection.length; i++) {
            let totalTrueProperties = 0;
        // console.log(collection[i][sourceArrayKeys[0]]);


        //this will check for each property name of 'source' if the object in the array has the one of the keys we want
        for (let j = 0; j < sourceArrayKeys.length; j++) {

            //these will be changing variable for each key/value pair that we want to make sure the objects in our collection has
            let key = sourceArrayKeys[j], value = sourceArrayValues[j];

            // console.log(key, value, collection[i][key]);
            
            //this checks if both the property is in our object and if the value matches up
            if (collection[i].hasOwnProperty(key) && collection[i][key] == value) {

                //if it is true than we know one of the properites is a match\\
                // but it must also go through more than one property if our 'source' has more than one key/value pair
                totalTrueProperties++;

                // console.log(collection[i], totalTrueProperties);
                
                
            }
            //this will check every time a new property has been confirmed true, 
            //this conditional will only come true if the amount of true properties is equal to all the properites we are searching for
            if (totalTrueProperties === sourceArrayKeys.length) {

                //when true, that object from the 'collection' is added to our final array
                    foundObjects.push(collection[i]);
            }
            

        } //end of sourcekeys forloop

    } // end of collection forloop

    //display the found objects at the end of the function
    console.log(foundObjects);
    return foundObjects
    
 
} //end of function
  
whatIsInAName([{ "bat": 2 },{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2});


