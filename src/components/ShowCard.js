import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import star from '../images/star.png'

const ShowCard = ({ show, setFavorites, favorites, setClickedShowId }) => {
  const handelFavorite = (e) => {
    console.log('target ->', e.target.className)
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
  const getShowId = (e) => {
    console.log('e ->', e.target.id)
    setClickedShowId(e.target.id)
  }

  return (
    <Col md={3}>
      <Card onClick={getShowId} id={show.id} key={show.id} className='p-3 mb-4'>
        <Card.Img variant='top' src={show.image.medium} id={show.id} />
        <Card.Body id={show.id}>
          <Card.Title id={show.id}>{show.name}</Card.Title>
        </Card.Body>

        <Row>
          <Col className=''>
            {favorites?.some((favId) => parseInt(favId) === show.id) ? (
              <Button
                className='fav-btn fav'
                onClick={handelFavorite}
                // onClick={handelFavorite}
                id={show.id}
                value={true}
              ></Button>
            ) : (
              <Button
                className='fav-btn not-fav'
                onClick={handelFavorite}
                id={show.id}
                value={false}
              ></Button>
            )}
          </Col>
          <Col>
            <Card.Text>
              <img id='star' src={star} alt='star' />
              {show.rating.average}
            </Card.Text>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default ShowCard
