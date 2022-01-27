import React { useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ShowCard = ({ item, setFavorites }) => {

  useEffect(() => {
    
  })

  const handelFavorite = (e) => {
    console.log('value ->', e.target.value)
    if (e.target.value === 'yes') {
      e.target.value = 'no'
      e.target.innerHTML = 'x'
      const favArray = JSON.parse(window.localStorage.getItem('favorite-shows'))
      favArray.indexOf(e.target.id) !== -1 &&
        favArray.splice(favArray.indexOf(e.target.id), 1)
      window.localStorage.setItem('favorite-shows', JSON.stringify(favArray))
      setFavorites(favArray)
      console.log('OnClick', e.target.value)
    } else if (e.target.value === 'no') {
      e.target.value = 'yes'
      e.target.innerHTML = '0'
      let favArray = []
      if (window.localStorage.getItem('favorite-shows')) {
        favArray = JSON.parse(window.localStorage.getItem('favorite-shows'))
      }
      favArray.push(e.target.id)
      window.localStorage.setItem('favorite-shows', JSON.stringify(favArray))
      setFavorites(favArray)
      console.log('OnClick', e.target.value)
    }
  }

  // setFavorites

  return (
    <Card key={item.id} className='px-5 py-3'>
      <Card.Img variant='top' src={item.image.medium} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
      </Card.Body>
      <Row>
        <Col>

          <Button onClick={handelFavorite} id={item.id} value='no'>
            ♡
          </Button>
          
        </Col>
        <Col>
          <Card.Text>⭐️{item.rating.average}</Card.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default ShowCard
