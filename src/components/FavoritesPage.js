import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ShowCard from './ShowCard'

const FavoritesPage = ({ shows, setFilteredList, filteredList, favorites }) => {
  useEffect(() => {}, [favorites, setFilteredList, shows])

  return (
    <Col md={8}>
      <div className='favorites-page'>
        <h2>Favorites</h2>
        <Row>
          {filteredList?.map((item) => {
            return (
              <Col key={item.id}>
                <ShowCard item={item} />
              </Col>
            )
          })}
        </Row>
      </div>
    </Col>
  )
}

export default FavoritesPage
