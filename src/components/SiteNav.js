import React from 'react'

import { Link } from 'react-router-dom/'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const SiteNav = () => {
  return (
    <Navbar id='nav-bar' fixed='top'>
      <Container fluid>
        <Navbar.Brand>
          <Link className='d-flex' to='/'>
            ITVDB
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Item className='mx-2 '>
            <Link to='/search'>TV Shows</Link>
          </Nav.Item>
          <Nav.Item className='mx-2  '>
            <Link to='/favorites'>Favorites</Link>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNav
