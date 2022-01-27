import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Componets:
import Home from './components/Home.js'
import SiteNav from './components/SiteNav.js'
import SearchPage from './components/SearchPage'
import FavoritesPage from './components/FavoritesPage'
import ShowCase from './components/ShowCase'

function App() {
  const [shows, setShows] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [hasError, setHasError] = useState('')
  const [genres, setGenres] = useState([])
  const [favorites, setFavorites] = useState([])
  const [clickedShowId, setClickedShowId] = useState('')

  // const location = useLocation()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.tvmaze.com/shows')
        setShows(data)
        setFilteredList(data)
      } catch (err) {
        setHasError(err.message)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    let localFavoritesArr = JSON.parse(
      window.localStorage.getItem('favorite-shows')
    )
    setFavorites(localFavoritesArr)

    let genresList = []
    const genresFilterdList = []

    shows.forEach((item) => {
      genresList = [...genresList, ...item.genres]
    })
    genresList.forEach((item) => {
      genresFilterdList.indexOf(item) === -1 && genresFilterdList.push(item)
    })
    setGenres(genresFilterdList.sort())
  }, [shows])

  return (
    <div className='main'>
      <BrowserRouter>
        <Row>
          <Col md={12}>
            <SiteNav />
          </Col>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/search'
              element={
                <SearchPage
                  shows={shows}
                  genres={genres}
                  setFilteredList={setFilteredList}
                  filteredList={filteredList}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  setClickedShowId={setClickedShowId}
                  clickedShowId={clickedShowId}
                  hasError={hasError}
                />
              }
            />
            <Route
              path='/favorites'
              element={
                <FavoritesPage
                  shows={shows}
                  setFilteredList={setFilteredList}
                  filteredList={filteredList}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  setClickedShowId={setClickedShowId}
                  clickedShowId={clickedShowId}
                />
              }
            />
            <Route path='/:showID' element={<ShowCase />} />
          </Routes>
        </Row>
      </BrowserRouter>
    </div>
  )
}

export default App
