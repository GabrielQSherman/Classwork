//remember this is just an advance search tool for an array of simple objects (Ctrl + F)
function whatIsInAName(collection, source) {

//This part goes through every object in our array they we will be searching in
   for (let i = 0; i < collection.length; i++) {

       //this variable is for every object key we want to seach for
        var sourceArrayKeys = (Object.keys(source));

        //this is for every object key value we want to search for
        var sourceArrayValues = (Object.values(source));
        
        //this will see if the object in the array has the one of the keys we want
        for (let j = 0; j < sourceArrayKeys.length; j++) {
        if (Object.keys(collection[i]).includes(sourceArrayKeys[j])) {
            if (Object.keys(collection[i]).includes(sourceArrayValues[j])) {
                console.log(collection[i]);
                
            }
        }

        }

   }
 
}
  
whatIsInAName([{ "bat": 2 },{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2});


