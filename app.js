
const fs = require('fs');
const fetch = require('isomorphic-fetch');

const catalogFile = 'movies.json';
let movieCatalog = [];

function loadCatalog() {
  try {
    const data = fs.readFileSync(catalogFile, 'utf8');
    movieCatalog = JSON.parse(data);
  } catch (error) {
    console.error('Error happened while loading movie catalog:', error);
  }
}

function saveCatalog() {
  try {
    fs.writeFileSync(catalogFile, JSON.stringify(movieCatalog, null, 2));
    console.log('Movie catalog saved successfully.');
  } catch (error) {
    console.error('Error happened while saving the movie catalog: ', error);
  }
}

function displayCatalog() {
  loadCatalog();
  console.log('\nMovie Catalog: \n');
  movieCatalog.forEach((movie) => {
    console.log('Title: ', movie.title);
    console.log('Director :', movie.director);
    console.log('Genre:', movie.genre);
    console.log('Release Year:', movie.releaseYear);
    console.log('-------------------');
  });
  saveCatalog();
}

function addMovie(title, director, releaseYear, genre) {
  loadCatalog();
  const newMovie = {
    title,
    director,
    releaseYear,
    genre
  };
  movieCatalog.push(newMovie);
  saveCatalog();
  console.log('The movie added successfully.');
}

async function updateMovie(title, newTitle, newDirector, newYear, newGenre) {
  try {
    loadCatalog();
    const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
    if (movieIndex !== -1) {
      movieCatalog[movieIndex].title = newTitle;
      movieCatalog[movieIndex].director = newDirector;
      movieCatalog[movieIndex].releaseYear = newYear;
      movieCatalog[movieIndex].genre = newGenre;
      await saveCatalog();
      console.log('Movie details updated successfully.');
    } else {
      console.log('Movie not found in the catalog.');
    }
  } catch (error) {
    console.log('Error occurred while updating movie details:', error.message);
  }
}


async function deleteMovie(title) {
  try {
    loadCatalog();
    const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
    if (movieIndex !== -1) {
      movieCatalog.splice(movieIndex, 1);
      await saveCatalog();
      console.log('Movie deleted successfully.');
    } else {
      console.log('Movie does not exist in the catalog.');
    }
  } catch (error) {
    console.log('An error was encountered during the deletion of the movie:', error.message);
  }
}


function searchMovies(keyword) {
  loadCatalog();
  const matchingMovies = movieCatalog.filter(
    (movie) =>
      movie.title.includes(keyword) ||
      movie.director.includes(keyword) ||
      movie.genre.includes(keyword)
  );
  if (matchingMovies.length > 0) {
    console.log(`Search results for "${keyword}":\n`);
    matchingMovies.forEach((movie) => {
      console.log('Title:', movie.title);
      console.log('Director:', movie.director);
      console.log('Genre:', movie.genre);
      console.log('Release Year:', movie.releaseYear);
      console.log('-------------------');
    });
  } else {
    console.log(`No matching movies were found "${keyword}".`);
  }
}

function filterMovies(criteria) {
  loadCatalog();
  const filteredMovies = movieCatalog.filter((movie) => movie.genre.toLowerCase() === criteria.toLowerCase() || movie.releaseYear === criteria);
  if (filteredMovies.length > 0) {
    console.log(`Filtered movies by "${criteria}":\n`);
    filteredMovies.forEach((movie) => {
      console.log('Title:', movie.title);
      console.log('Director:', movie.director);
      console.log('Genre:', movie.genre);
      console.log('Year:', movie.releaseYear);
      console.log('-------------------');
    });
  } else {
    console.log(`No movies were found for the"${criteria}".`);
  }
}
function fetchMoviesFromAPI() {
    const apiUrl = 'https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies?fbclid=IwAR2GxSq6zYcsRqBW12TQ6kpivOVbLQgStMC_Xx9RRK8JM5KszSaMH9RSIUE';
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        loadCatalog();
        movieCatalog = movieCatalog.concat(data);
        saveCatalog();
        console.log('The movies were successfully retrieved from the API and added to the catalog.');
      })
      .catch((error) => {
        console.error('An error occurred while fetching movies from the API: ', error);
      });
  }
  
  

module.exports = {
  displayCatalog,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMovies,
  fetchMoviesFromAPI
};
