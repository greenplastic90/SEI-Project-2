import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom/'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const ShowCase = () => {
  const { showID } = useParams()

  const [showInfo, setShowInfo] = useState(null)
  const [castInfo, setCastInfo] = useState(null)
  const [showSeasons, setShowSeasons] = useState(null)
  const [error, setError] = useState({ error: false, message: '' })

  useEffect(
    () => {
      const getSingleShowData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.tvmaze.com/shows/${showID}`
          )
          setShowInfo(data)
        } catch (err) {
          setError({
            error: true,
            message: 'There was an issue fetching data from the server...',
          })
        }
      }
      getSingleShowData()
    },
    [],
    [showID]
  )

  useEffect(
    () => {
      const getSingleShowData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.tvmaze.com/shows/${showID}/cast`
          )
          setCastInfo(data)
        } catch (err) {
          setError({
            error: true,
            message: 'There was an issue fetching data from the server...',
          })
        }
      }
      getSingleShowData()
    },
    [],
    [showID]
  )

  useEffect(
    () => {
      const getSingleShowData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.tvmaze.com/shows/${showID}/seasons`
          )
          setShowSeasons(data)
        } catch (err) {
          setError({
            error: true,
            message: 'There was an issue fetching data from the server...',
          })
        }
      }
      getSingleShowData()
    },
    [],
    [showID]
  )

  return (
    <div>
      <Col id='showcase'>
        <Row>
          {showInfo ? (
            <Col md={6}>
              <h1>{showInfo.name}</h1>
              <ul>
                {showInfo.genres.map((item, i) => {
                  return <li key={i}>{item}</li>
                })}
              </ul>
              <p>Rating: {showInfo.rating.average}</p>
              <hr />
              <h3>Summary:</h3>
              <div>{showInfo.summary}</div>
              <hr />
              <h3>Series info:</h3>

              {showSeasons ? (
                <>
                  <p>Number of Seasons: {showSeasons.length}</p>
                  {/* <p>
                    Number of Episodes:{' '}
                    {console.log((showSeasons.reduce((acc, ep) => 1 + acc), 0))}
                  </p> */}
                </>
              ) : null}

              {showInfo.network !== null && (
                <p>Network: {showInfo.network.name}</p>
              )}

              <p>Official Website: {showInfo.officialSite}</p>

              <h3>Cast</h3>
              <Row>
                {castInfo
                  ? castInfo?.map((item, i) => {
                      return (
                        <Col key={i}>
                          <Card>
                            {item.person.image.medium ? (
                              <Card.Img
                                variant='top'
                                src={item.person.image.medium}
                                id={item.id}
                              />
                            ) : null}

                            <Card.Body>
                              <Card.Title>{item.person.name}</Card.Title>
                              <Card.Text>{item.character.name}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })
                  : null}
              </Row>
            </Col>
          ) : null}
          {showInfo ? (
            <Col md={4}>
              <img src={showInfo.image.original} alt={showInfo.name} />
            </Col>
          ) : null}
        </Row>
      </Col>
    </div>
  )
}

export default ShowCase
