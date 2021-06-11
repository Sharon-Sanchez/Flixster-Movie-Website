// HTML element constants 
const moviesDisplay = document.querySelector("#movie-area");


//Constants for API URL creation
let APIkey = '?api_key=2683ad1e390b432952c03f1db25a3d7c';
let BASE_URL = "https://api.themoviedb.org";
let nowPlayingPath = "/3/movie/now_playing";

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

//Displays the movie posters
function displayMovies(movies) {
    movies.forEach(element => {
        moviesDisplay.innerHTML +=`

        <div id="poster"> 
            <img src="https://image.tmdb.org/t/p/w500${element.poster_path} "alt=${movies.title}/>;
        </div>
        <div id="movieInfo">
            <h4 id>${element.title}<h4> 
            <h4 id>${element.vote_average}<h4>
            
        </div>
    
        `;

        
    });
    
    
}



//Activates the page 
getMovies(); 

