import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ShowCard from './ShowCard'
import SideBar from './SideBar'

const FavoritesPage = ({
  shows,
  setFilteredList,
  filteredList,
  favorites,
  setFavorites,
  setClickedShowId,
  clickedShowId,
}) => {
  return (
    <>
      <Col md={10}>
        <div className='favorites-page'>
          <h2>Favorites</h2>
          <Row className='card-container'>
            {console.log(favorites)}
            {shows
              .filter((show) =>
                favorites?.some((favId) => parseInt(favId) === show.id)
              )
              .map((show) => (
                <ShowCard
                  key={show.id}
                  favorites={favorites}
                  show={show}
                  setFavorites={setFavorites}
                  setClickedShowId={setClickedShowId}
                />
              ))}
          </Row>
        </div>
      </Col>
      <SideBar filteredList={filteredList} clickedShowId={clickedShowId} />
    </>
  )
}

export default FavoritesPage

// return (
//   <Col key={show.id + 'Fav'}>
//     <ShowCard
//       favorites={favorites}
//       show={show}
//       setFavorites={setFavorites}
//     />
//   </Col>
// )
