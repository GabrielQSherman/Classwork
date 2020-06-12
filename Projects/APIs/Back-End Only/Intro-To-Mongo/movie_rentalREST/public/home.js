window.onload = () => {

    devStart()
    
}
function devStart() {

    const xhr = new XMLHttpRequest(),
    
    endpoint = `${location}movie/all`;
      
    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText);
        //display data to DOM with function
        console.log(response);
        createInitalElements()

    xhr.send()

    console.log("Thank you API for allowing me to not write html code!\n");
}
function displayMovies(allMovies) {
    
    for (let i = 0; i < allMovies.length; i++) {
        
        const movieData = allMovies[i];
        
        const title = document.createElement('h1');

        const release = document.createElement('h3');

        const movieImg = document.createElement('img');

        title.innerText = movieData.title;
        release.innerText = movieData.release;

        movieImg.src = movieData.img;
        movieImg.alt = movieData.title + 'IMG';

        document.body.appendChild(title)
        document.body.appendChild(release)
        document.body.appendChild(movieImg)

    }
}



function createInitalElements (){
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
    avlBtn.onclick = createAvlDsply;
    rntBtn.onclick = createRntDsply;
    randomBtn.onclick = rentRandomMov;
    avlDiv.style.backgroundColor = 'pink';
    rntDiv.style.backgroundColor = 'lightgreen';
    avlDiv.style.textAlign = 'center';
    document.body.appendChild(avlDiv);
    document.body.appendChild(avlBtn);
    document.body.appendChild(rntDiv);
    document.body.appendChild(rntBtn);
    document.body.appendChild(randomBtn);
    }
    displayMovies(response.movies)
}