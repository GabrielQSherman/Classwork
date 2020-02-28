function titleCase(str) {
  let stringArray = str.split(' ');

  console.log(stringArray);

  for (let i = 0; i < stringArray.length; i++) {
      
    stringArray[i] = stringArray[i].substring(0,1).toUpperCase() + stringArray[i].substring(1);

  }
  let finalword =stringArray.join(" ");
  console.log(finalword);
  
return finalword
    
}

titleCase("i'm a little tea pot");
