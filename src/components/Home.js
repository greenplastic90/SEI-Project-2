import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom/'

export const Home = () => {
  const [randomShows, setRandomShows] = useState([])
  const [getError, setGetError] = useState({ errro: false, message: '' })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.tvmaze.com/shows')
        let tempRandom = []
        while (tempRandom.length < 10) {
          tempRandom.push(data[Math.floor(Math.random() * data.length)])
          tempRandom = [...new Set(tempRandom)]
        }
        setRandomShows(tempRandom)
      } catch (err) {
        setGetError({ error: true, message: err.message })
      }
    }
    getData()
  }, [])

  return (
    <div id='home' className='d-flex mx-0'>
      <h1>ITVDB</h1>
      <Link className='btn btn-dark' to='/search'>
        Browse Shows
      </Link>
      {randomShows?.map((show) => (
        <img src={show.image.medium} alt={show.name} className='w-20 homeIMG' />
      ))}
    </div>
  )
}

export default Home
