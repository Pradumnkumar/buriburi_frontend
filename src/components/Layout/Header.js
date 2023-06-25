import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Header.css'

function Header(props) {
  const cartButtonHandler = () => {
    props.setCartBar(true);
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src="logo.svg" width="30" height="30" alt="" />BURI BURI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="right-aligned">
            <Nav>
              <Nav.Link onClick={cartButtonHandler}><i className='fas fa-shopping-cart' /></Nav.Link>
              <Nav.Link as={Link} to="/login"><i className='fas fa-user' />Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;