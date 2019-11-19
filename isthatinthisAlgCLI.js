var readline = require('readline');
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.question("First you will enter a string, then you will enter a test string\n", (string1) => {
    var strTest1 = string1.trim().toLowerCase().split(" ");
    rl.question(`Now enter a second string to and we will test to see if its characters are in '${string1}'\n`, (string2) => {
       var strTest2 = string2.trim()
            test = 0;
        let result = strTest1.filter(word => {
            
            if (word === strTest2) {
               return true
            } else {
                return false 
            }
            
        });
        console.log('your found words were', result);
        

        rl.close();
        
    }) //quesition 2

}) //question 1