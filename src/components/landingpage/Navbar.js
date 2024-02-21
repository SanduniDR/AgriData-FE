import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Logo from 'src/assets/landing_page/logo-no-background.png'

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" style={{ marginRight: '100px' }}>
            {' '}
            <Image src={Logo} rounded width={200} height={100} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ fontSize: '30px' }} href="#home">
                Home
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link style={{ fontSize: '30px' }} href="#About">
                About
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link style={{ fontSize: '30px' }} href="#Advertising">
                Contact
              </Nav.Link>
              &nbsp;&nbsp;
              <NavDropdown title="Services" id="basic-nav-dropdown" style={{ fontSize: '30px' }}>
                <NavDropdown.Item href="#action/3.1">Agricultural Data Collection</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Free Advertising Support</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Data Analysis & Report Generation
                </NavDropdown.Item>
              </NavDropdown>
              &nbsp;&nbsp;
              <NavDropdown title="Reports" id="basic-nav-dropdown" style={{ fontSize: '30px' }}>
                <NavDropdown.Item href="#action/3.1">Latest Reports 2024</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Generate Own Reports</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Request Data</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-end">
              <form className="form-inline justify-content-end">
                <button
                  className="btn btn-outline-success"
                  style={{ fontSize: '30px' }}
                  type="button"
                >
                  Sign In
                </button>
              </form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
