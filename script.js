// HTML element constants 
const moviesDisplay = document.querySelector("#movie-area");

//Constants for API URL
APIkey = "2683ad1e390b432952c03f1db25a3d7c";

//Function that acquires data from API 
async function getMovies(){
    const apiURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + APIkey;
    const movies = await fetch(apiURL);
    const moviesData = await movies.json();
    const results = moviesData.results;
    results.forEach(element => displayMovies(element)); 
}


function displayMovies(movies) {
    console.log(movies)
    moviesDisplay.innerHTML+=`<img src="https://image.tmdb.org/t/p/w500${movies.poster_path} "alt=${movies.title}/>;`;
}



//Activates the page 
getMovies();