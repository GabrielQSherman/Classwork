 let allPosts; //will become an array with 100 'post' objects when the requestAllPost function is called

    window.onload = () => { 

        requestAllPost()


    //create elements for webpage
        let selectPostNum = document.createElement('select'),
            defOpt = document.createElement('option'),

            postsDiv = document.createElement('div'),
            uiDiv = document.createElement('div');

            postsDiv.id = 'postsDiv';
            uiDiv.id = 'uiDiv';

        //create default option
            defOpt.innerText = 'How many post would you like to view';
            defOpt.value = '';
            selectPostNum.onchange = displayPost;

            selectPostNum.appendChild(defOpt)

        //create options for select element
            for (let i = 10; i < 100; i+=10) {

                let optionElm = document.createElement('option');

                optionElm.innerText = i + ' Posts';
                optionElm.value = i;

                selectPostNum.appendChild(optionElm)
            }

    //append element to DOM

        document.body.appendChild(uiDiv)
        document.body.appendChild(postsDiv)

        uiDiv.appendChild(selectPostNum)

    }

    function displayPost() {

        for (let i = 0; i < this.value; i++) {
            
            createPostDisplay(allPosts[i])
            
        }

        this.value = '';
    }

    function createPostDisplay(post){

        console.log(post);
        

        let div = document.createElement('div'),
            title = document.createElement('h3'),
            body = document.createElement('h4'),
            userId = document.createElement('h5');

        title.innerText = post.title;
        body.innerText = post.body;
        userId.innerText = 'User #' + post.userId;

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(userId)

        postsDiv.appendChild(div)


    }
    
    function compileFormData() {

        let postBody = {}, postIDinput = formId.postid.value.trim();

        if (postIDinput == '' || isNaN(postIDinput) || postIDinput < 1 || postIDinput > 100) {

            alert('You must provide a post ID (a number between 1 and 100)')

            return
            
        }

        for (const input of formId) {

            if (input.type != "button" && input.name != 'postid' && input.value.trim() != '') {

                postBody[input.name] = input.value;
                
            }
            
        }

        let postBodyLen = Object.keys(postBody).length;

        if ( postBodyLen > 0 && postBodyLen < formId.length-2) { //PATCH METHOD

            updateRequest(postBody, 'PATCH', postIDinput)
            
        } else if (postBodyLen == formId.length-2) { //PUT METHOD

            updateRequest(postBody, 'PUT', postIDinput)

        } else { //all inputs were left blank, do not request the API

            alert('At least one input needs to be filled to complete a request')

        }

    }

    function requestAllPost() {

        let xhr = new XMLHttpRequest();

        let endpoint = 'https://jsonplaceholder.typicode.com/posts';

        xhr.open('GET', endpoint, true);

        xhr.onload = () => {

            allPosts = JSON.parse(xhr.responseText);
            

        };

        xhr.send()
        
    }


    function updateRequest(requestBody, method, postId) {

        let xhr = new XMLHttpRequest();

        let endpoint = 'https://jsonplaceholder.typicode.com/posts/' + postId;

        xhr.open(method, endpoint, true);

        xhr.onload = () => {

        };

        xhr.setRequestHeader('Content-Type', 'application/json');

        let jsonBody = JSON.stringify(requestBody);

        xhr.send(jsonBody)

    }
