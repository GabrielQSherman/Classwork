var score = 0
var players = {
    Gabe: [place = 0, gScore = 0],
    Sarah: [place = 0, gSCore = 0],
    Ben: place = 0,
    Hunter: place = 0,
};
var avlPoints = [-5, -4, -3, -2, -1, 1, 2, 4, 7, 10];
while (players.Gabe[0] <= 25) {

    players[Math.round(Math.random())].[1] += avlPoints[Math.floor(Math.random() * avlPoints.length)];
    console.log(score);
        
};
console.log(players.Gabe[0]);
