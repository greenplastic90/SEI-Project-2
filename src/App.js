import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Componets:
import SiteNav from './components/SiteNav.js'
import SearchPage from './components/SearchPage'
import SideBar from './components/SideBar'
import FavoritesPage from './components/FavoritesPage'

function App() {
  const [shows, setShows] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [getError, setGetError] = useState({ errro: false, message: '' })
  const [genres, setGenres] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.tvmaze.com/shows')
        setShows(data)
        JSON.parse(window.localStorage.getItem('favorite-shows')) &&
          setFavorites(
            JSON.parse(window.localStorage.getItem('favorite-shows'))
          )
      } catch (err) {
        setGetError({ error: true, message: err.message })
      }
    }
    getData()
  }, [])

  useEffect(() => {
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
                  favorites={favorites}
                />
              }
            />
          </Routes>
          <SideBar filteredList={filteredList} />
        </Row>
      </BrowserRouter>
    </div>
  )
}

export default App
