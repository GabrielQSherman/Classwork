
const apiKey = "enter your own"; //get a key from https://gorest.co.in/

window.onload = () => {
  initalizePage();
  
}


function initalizePage () {
  //create Elements
  const postDiv = document.createElement("div");
  const getDiv = document.createElement("div");
  const displayDiv = document.createElement("div");
  
  const getUserInputBox = document.createElement("input");
  const getUserButton = document.createElement("button");
  
  //inserting element properties/data

  postDiv.id = "postDiv";
  getDiv.id = "getDiv";
  displayDiv.id = "displayDiv";

  getUserInputBox.className = "text-input";
  getUserInputBox.placeholder = "Enter a user's ID";
  getUserInputBox.type = "number";
  getUserInputBox.min = 1;
  getUserInputBox.max = 2000;

  getUserButton.className = "buttons";
  getUserButton.innerText = "Get User Data";
  getUserButton.onclick = getUserRequest;

  //append to the DOM
  document.body.appendChild(postDiv);
  document.body.appendChild(getDiv);
  document.body.appendChild(displayDiv);
  
  getDiv.appendChild(getUserInputBox);
  getDiv.appendChild(getUserButton);

  createPostForm(postDiv);

}

function createPostForm(div) {
  
  const nameInputBox = document.createElement("input");
  const emailInputBox = document.createElement("input");
  const postUserButton = document.createElement("button");
  
  //name
  nameInputBox.className = "text-input";
  nameInputBox.placeholder = "Enter a name";
  nameInputBox.name = "name";
  nameInputBox.type = "text";

  //email
  emailInputBox.className = "text-input";
  emailInputBox.placeholder = "Enter a email";
  emailInputBox.name = "email";
  emailInputBox.type = "text";

  postUserButton.className = "buttons";
  postUserButton.innerText = "Post New User";
  postUserButton.onclick = postUserRequest;

  div.appendChild(nameInputBox)
  div.appendChild(emailInputBox)
  div.appendChild(postUserButton)

}

function postUserRequest () {
  const children = this.parentElement.children;

  let userData = {
    active: true,
    gender: "Female"
  };

  for (const element of children)
    if (element.type === "text")
      userData[element.name] = element.value;

  console.log(userData);
  const endpoint = "https://gorest.co.in/public-api/users/";
  const xhr = new XMLHttpRequest();

  xhr.open("POST", endpoint);

  //add headers
  xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);

  xhr.onload = () => {
      const rawRes = xhr.responseText;
      const parsedData = JSON.parse(rawRes);
      console.log(parsedData);
  }

  xhr.send(JSON.stringify(userData));
}

function getUserRequest () {

  //get the user input data
  const children = this.parentElement.children;

  let userID;
  let minID;
  let maxID;

  for (const element of children)
    if (element.type === "number") {
      userID = element.value;
      minID = element.min;
      maxID = element.max;
    }
      
  console.log(userID);

  if (userID === "")
    return alert("Invalid ID Entered");
  else if (userID < minID || userID > maxID)
    return alert(`User ID must be between ${minID} & ${maxID}`)

  const endpoint = "https://gorest.co.in/public-api/users/" + userID;
  const xhr = new XMLHttpRequest();

  xhr.open("GET", endpoint);

  xhr.onload = () => {
      const rawRes = xhr.responseText;
      const parsedData = JSON.parse(rawRes);
      console.log(parsedData);
  }

  xhr.send();

}