var score;
var avlPoints = [-5, -4, -3, -2, -1, 1, 2, 4, 7, 10];
console.log("Points;");
for(score = 0; score <= 50; score = score + pointsScored ){
    var pointPicker = Math.floor((Math.random() * avlPoints.length));
   var pointsScored = avlPoints[pointPicker];
   console.log("Gabes score is", score +"!");
};


//Looked Up: "for loop js model" , good source used; https://eloquentjavascript.net/04_data.html
/*
[Jaliyah, 0 ],
[Juistin, 0],
[Placido, 0],
[Kelly, 0] ,
[Darius, 0],
[John, 0],
[Gabe, 0],
[Christen , 0]
*/
//Steve Stephen Jaliyah Juistin Kelly Darius John Gabe Christen
