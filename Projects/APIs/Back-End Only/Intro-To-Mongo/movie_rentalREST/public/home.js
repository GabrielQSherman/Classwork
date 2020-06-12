window.onload = () => {

    const xhr = new XMLHttpRequest(),
          endpoint = `${location}movie/all`;

          
    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText);


        //display data to DOM with function
        console.log(response);
        displayMovies(response.movies)
        
    }
    
    xhr.send()

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