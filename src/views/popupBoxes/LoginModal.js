import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from 'src'
import axios from 'axios'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Register from '../pages/register/Register'
import { API_BASE_URL } from 'src/Config'

function LoginModal({ show, handleClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  const [response, setResponse] = useState(null)
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)

  const handleRegister = (event) => {
    setIsRegisterClicked(!isRegisterClicked)
  }

  const handleSubmit = async () => {
    if (username.length === 0) {
      alert('Email has left Blank!')
    } else if (password.length === 0) {
      alert('password has left Blank!')
    } else {
      await axios
        .post(`${API_BASE_URL}/user/login`, {
          email: username,
          password: password,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.token) {
            // Validate the user with the token
            axios
              .post(
                `${API_BASE_URL}/user/validate`,
                {
                  email: username,
                },
                {
                  headers: {
                    Authorization: `Bearer ${response.data.token}`,
                  },
                },
              )
              .then(function (validateResponse) {
                console.log(validateResponse)
                if (validateResponse.data.valid) {
                  localStorage.setItem('token', response.data.token)
                  localStorage.setItem('user', JSON.stringify(validateResponse.data.user))
                  setIsValidUser(true)
                  setResponse(validateResponse)
                  handleClose()
                  setUsername('')
                  setPassword('')
                  toast('Sign in successful!', {
                    position: 'bottom-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                } else {
                  toast('Sign in Failure!')
                  alert('User validation failed, please log in again or contact Admin')
                }
              })
              .catch(function (validateError) {
                console.log(validateError, 'validateError')
                alert('Error validating token')
                setIsValidUser(false)
              })
          } else {
            alert('Invalid token')
            setIsValidUser(false)
          }
        })
        .catch(function (error) {
          console.log(error, 'error')
          if (error.response) {
            if (error.response.status === 401) {
              alert('Invalid credentials, please try again.')
            }
          } else if (error instanceof AxiosError) {
            alert('An network occurred. Please try again later')
          } else if (error.code === 'ECONNREFUSED') {
            alert('Connection refused. Please check your network connection.')
          } else {
            console.log(error)
            alert('An error occurred. Please try again later.')
          }
        })
    }
  }
  return (
    <div>
      <ToastContainer />
      {isRegisterClicked ? (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="ml-auto" onClick={handleRegister}>
              Register
            </Button>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <Button variant="primary" onClick={handleSubmit}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="ml-auto" onClick={handleRegister}>
              Register
            </Button>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <Button variant="primary" onClick={handleSubmit}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default LoginModal
