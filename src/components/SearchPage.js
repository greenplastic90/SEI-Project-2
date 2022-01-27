import SearchBar from './utility/SearchBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState } from 'react'

import ShowCard from './ShowCard'
import SideBar from './SideBar'
import Spinner from 'react-bootstrap/Spinner'

const SearchPage = ({
  shows,
  genres,
  setFilteredList,
  filteredList,
  setFavorites,
  favorites,
  setClickedShowId,
  clickedShowId,
  hasError,
}) => {
  const [inputText, setInputText] = useState('')
  const [genreSelected, setGenreSelected] = useState('')

  return (
    <>
      <Col md={10}>
        <div className='search-page'>
          <SearchBar
            shows={shows}
            genres={genres}
            setInputText={setInputText}
            inputText={inputText}
            setFilteredList={setFilteredList}
            setGenreSelected={setGenreSelected}
            genreSelected={genreSelected}
          />
          <h2>Search Page</h2>
          {filteredList.length ? (
            <Row>
              {filteredList?.map((show) => {
                return (
                  <ShowCard
                    key={show.id}
                    show={show}
                    setFavorites={setFavorites}
                    favorites={favorites}
                    setClickedShowId={setClickedShowId}
                  />
                )
              })}
            </Row>
          ) : hasError ? (
            <p>{hasError}</p>
          ) : (
            <Row className='justify-content-center'>
              <Col>
                <Spinner animation='grow' size='xl' />
              </Col>
            </Row>
          )}
        </div>
      </Col>
      <SideBar filteredList={filteredList} clickedShowId={clickedShowId} />
    </>
  )
}

export default SearchPage
