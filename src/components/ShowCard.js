import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom/'

const ShowCard = ({ show, setFavorites, favorites, setClickedShowId }) => {
  const handelFavorite = (e) => {
    // value returns a string
    if (e.target.value === 'false') {
      e.target.value = 'true'
      e.target.innerHTML = 'fav'

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
      e.target.innerHTML = 'not fav'
      // console.log('id->', typeof e.target.id)
      const updatedFavsArr = favorites.filter((id) => id !== e.target.id)
      setFavorites(updatedFavsArr)
      window.localStorage.setItem(
        'favorite-shows',
        JSON.stringify(updatedFavsArr)
      )
    }
  }
  const getShowId = (e) => {
    console.log('e ->', e.target.id)
    setClickedShowId(e.target.id)
  }

  return (
    <Col md={2}>
      <Card
        onClick={getShowId}
        id={show.id}
        key={show.id}
        className='px-5 py-3'
      >
        <Card.Img variant='top' src={show.image.medium} id={show.id} />
        <Card.Body id={show.id}>
          <Card.Title id={show.id}>{show.name}</Card.Title>
        </Card.Body>

        <Row>
          <Col>
            {favorites?.some((favId) => parseInt(favId) === show.id) ? (
              <Button
                variant='warning'
                onClick={handelFavorite}
                id={show.id}
                value={true}
              >
                Fav
              </Button>
            ) : (
              <Button onClick={handelFavorite} id={show.id} value={false}>
                not Fav
              </Button>
            )}
          </Col>
          <Col>
            <Card.Text>⭐️{show.rating.average}</Card.Text>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default ShowCard
