const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

const API_KEY = "";

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