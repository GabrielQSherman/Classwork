//List of Classmates
    var cM8 =[
    ["Jaliyah",0],
    ["Juistin",0],
    ["Placido",0],
    ["Kelly",0],
    ["Darius",0],
    ["John",0],
    ["Gabe",0],
    ["Christen", 0],
    ["Steve", 0],
    ["Stephen", 0],
   ];

//Points to select from
var avlP = [-5, -4, -3, -2, -1, 1, 2, 4, 7, 17];

//declare the max points
var topS = 0;
//set max points for game in while statment
while(topS < 1000){
  var player = Math.floor(Math.random() * cM8.length);
  var topS = cM8[player][1] += avlP[Math.floor(Math.random() * avlP.length)];
 // shows scores being added in realtime/ console.log(topS);
 
 /* for(i = 0; i < cM8.length; i++){
   longString = "";
  longString = longString + (cM8[i][1]); 
 }
 console.log(longString);
*/ 

//makes the winners score exactly 1000
while (cM8[player][1] > 1000){
  cM8[player][1]--;
}
//
}
//log all players
console.log("All classmates and their scores;", ...cM8);
//log winner
console.log("The Winner is", cM8[player][0]);

//randomly select player give them random score
//make random output for classmate
//make random output for points 
//assign that point for an arry