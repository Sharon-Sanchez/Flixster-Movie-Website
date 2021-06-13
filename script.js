// HTML elements to fill the page 

const moviesDisplay = document.querySelector("#movie-area");
const movieForm = document.querySelector("#search-form");
const showMoreResultsBtn = document.querySelector("#show-more-results-btn")
const movieSearchInput = document.querySelector("#search-input");
const showMoreBtn = document.querySelector("#show-more-btn")
const secondHeader = document.getElementById('now-playing');
const resultsHeader = document.getElementById('search-results');
const resetBtn = document.querySelector("#popcornBtn");


//Constants for API URL creation
//Reminder of url formet: Base url + path + apikey
let APIkey = '2683ad1e390b432952c03f1db25a3d7c';
let nowPlayingPath = "/3/movie/now_playing";
let searchMoviePath = "/3/search/movie";
let currentPage = 1;
var searchTerm = '';

//This function builds the API URL and retrieves the JSON Data from it
async function getMovieApiData(path){
    if (path == searchMoviePath) {
        const movieURL = await fetch(`https://api.themoviedb.org${path}?api_key=${APIkey}&page=${currentPage}&query=${searchTerm}`);
        const movieData = await movieURL.json();
        return movieData.results;
    } 
    else{
        const movieURL = await fetch(`https://api.themoviedb.org${path}?api_key=${APIkey}&page=${currentPage}`); 
        const movieData = await movieURL.json();
        return movieData.results;
    }
    
}

//After it receives the data from the URL, It will display the movie info: poster, name, and vote average.
async function displayMovies(moviePath){
    console.log("Getting Data..");
    let movieArray = await getMovieApiData(moviePath);
    //console.log(movieArray);

    for (let index = 0; index < movieArray.length; index++) {
        console.log(movieArray[index]);
        moviesDisplay.innerHTML +=`

        <div class="display"> 
            <div class="poster"> 
                <img src="https://image.tmdb.org/t/p/w500${movieArray[index].poster_path} "alt=${movieArray[index].title}/>
            </div>
            <div class="movieInfo">
                <h3 style="width: 80%; text-align: center; clear: left;">${movieArray[index].title}<h3> 
                <h3 style="width: 80%; text-align: center; clear: left;">⭐️${movieArray[index].vote_average}<h3>
            </div>
        </div>
        
        `;        
    }
    currentPage ++;

}




//Active Functions that are being displayed on the webpage

//Page the user first sees, the now playing in theaters movies
displayMovies(nowPlayingPath);

async function movieSearch(event){
    event.preventDefault();
    moviesDisplay.innerHTML = '';
    secondHeader.classList.add("hidden");
    resultsHeader.classList.remove("hidden");
    showMoreBtn.classList.add('hiddenBtn');
    showMoreResultsBtn.classList.remove('hiddenBtn');
    searchTerm = movieSearchInput.value;
    await displayMovies(searchMoviePath);
    movieSearchInput.value = '';
    currentPage++;

}
movieForm.addEventListener('submit',movieSearch);

//The user clicks on Show more to see movie options available
async function showMore(event) {
    await displayMovies(nowPlayingPath);
    currentPage ++;
}
showMoreBtn.addEventListener('click',showMore);   


//User clicks the show more results when they are looking for a movie via submit form
async function showMoreResults(event){
    await displayMovies(searchMoviePath);
    currentPage++;
}
showMoreResultsBtn.addEventListener('click',showMoreResults);

async function resetAll(event){
    event.preventDefault();
    moviesDisplay.innerHTML = '';
    currentPage = 1;
    await displayMovies(nowPlayingPath);
    secondHeader.classList.remove("hidden");
    resultsHeader.classList.add("hidden");
    showMoreBtn.classList.remove('hiddenBtn');
    showMoreResultsBtn.classList.add('hiddenBtn');
}
resetBtn.addEventListener("click",resetAll);


