function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  const stringLastLetter = str.substring(str.length-target.length);

  if(stringLastLetter === target) {
      return true
  } else {
      return false
  }
}

confirmEnding("Bastian", "n");
