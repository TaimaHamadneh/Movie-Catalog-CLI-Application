//index.js

const { displayCatalog, addMovie, updateMovie, deleteMovie, searchMovies, filterMovies, fetchMoviesFromAPI } = require('./movieCatalog');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('\nMovie Catalog:');
  console.log('-----------------\n');
  console.log('1. Display All Movie');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Data');
  console.log('4. Delete Movie');
  console.log('5. Search Movie');
  console.log('6. Filter Movies');
  console.log('7. Fetch Movies from API');
  console.log('8. Exit\n');
  rl.question('Enter your choice: ', handleMenuChoice);
}

function handleMenuChoice(ch) {
  switch (ch) {
    case '1':
      displayCatalog();
      break;
    case '2':
      rl.question('Enter the title: ', (title) => {
        rl.question('Enter the director: ', (director) => {
          rl.question('Enter the release year: ', (releaseYear) => {
            rl.question('Enter the genre: ', (genre) => {
              addMovie(title, director, releaseYear, genre);
              displayMenu();
            });
          });
        });
      });
      break;
    case '3':
      rl.question('Enter the movie title to update it: ', (title) => {
        rl.question('Enter the new title: ', (newTitle) => {
          rl.question('Enter the new director: ', (newDirector) => {
            rl.question('Enter the new release year: ', (newYear) => {
              rl.question('Enter the new genre: ', (newGenre) => {
                updateMovie(title, newTitle, newDirector, newYear, newGenre);
                displayMenu();
              });
            });
          });
        });
      });
      break;
    case '4':
      rl.question('Enter the title of the movie you want to delete:', (title) => {
        deleteMovie(title);
        displayMenu();
      });
      break;
    case '5':
      rl.question('Enter the keyword to search for movies: ', (keyword) => {
        searchMovies(keyword);
        displayMenu();
      });
      break;
    case '6':
      rl.question('Enter the criteria to filter movies: ', (criteria) => {
        filterMovies(criteria);
        displayMenu();
      });
      break;
    case '7':
      fetchMoviesFromAPI();
      displayMenu();
      break;
    case '8':
      rl.close();
      break;
    default:
      console.log('Please enter a valid option. Invalid choice.');
      displayMenu();
      break;
  }
}

displayMenu();
