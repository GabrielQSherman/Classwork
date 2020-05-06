 

    window.onload = () => {

        //request all post -> array of 100 post object

        //itterate through the first 10-20 elements of the array,
        // create a display with each object's info (store each object info in div)
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
