import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Navigate, useNavigate } from 'react-router-dom'
import { Select, MenuItem } from '@mui/material'
import { TonConnectButton } from '@tonconnect/ui-react'

function Header() {
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand
          style={{ fontFamily: 'Bruno Ace SC', marginLeft: '3px' }}
          href="#"
          className="text-warning fs-2"
          //   onClick={() => {
          //    navigate('/')
          // }}
        >
          TonSpotlight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link
              style={{ fontFamily: 'poppins', display: 'none' }}
              href="#action1"
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{ fontFamily: 'poppins', display: 'none' }}
              className="btn btn-primary"
              href="coins/:id"
            >
              Coin Page
            </Nav.Link>
          </Nav>
          <TonConnectButton />

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
