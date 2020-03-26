movieRental = {

    avlMov: ['The Dark Knight', 'Back To The Future II', 'Kill Bill I', 'John Wick 2', 'Get Out'],

    rntMov: ['The Matrix', 'Kill Bill II', 'Avengers: Endgame', 'Joker', 'Saving Private Ryan'],

    displayAvailable() {

        let heading = movieRental.createHeading('Available Movies', 3);

        let list = movieRental.createList(movieRental.avlMov, '');

        console.log(list);

        document.body.appendChild(heading);

        document.body.appendChild(list);
        

    },

    displayRented() {

        let heading = movieRental.createHeading('Rented Movies', 3);

        let list = movieRental.createList(movieRental.rntMov, '');

        console.log(list);

        document.body.appendChild(heading);

        document.body.appendChild(list);
        

    }

}


movieRental.createHeading = (text, size) => {

    let headingSize = (size <= 5 && size >= 1) ? 'h' + size : 'h1' ;

    let heading = document.createElement(headingSize);

    heading.innerText = text;

    return heading    
}

movieRental.createList = (listArr, listType) => {

    let list = listType === 'ol' || listType === 'ul' ? document.createElement(listType) : document.createElement('ol');

     for (let i = 0; i < listArr.length; i++) {
            
            let listItem = document.createElement('li');

            listItem.innerText = listArr[i];

            list.appendChild(listItem);
     }

     return list

}

movieRental.createLink = (url, linkText) => {

    let link = document.createElement('a');

    link.href = url;

    link.innerText = linkText;

    return link

}

movieRental.createImage = (src, altText, width, height) => {

    let image = document.createElement('img');

    image.src = src;

    image.alt = altText;

    image.width = width;

    image.height = height;

    return image
}



movieRental.displayAvailable()


movieRental.displayRented()

let testLink = movieRental.createLink('http://google.com', 'click for google' )

document.body.appendChild(testLink)

let testImg = movieRental.createImage('https://apod.nasa.gov/apod/image/2003/AntiCrepRays_Goff_3072.jpg', 'AntiCrepRays', 1000, 500)

document.body.appendChild(testImg)