import SearchBar from './utility/SearchBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState } from 'react'

import ShowCard from './ShowCard'

const SearchPage = ({
  shows,
  genres,
  setFilteredList,
  filteredList,
  setFavorites,
  favorites,
}) => {
  const [inputText, setInputText] = useState('')
  const [genreSelected, setGenreSelected] = useState('')
  return (
    <Col md={8}>
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
        <Row>
          {filteredList?.map((item) => {
            return (
              <Col key={item.id}>
                <ShowCard
                  item={item}
                  setFavorites={setFavorites}
                  favorites={favorites}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    </Col>
  )
}

export default SearchPage
