//remember this is just an advance search tool for an array of simple objects (Ctrl + F)
function whatIsInAName(collection, source) {

//This part goes through every object in our array they we will be searching in
   for (let i = 0; i < collection.length; i++) {

       //this variable is for every object key we want to seach for
        var sourceArray = (Object.keys(source));

        //this is for every object key value we want to search for
        
        //this will see if the object in the array has the one of the keys we want
        for (let j = 0; j < sourceArray.length; j++) {
        if (Object.keys(collection[i]).includes(sourceArray[j])) {
           


            
            
        }

        }
        

        
        

   }
       // Only change code above this line
    // console.log(arr);
    
    return arr;
  }



  
whatIsInAName([{ "bat": 2 },{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1});


