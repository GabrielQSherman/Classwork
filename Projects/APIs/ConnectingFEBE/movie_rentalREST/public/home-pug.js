
window.onload = () => {
    
    const getButtons = document.getElementsByClassName('getMovie');

    for (const button of getButtons) { button.onclick = reqSingleMovieData };

    const deleteButtons = document.getElementsByClassName('deleteMovie');

    for (const btn of deleteButtons) { btn.onclick = deleteSingleMovie};
    

}

function reqSingleMovieData () {

    //VANILLA XHR
    // const movieId = this.parentElement.id,
    //       endpoint = `http://localhost:4000/movie/${movieId}`,
    //       xhr = new XMLHttpRequest();
    // xhr.open('GET', endpoint, true);
    // xhr.onload = () => {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    // }
    // xhr.send()

    //FETCH
    const movieId = this.parentElement.id,

          endpoint = `${location.origin}/movie/${movieId}`;

    fetch(endpoint)
    .then(rs => {return rs.json()})
    .then(res => {

        console.log(res);
        
    })

}

function deleteSingleMovie() {

    const movieId = this.parentElement.id,

          endpoint = `${location.origin}/movie/delete/${movieId}`,

          reqObj = {
              method: 'DELETE'
          };

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(res => {
        
    })

    // const movieId = this.parentElement.id,
    //       endpoint = `${location.origin}/movie/delete/${movieId}`,
    //       xhr = new XMLHttpRequest();
    // xhr.open('DELETE', endpoint, true);
    // xhr.onload = () => {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    // }
    // xhr.send()
    
}