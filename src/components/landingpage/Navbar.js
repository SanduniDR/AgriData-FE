import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Logo from 'src/assets/landing_page/logo-no-background.png'
import 'src/App.css'
import { UserContext } from 'src'
import LoginModal from 'src/views/popupBoxes/LoginModal'
import PropTypes from 'prop-types'

function NavigationBar({ handleNavClick }) {
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!isValidUser) {
      console.log(isValidUser)
      localStorage.clear()
    }
  }, [isValidUser])

  const handleSignIn = () => {
    console.log('Sign In')
    setShow(true)
    handleNavClick('Home')
  }

  // Handle the sign out
  const handleSignOut = () => {
    setIsValidUser(false)
    localStorage.clear()
    setRole(0)
    handleNavClick('SignOut')
  }

  //UseEffect to check if the user is valid
  useEffect(() => {
    if (isValidUser) {
      const user = JSON.parse(localStorage.getItem('user')) //Get the user from the local storage
      if (user && user.first_name) {
        setUsername(user.first_name) //Set the username
        setRole(user.role)
        console.log(user)
      }
    } else {
      handleSignOut()
    }
  }, [isValidUser]) //The useEffect will run when the isValidUser changes

  return (
    <div className="NavigationBar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home" style={{ marginRight: '100px' }}>
          {' '}
          <Image src={Logo} rounded width={100} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ fontSize: '30px' }} onClick={() => handleNavClick('Home')}>
              Home
            </Nav.Link>
            &nbsp;&nbsp;
            <NavDropdown title="Services" id="basic-nav-dropdown" style={{ fontSize: '30px' }}>
              <NavDropdown.Item
                onClick={() =>
                  role === 1
                    ? handleNavClick('DataCollection')
                    : role === 4
                    ? handleNavClick('DataOfficerCollection')
                    : role === 5
                    ? handleNavClick('DataCollection')
                    : null
                }
              >
                {role === 1
                  ? 'Agricultural Data Management -Admin'
                  : role === 4
                  ? 'Agricultural Data Management - Officer'
                  : role === 5
                  ? 'Agricultural Data Management - Farmer'
                  : null}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavClick('Free Advertising Support')}>
                View All Advertisements
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavClick('Data Analysis & Report Generation')}>
                Data Analysis & Report Generation
              </NavDropdown.Item>
            </NavDropdown>
            &nbsp;&nbsp;
            <NavDropdown title="Reports" id="basic-nav-dropdown" style={{ fontSize: '30px' }}>
              <NavDropdown.Item onClick={() => handleNavClick('Latest_Reports')}>
                {role === 1
                  ? 'Administrative Reports'
                  : role === 4
                  ? 'Officer Reports'
                  : 'Latest Reports 2024 (H1)'}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleNavClick('Request Data')}>
                Request Data
              </NavDropdown.Item>
            </NavDropdown>
            &nbsp;&nbsp;
            <Nav.Link style={{ fontSize: '30px' }} onClick={() => handleNavClick('About')}>
              About Us
            </Nav.Link>
            <Nav.Link style={{ fontSize: '30px' }} onClick={() => handleNavClick('Contact')}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end" style={{ marginRight: '5px' }}>
            <form className="form-inline justify-content-end">
              {isValidUser ? (
                <NavDropdown title={username} id="basic-nav-dropdown" style={{ fontSize: '30px' }}>
                  {/* <NavDropdown.Item onClick={handleSignOut}>Settings</NavDropdown.Item> */}
                  <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <button
                  className="btn btn-outline-success"
                  style={{ fontSize: '30px' }}
                  type="button"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              )}
            </form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal show={show} handleClose={() => setShow(false)} />
    </div>
  )
}

NavigationBar.propTypes = {
  handleNavClick: PropTypes.func.isRequired,
}

export default NavigationBar
