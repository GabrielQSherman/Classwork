//an arry of three kinds of fruit

var fruit = ["apple", "bannana", "oranges"];

var fruitPrices = [ 2.50, 3.11, 7.22 ];
var fruitQuantity = [5, 7, 3];

//first part is call incrementer, second is condition, iterator
for(var i=0; i < fruit.length; i++){
    console.log("Total",fruit[i],"sales" + ": ", fruitPrices[i] * fruitQuantity[i]);
    
}


//var fruitPrices = [[1.5,2.5,1.75], [2.25,1.45,1.75], [1.25,0.75,0.85]];

