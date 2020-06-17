
window.onload = () => {
    
    const getButtons = document.getElementsByClassName('getMovie');

    for (const button of getButtons) { button.onclick = reqSingleMovieData };

}

function reqSingleMovieData () {

    //VANILLA XHR
    const movieId = this.parentElement.id,

          endpoint = `http://localhost:4000/movie/${movieId}`,

          xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const res = JSON.parse(xhr.responseText);

        console.log(res);
        
    }

    xhr.send()

    //FETCH
    // const movieId = this.parentElement.id,

    //       endpoint = `http://localhost:4000/movie/${movieId}`;

    // fetch(endpoint)
    // .then(rs => {return rs.json()})
    // .then(res => {

    //     console.log(res);
        
    // })

}