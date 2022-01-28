import React, { useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SearchBar = ({
  shows,
  genres,
  setInputText,
  inputText,
  setFilteredList,
  setGenreSelected,
  genreSelected,
}) => {
  useEffect(() => {
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
  }, [genreSelected, inputText])

  const handelDropdown = (e) => {
    setGenreSelected(e)
  }
  const handelChange = (e) => {
    setInputText(e.target.value)
  }
  const handelSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='search-bar' id='search-bar'>
      <Row className='justify-content-center' id='search-row'>
        <Col md={3}>
          <Form onSubmit={handelSubmit} id='search-container'>
            <Form.Control
              id='text-search'
              type='text'
              placeholder='Search'
              onChange={handelChange}
            ></Form.Control>
          </Form>
        </Col>
        <Col md={3}>
          <Dropdown onSelect={handelDropdown}>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {genreSelected ? <>{genreSelected}</> : <>All Genres</>}
            </Dropdown.Toggle>
            <Dropdown.Menu id='genres-dropdown'>
              <Dropdown.Item eventKey=''>All Genres</Dropdown.Item>
              {genres?.map((item) => {
                return (
                  <Dropdown.Item key={item} eventKey={item}>
                    {item}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}

export default SearchBar
