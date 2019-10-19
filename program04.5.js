var score = 0;
var avlPoints = [-5, -4, -3, -2, -1, 1, 2, 4, 7, 10];
console.log("Points;");
while(score <= 50){
    score = score + avlPoints[Math.floor((Math.random() * avlPoints.length))];
    console.log("Score; ", score);
}