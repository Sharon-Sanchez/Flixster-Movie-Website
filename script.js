// HTML element constants 
const moviesDisplay = document.querySelector("#movie-area");
const searchMovie = document.querySelector("search-area");
const movieForm = document.querySelector("form");

//Constants for API URL creation
let APIkey = '?api_key=2683ad1e390b432952c03f1db25a3d7c';
let BASE_URL = "https://api.themoviedb.org";
let nowPlayingPath = "/3/movie/now_playing";
let searchmovie = "/3/search/movie";



function URLbuild(path){
   const url = BASE_URL+path+ APIkey;
   return url; 
}

async function getMovies(){

    const url = URLbuild(nowPlayingPath);
    const movies = await fetch(url);
    const moviesData = await movies.json();
    const results = moviesData.results;
    console.log(results)
    displayMovies(results); 
    
    
}

movieForm.addEventListener("submit",movieSearch);

async function movieSearch(event) {
    event.preventDefault();
    const movieInput = event.target.movieSearch;
    const moviesInfo = movieInput.value;
    const apiurl= BASE_URL + searchmovie + APIkey + "&query=" + moviesInfo;

    const response = await fetch(apiurl);
    const responseData = await response.json();
    const dataResults = responseData.results;
    console.log(dataResults); 
    search(dataResults);
}

function search(movies) {
    movies.forEach(element => {
        searchMovie.innerHTML +=`

        <div class="display"> 
            <div class="poster"> 
                <img src="https://image.tmdb.org/t/p/w500${element.poster_path} "alt=${movies.title}/>
            </div>
            <div class="movieInfo">
                <h4 style="width: 88%; text-align: center; clear: left;">${element.title}<h4> 
                <h4 style="width: 88%; text-align: center; clear: left;">${element.vote_average}<h4>
            </div>
        </div>
    
        `;

        
    });
    
    
}
//Displays the movie posters, title, and votes
function displayMovies(movies) {
    movies.forEach(element => {
        moviesDisplay.innerHTML +=`

        <div class="display"> 
            <div class="poster"> 
                <img src="https://image.tmdb.org/t/p/w500${element.poster_path} "alt=${movies.title}/>
            </div>
            <div class="movieInfo">
                <h4 style="width: 88%; text-align: center; clear: left;">${element.title}<h4> 
                <h4 style="width: 88%; text-align: center; clear: left;">${element.vote_average}<h4>
            </div>
        </div>
    
        `;

        
    });
    
    
}



//Activates the page 
getMovies(); 

