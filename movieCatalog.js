// movieCatalog.js

const fs = require('fs');
const fetch = require('isomorphic-fetch');

const catalogFile = 'movies.json';
let movieCatalog = [];

function loadCatalog() {
  try {
    const data = fs.readFileSync(catalogFile, 'utf8');
    movieCatalog = JSON.parse(data);
  } catch (error) {
    console.error('Error loading movie catalog:', error);
  }
}

function saveCatalog() {
  try {
    fs.writeFileSync(catalogFile, JSON.stringify(movieCatalog, null, 2));
    console.log('Movie catalog saved successfully.');
  } catch (error) {
    console.error('Error saving movie catalog:', error);
  }
}

function displayCatalog() {
  loadCatalog();
  console.log('\nMovie Catalog\n');
  movieCatalog.forEach((movie) => {
    console.log('Title:', movie.title);
    console.log('Director:', movie.director);
    console.log('Genre:', movie.genre);
    console.log('Year:', movie.releaseYear);
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
  console.log('New movie added successfully.');
}

function updateMovie(title, newTitle, newDirector, newYear, newGenre) {
  loadCatalog();
  const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
  if (movieIndex !== -1) {
    movieCatalog[movieIndex].title = newTitle;
    movieCatalog[movieIndex].director = newDirector;
    movieCatalog[movieIndex].releaseYear = newYear;
    movieCatalog[movieIndex].genre = newGenre;
    saveCatalog();
    console.log('Movie details updated successfully.');
  } else {
    console.log('Movie not found in the catalog.');
  }
}

function deleteMovie(title) {
  loadCatalog();
  const movieIndex = movieCatalog.findIndex((movie) => movie.title === title);
  if (movieIndex !== -1) {
    movieCatalog.splice(movieIndex, 1);
    saveCatalog();
    console.log('Movie deleted successfully.');
  } else {
    console.log('Movie not found in the catalog.');
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
      console.log('Year:', movie.releaseYear);
      console.log('-------------------');
    });
  } else {
    console.log(`No movies found matching "${keyword}".`);
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
    console.log(`No movies found for "${criteria}".`);
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
        console.log('Movies fetched from API and added to the catalog successfully.');
      })
      .catch((error) => {
        console.error('Error fetching movies from API:', error);
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
