//1. 
//This is a single line comment, created with '//' two forward slashes

/* a multi line comment

starts with '/ *' and ends with '* /' (no spaces in between * and /)

 this doesnt need any slashes or indication that it is a comment, it is simply inside a 'comment block'


*/

//2.

/*
one way to declare a variable that will be set at the global scope is using the 'var' keyword
and then the name of your variable following the key word
*/

//name will know be a variable in this code, but it will have a value of 'undefined'
var name;

//3 & 4

//using the assignment operater '=' you can set a value to a variable, so that it is not undefined

//You are able to assign the value when it is initialized or after it has been initialized

var newVar = 3; //this is now an interger variable, but it can be reassined to any value type. 

newVar = 'hello world'; //now myVar is a string and there will be no syntax error
//you can also reasign a variable to another variables value

//5. 
//variable names are case sensitive, therefore a programer must be careful to check not only their spelling of var names but also where their capitalization
// this is why camel case is common practice and should be used by all programers

//6. 
//just like in elementary math the plus sign '+' is used for addition in Javascript. 
// the proper name is the addition opperator and can be used in the following ways
var a = 3;
a = a + 3; //now a is equal to 7

//you can also add vars together
var b = 5;
b = a + b; //now b is equal to 12

//7. 
//just the same as + is the addition opperator, '-' is the subraction opperator. so...

a = 23 - b //a is equal to 11

var c = b - a; //c will be set to equal 1. or whatever a minus b equals at the time 
