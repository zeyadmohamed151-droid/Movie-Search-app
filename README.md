# Project Title: Movie Search Web
 
 ### Author: Zeyad Mohamed
 
 ## Event:
 BEEST Event
 
 ## How to use the website:
Open the website write the movie's name. and just that it will show the movies with that name.
Also, you can add your favorites movies to make it easier to track them
 <img width="777" height="866" alt="image" src="https://github.com/user-attachments/assets/16aab650-ab87-4e4a-9e46-bf9f6e2d9f35" />

## demo link:
https://zeyadmohamed151-droid.github.io/Movie-Search-app/

## what i learned:
- For the API to get the information I connected the website to the OMDb API which gave me 1000 free respond using the fetch() function in JavaScript.
a request is sent to the API URL with my free API key and the movie name you searched about.
-for the API data I used async/await to wait for the response before displaying the movies.
After getting the response, I converted it into JSON format to display it to the user
- I also checked if no movies were found by using:
if (data.Response === "False")
- I managed different features by separating the code into functions.
For example:
searchMovies() to get the result of the search
displayMovies() i used this one to get the poster of the movie
addToFavorites() i used to add any movie i want to the favirites
- I saved favorites using LocalStorage in the browser.
When the you clicks “Add to Favorites”, the movie will be stored using:
 localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
when you open the website favorites movies are retrieved using:
 JSON.parse(localStorage.getItem("favorites"))
 This feature is important to ensure the favorite movies stay saved even after refreshing the page.

 ## Why I made it:
Just to make it easier to track my favorites movies any time i want to without forgetting their names
also i was kinda bored in in the same time i love watching movies. So, why not it will also help my friend or the movie club in my school
 
 
 ## Here's some cool Features:
 - suggestions to find the movie easier by searching word by word and see all the result that has the same name
 - Saving favorites movies to watch them later
 - has alot of movies that you can add to your library 
 - Used OMDb API to get the information about the movies

## Tech stack:
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
