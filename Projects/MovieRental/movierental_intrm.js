
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    

    createAvlDsply() {

        let heading = this.createHeadingElm('Movie Selection', 1),
            avlDiv = document.getElementById('avldiv'),

            list = document.createElement('ol');

            for (let i = 0; i < this.avlMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = this.avlMov[i];

                list.appendChild(listElm)
                
            }

        avlDiv.appendChild(heading)

        avlDiv.appendChild(list)

    }, 

    createRntDsply() {

        let heading = this.createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            for (let i = 0; i < this.rntMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = this.rntMov[i];

                list.appendChild(listElm)
                
            }

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
    },

    //this method will create elements that done require dynamic creation, ie some buttons and divs
    createInitalElement() {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div'),
              avlBtn = document.createElement('button'),
              rntBtn = document.createElement('button');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlBtn.id = 'avlbtn';
        rntBtn.id = 'rntbtn';

        avlBtn.innerText = 'See Movie Choices';
        rntBtn.innerText = 'See What Others Are Watching Now';

        avlBtn.onclick = movieRental.createAvlDsply;
        rntBtn.onclick = movieRental.createRntDsply;

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        // avlDiv.style.textAlign = 'center';

        document.body.appendChild(avlDiv);
        document.body.appendChild(avlBtn);
        document.body.appendChild(rntDiv);
        document.body.appendChild(rntBtn);
    },

    //extra function made to make workflow declaring a heading element less repetitive and only appear as one line in the objects methods
    createHeadingElm(text, size) {

        let 
        headingSize = 'h' + size,
        head = document.createElement(headingSize);

        head.innerText = text;

        return head

    }

}

movieRental.createInitalElement()

movieRental.createAvlDsply()

movieRental.createRntDsply()


//extra function made to make workflow declaring a heading element less repetitive and only appear as one line in the objects methods
function createHeadingElm(text, size) {

    let 
    headingSize = 'h' + size,
    head = document.createElement(headingSize);

    head.innerText = text;

    return head

}