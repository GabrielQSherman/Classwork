let allPost;

let deletedList = [];

let viewingUser = 1;

window.onload = () => {


    let uiDiv = createDivElement({id: 'uiDiv'});

    let postsDiv = createDivElement({id: 'postsDiv'});

    let prevUser = document.createElement('button');
    prevUser.id = 'prevUser';
    prevUser.onclick = prevUserPosts;
    prevUser.innerText = 'See Previous User\'s Posts';

    let nextUser = document.createElement('button');
    nextUser.id = 'nextUser';
    nextUser.onclick = nextUserPosts;
    nextUser.innerText = 'See Next User\'s Posts';


    uiDiv.appendChild(formId)
    uiDiv.appendChild(prevUser)
    uiDiv.appendChild(nextUser)


    document.body.appendChild(uiDiv);
    document.body.appendChild(postsDiv);

    getAllPost()

}

function prevUserPosts() {

    viewingUser = viewingUser == 1 ? 10 : viewingUser-1;

    // console.log(viewingUser);

    displayPost()
}

function nextUserPosts() {

    if (viewingUser < 10) {

        viewingUser++
    } else {
        viewingUser = 1;
    }

    // console.log(viewingUser);

    displayPost()
    
}

function getAllPost() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText)

        allPost = parsedData;
        // console.log(parsedData);

        displayPost()
        
    };

    xhr.send()
    
}

function displayPost() {

    postsDiv.innerHTML = '';

    // let startingIndex = ((viewingUser-1) * 10);
    // console.log(allPost[startingIndex]);

    let userNameHeading = createHeading({size: 1, text: `Currently Viewing User #${viewingUser}'s Posts`});

    postsDiv.appendChild(userNameHeading);

    for (let i = 0; i < allPost.length; i++) {
        
        // console.log(allPost[i].userId);

        console.log(deletedList, allPost[i].id);
        
        
        if (allPost[i].userId === viewingUser && !deletedList.includes(allPost[i].id.toString())) {

            //display that user's info in a div

            let div = createDivElement({});

            div.id = allPost[i].id;

            let titleHeader = createHeading({size: 3, text: allPost[i].title});

            let bodyHeader = createHeading({size: 5, text: allPost[i].body});

            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit This Post';
            editBtn.onclick = editPost;

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete This Post'
            deleteBtn.onclick = deletePost;


            div.appendChild(titleHeader);

            div.appendChild(bodyHeader);

            div.appendChild(editBtn);

            div.appendChild(deleteBtn);

            postsDiv.appendChild(div);
            
        }
    }
    
}

function editPost() {
    
}

function deletePost() {

    let postId = this.parentElement.id,

        endpoint = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    deletedList.push(postId); 

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', endpoint, true);

    xhr.onload = () => {
        
        let parsedData = JSON.parse(xhr.responseText);

        console.log(parsedData);
        
    }

    xhr.send()

    postsDiv.removeChild(this.parentElement);


}