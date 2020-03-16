
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    createAvlDsply() {

        console.log('showing a', movieRental.avlMov);

        let heading = movieRental.createHeadingElm('Movie Selection', 1),
            avlDiv = document.getElementById('avldiv'),

            list = document.createElement('ol');

            avlDiv.innerHTML = ''; //clear div because new elements will be inserted

            for (let i = 0; i < movieRental.avlMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = movieRental.avlMov[i];

                list.appendChild(listElm)
                
            }

        avlDiv.appendChild(heading)

        avlDiv.appendChild(list)

    }, 

    createRntDsply() {

        // console.log('showing r', movieRental.rntMov);

        let heading = movieRental.createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            rntDiv.innerHTML = ''; //clear data in div

            for (let i = 0; i < movieRental.rntMov.length; i++) {
                
                let listElm = document.createElement('li');

                listElm.innerText = movieRental.rntMov[i];

                list.appendChild(listElm)
                
            }

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
    },

    rentRandomMov() {

        let arrLength = movieRental.avlMov.length

        if (arrLength == 0) {

            alert('No more movies left')

            return
            
        }

        let ranIndex = Math.floor(arrLength * Math.random());

        movieRental.rntMov.push(...movieRental.avlMov.splice(ranIndex,1));

        document.getElementById('avlbtn').innerText = 'Update Info';
        document.getElementById('rntbtn').innerText = 'Update Info';

        
    },

    createHeadingElm(text, size) {

        let 
        headingSize = 'h' + size,
        head = document.createElement(headingSize);

        head.innerText = text;

        return head

    },

    createInitalElement() {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div'),
              avlBtn = document.createElement('button'),
              rntBtn = document.createElement('button'),
              randomBtn = document.createElement('button');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlBtn.id = 'avlbtn';
        rntBtn.id = 'rntbtn';
        randomBtn.id = 'testbtn';

        avlBtn.innerText = 'See Movie Choices';
        rntBtn.innerText = 'See What Others Are Watching Now';
        randomBtn.innerText = 'testing'

        avlBtn.onclick = movieRental.createAvlDsply;
        rntBtn.onclick = movieRental.createRntDsply;
        randomBtn.onclick = movieRental.rentRandomMov;

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        // avlDiv.style.textAlign = 'center';
        
        document.body.appendChild(avlDiv);
        document.body.appendChild(avlBtn);
        document.body.appendChild(rntDiv);
        document.body.appendChild(rntBtn);
        document.body.appendChild(randomBtn);

    }

}

movieRental.createInitalElement()

movieRental.createAvlDsply()

movieRental.createRntDsply() 