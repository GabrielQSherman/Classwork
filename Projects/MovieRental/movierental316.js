
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    //this method will create elements that done require dynamic creation, ie some buttons and divs
    createInitalElement() {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        document.body.appendChild(avlDiv);
        document.body.appendChild(rntDiv);
    },

    createAvlDsply() {

        let heading = createHeadingElm('Movie Selection', 1),
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

        let heading = createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            for (let i = 0; i < this.rntMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = this.rntMov[i];

                list.appendChild(listElm)
                
            }

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
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