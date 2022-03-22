
# ITVDB - GA Project 2 - 48 Hours

This website was created for General Assembly's project two by [Mayur Kumar](https://github.com/Kumasta) and I. We were given 48 hours to build a website using React and a third party public API.

![Imgur](https://i.imgur.com/poH04Kn.png)

 
## Demo

The site was deployed using Netlify and is available [here](https://amazing-jang-baa1ea.netlify.app).

## Features
* A favorite system that uses local storage to remember your top shows.
* Search bar that also filters by genre.
* A showcase page for each show for more detailed show information.
* Home page that displays 10 random images whenever visited.
## Technologies
* React
* Axios
* Bootstrap
* SCSS
* Yarn
* react-router-dom
* [TVMAZE](https://www.tvmaze.com/api) api
## Process

We searched the web looking for a clean easy to use api, one that would be rich with data and reliable. [TVMAZE](https://www.tvmaze.com/api) fits the bill, with hundreds of TV shows listed and is updated regularly.



### Wireframe

we used [excalidraw](https://excalidraw.com) to design roughly what we wanted our main pages layouts and show cards to look like.
![Imgur](https://i.imgur.com/vaNUgbC.png)

### Search Page
![Search Page](https://i.imgur.com/6QXCYFX.png)


#### Genres
I wanted users to be able to search shows by specific genres. Our api did not provide a list of all available genres for me to use, so I needed to create one. The data returned from every show included an array of genres for that show. Looping through all the shows, I collecte the genres available and remove duplicates.
```javascript
let genresList = []
const genresFilterdList = []

// creates one array that includes every genre from each show
shows.forEach((item) => {
   genresList = [...genresList, ...item.genres]
})

// removes all duplicate genres
genresList.forEach((item) => {
   genresFilterdList.indexOf(item) === -1 &&
       genresFilterdList.push(item)
})
setGenres(genresFilterdList.sort())
```
#### Search Bar
Based on both user input and genre dropdown menu, users can filter their search results by show name. Their search will go through every available title if no genre was picked. If a genre is picked, search results from the input will only include shows from the genre picked.
```javascript
const list = []
shows.forEach((show) =>
   !genreSelected
   ? show.name.toLowerCase().includes(inputText.toLowerCase()) &&
       list.push(show)
   : show.genres.some((genre) => genre === genreSelected) &&
       show.name.toLowerCase().includes(inputText.toLowerCase()) &&
       list.push(show)
)
setFilteredList(list)
```



### Favorites System

I wanted to create a page where a user can view only the shows they favorited.
![Imgur](https://i.imgur.com/ftuT9ch.png)
Id's of shows are added and removed from an favorites array saved in local storage, the array is used when accessing the favorites page to only display show cards to shows with the id’s in the array.
```javascript
const handelFavorite = (e) => {
  
   // value returns a string
   if (e.target.value === 'false') {
     e.target.value = 'true'

     const localStorageArr = window.localStorage.getItem('favorite-shows')
       ? JSON.parse(window.localStorage.getItem('favorite-shows'))
       : []

     localStorageArr.push(e.target.id)
     setFavorites(localStorageArr)
     window.localStorage.setItem(
       'favorite-shows',
       JSON.stringify(localStorageArr)
     )
   } else if (e.target.value === 'true') {
     e.target.value = 'false'

     const updatedFavsArr = favorites.filter((id) => id !== e.target.id)
     setFavorites(updatedFavsArr)
     window.localStorage.setItem(
       'favorite-shows',
       JSON.stringify(updatedFavsArr)
     )
   }
 }
```



### Styling
A combination of Bootstrap and SASS.
## Challenges

* Parsing and stringifying the favorite-shows array in local storage.
* Not checking if a shows id was returned as a string or an int caused confusion when checking if the id was in the favorites array.


## Wins

* Very comfortable navigating and accessing data returned from an api.
* When to use Reacts useEffect to pass information to states.

## Future Features
* Showing extra show card information using a pop up instead of a card on the side of the page.
* Filter shows by cast.
* Search for cast.


