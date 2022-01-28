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
        <Card className='px-2 py-2 m2-2 side-card'>
          <Card.Body className='p-0 pb-2'>
            <Card.Title>{sidebarShow.name}</Card.Title>
            {sidebarShow.network !== null && (
              <Card.Text>
                Network: {<b>{sidebarShow.network.name}</b>}
              </Card.Text>
            )}
            <Card.Text>Rating: {<b>{sidebarShow.rating.average}</b>}</Card.Text>
            <Card.Text>Status: {<b>{sidebarShow.status}</b>}</Card.Text>
          </Card.Body>
          <ListGroup className='py-2'>
            {sidebarShow.genres.map((genres, i) => (
              <li key={i}>{genres}</li>
            ))}
          </ListGroup>
          <Link id={sidebarShow.id} to={`/${sidebarShow.id}`}>
            <Button variant='primary'>Show's page ></Button>
          </Link>
        </Card>
      ) : (
        <p className='px-5 py-3 m2-2 side-card'>{isError}</p>
      )}
    </Col>
  )
}

export default SideBar
