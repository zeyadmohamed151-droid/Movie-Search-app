const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

const API_KEY = "7dc0ec8c";

searchBtn.addEventListener("click", function () {
  const movieName = searchInput.value;

  if (movieName === "") {
    alert("Please enter a movie name");
    return;
  }

  searchMovies(movieName);
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

      if (data.Response !== "False") break;
    }
  }

   moviesContainer.innerHTML = "";

  if (data.Response === "False") {
    moviesContainer.innerHTML = "<h2 class='loading'>No movies found</h2>";
    return;
  }

  lastMovies = data.Search;

  displayMovies(data.Search);
}&s=${movie}`
  );

  const data = await response.json();

  moviesContainer.innerHTML = "";

  if (data.Response === "False") {
    moviesContainer.innerHTML = "<h2>No movies found</h2>";
    return;
  }

  data.Search.forEach(function (movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="Movie Poster">

      <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}
