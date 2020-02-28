var readline = require('readline');
var rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

var arr1 = [7,6,4,45,234,73,84,56,356,36,324,1,2,3,4,5,6,7,8,9,0],
    arr2 = [];

function move(){
    rl.question("hello, what would you like to do\n", (q1) => {
        console.log(`okay you would like to ${q1}? im not sure we can do that for you`);

       
            console.log("our availble numbers are...");
            for (let i = 0; i < arr1.length; i++){
                console.log((i+1)+ ".  " + arr1[i]);
            }
            console.log("we could move a number of your choice if you would like a particular number");
            rl.question("now please enter your desired number\n", (q2) => {
            for (let i = 0; i < arr1.length; i++) {
                if (i == q2){
                    arr2 = arr2.concat(arr1.splice(i+1,1))
                    console.log(arr2);
                    move();

                } else if (arr1.length < 1) {
                    console.log("there are no more numbers thanks for moving my stuff around");
                    rl.close();
                } else {
                    move();
                }
            }
        })
    })
  
};
move();
