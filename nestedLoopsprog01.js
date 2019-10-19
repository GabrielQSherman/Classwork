//create a program where names are taken from an arry and randomly placed within a nested arry, then given values points based on their position in the arry

var names = ["Issac", "Dane", "Mack", "Kenna", "Nick", "Jack", "Robert", "Steve", "Matilda"];
var arry = [[],[],[],[],[],[],[],[],[]]

/*
for(g=0;g<names.length;g++){
   var varnames = names[g];
};
*/
for(i = 0; i < names.length;i++){
    console.log(arry[i]);
    arry[i] = names[i] 
    
   
    
};
console.log(arry);