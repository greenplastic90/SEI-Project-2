import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom/'

// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export const SideBar = ({ clickedShowId }) => {
  const [sidebarShow, setSidebarShow] = useState(null)
  const [isError, setIsError] = useState('')

  useEffect(() => {
    const getShowApi = async () => {
      try {
        const { data } = await axios.get(
          `https://api.tvmaze.com/shows/${clickedShowId}`
        )

        setSidebarShow(data)
      } catch (err) {
        setIsError('Select A Show For More Information')
      }
    }
    getShowApi()
  }, [clickedShowId])

  return (
    <Col className='side-bar' md={2}>
      {sidebarShow ? (
        <Card className='px-5 py-3 m2-2 side-card'>
          <Card.Body>
            <Card.Title>{sidebarShow.name}</Card.Title>
            {sidebarShow.network !== null && (
              <Card.Text>Network: {sidebarShow.network.name}</Card.Text>
            )}
            <Card.Text>Rating: {sidebarShow.rating.average}</Card.Text>
            <Card.Text>Status: {sidebarShow.status}</Card.Text>
            <Card.Text>Seasons: (TBD)</Card.Text>
          </Card.Body>
          <ListGroup>
            {sidebarShow.genres.map((genres, i) => (
              <li key={i}>{genres}</li>
            ))}
          </ListGroup>
          <Link id={sidebarShow.id} to={`/${sidebarShow.id}`}>
            <Button variant='primary'>Go to Show's page</Button>
          </Link>
        </Card>
      ) : (
        <p className='px-5 py-3 m2-2 side-card'>{isError}</p>
      )}
    </Col>
  )
}

export default SideBar
