import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export const SideBar = ({ filteredList }) => {
  // const [showSeasons, setShowsSeasons] = useState([])
  // const [getError, setGetError] = useState({ errro: false, message: '' })

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get(`https://api.tvmaze.com/shows/${}/seasons`)
  //       setShowsSeasons(data)
  //     } catch (err) {
  //       setGetError({ error: true, message: err.message })
  //     }
  //   }
  //   getData()
  // }, [])

  return (
    <Col md={4}>
      <h2>Sidebar</h2>
      {filteredList.map((item) => {
        return (
          <Card key={item.id} className='px-5 py-3 m2-2'>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              {item.network !== null && (
                <Card.Text>Network: {item.network.name}</Card.Text>
              )}
              <Card.Text>Rating: {item.rating.average}</Card.Text>
              <Card.Text>Status: {item.status}</Card.Text>
              <Card.Text>Seasons: (TBD)</Card.Text>
            </Card.Body>
            <ListGroup>
              {item.genres.map((genres, i) => (
                <li key={i}>{genres}</li>
              ))}
            </ListGroup>
            <Button variant='primary'>Go to Show's page</Button>
          </Card>
        )
      })}
    </Col>
  )
}

export default SideBar
