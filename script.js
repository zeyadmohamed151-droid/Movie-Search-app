const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const suggestionsBox = document.getElementById("suggestionsBox");
const showFavoritesBtn = document.getElementById("showFavorites");
const showAllBtn = document.getElementById("showAll");

const API_KEY = "7dc0ec8c";

let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
let lastMovies = [];

searchBtn.addEventListener("click", function () {
  const movieName = searchInput.value.trim();

  if (movieName === "") {
    alert("Please enter a movie name");
    return;
  }

  searchMovies(movieName);
});

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// adding this suggestions while typing to make it easier
searchInput.addEventListener("input", async function () {
  const searchText = searchInput.value.trim();

  if (searchText.length < 2) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`
  );

  const data = await response.json();

  suggestionsBox.innerHTML = "";

  if (data.Response === "False") {
    return;
  }

  data.Search.slice(0, 5).forEach(function (movie) {
    const suggestion = document.createElement("div");

    suggestion.classList.add("suggestion-item");

    suggestion.innerHTML = `${movie.Title} (${movie.Year})`;

    suggestion.addEventListener("click", function () {
      searchInput.value = movie.Title;
      suggestionsBox.innerHTML = "";
      searchMovies(movie.Title);
    });

    suggestionsBox.appendChild(suggestion);
  });
});


showFavoritesBtn.addEventListener("click", function () {
  displayMovies(favoriteMovies);
});

showAllBtn.addEventListener("click", function () {
  displayMovies(lastMovies);
});

async function searchMovies(movie) {
  moviesContainer.innerHTML = `<h2 class="loading">Loading...</h2>`;

  let response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
  );

  let data = await response.json();

  if (data.Response === "False") {
    const words = movie.split(" ");

    while (words.length > 1) {
      words.pop();

      const fallbackQuery = words.join(" ");

      response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${fallbackQuery}`
      );

      data = await response.json();

      if (data.Response !== "False") {
        break;
      }
    }
  }

  moviesContainer.innerHTML = "";

  if (data.Response === "False") {
    moviesContainer.innerHTML = `
      <h2 class="loading">No movies found</h2>
    `;
    return;
  }

  lastMovies = data.Search;

  displayMovies(data.Search);
}


function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    moviesContainer.innerHTML = `
      <h2 class="loading">No favorite movies yet</h2>
    `;
    return;
  }

  movies.forEach(function (movie) {
    const movieCard = document.createElement("div");

    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="Movie Poster">

      <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>

        <button class="favorite-btn">
          Add to Favorites
        </button>
      </div>
    `;

    const favoriteBtn = movieCard.querySelector(".favorite-btn");

    favoriteBtn.addEventListener("click", function () {
      addToFavorites(movie);
    });

    moviesContainer.appendChild(movieCard);
  });
}



function addToFavorites(movie) {
  const exists = favoriteMovies.some(function (favMovie) {
    return favMovie.imdbID === movie.imdbID;
  });

  if (exists) {
    alert("Movie already added");
    return;
  }

  favoriteMovies.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favoriteMovies));

  alert("Movie added to favorites");
}