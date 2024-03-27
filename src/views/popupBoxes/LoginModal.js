import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from 'src'
import axios from 'axios'
import { AxiosError } from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
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

  //sending Login Request to api
  const handleSubmit = async () => {
    //validate username:email and password
    if (username.length === 0) {
      alert('Email is Blank!')
    } else if (password.length === 0) {
      alert('Password is Empty')
    } else {
      //send api call
      await axios
        .post(`${API_BASE_URL}/user/login`, {
          email: username,
          password: password,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.token) {
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
                  toast('Sign In Successful !', {
                    position: 'bottom-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                } else {
                  toast('Sign In Failure !', {
                    position: 'bottom-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  alert('User Validation Fail!')
                }
              })
              .catch(function (validateError) {
                console.log(validateError, 'validateError')
                alert('Error Validating Token')
                setIsValidUser(false)
              })
          } else {
            alert('Invalid token.')
            setIsValidUser(false)
          }
        })
        .catch(function (error) {
          console.log(error, 'ErrorLogin')
          if (error.response) {
            if (error.response.status === 404) {
              alert('Invalid credentials, please try again!')
              setIsValidUser(false)
              setUsername('')
              setPassword('')
            }
          } else {
            alert('Login Failed!, Please check your credentials or network connection.')
          }
        })
    }
  }

  const handleModalClose = () => {
    setIsRegisterClicked(false)
    handleClose()
  }

  return (
    <div>
      <ToastContainer />
      {isRegisterClicked ? (
        // Register Modal
        <Modal
          show={show}
          onHide={handleModalClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register
              handleUserRegistrationCompletion={() => null}
              handleRegistrationFormClose={() => setIsRegisterClicked(false)}
            />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" className="ml-auto" onClick={handleRegister}>
              Register
            </Button> */}
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            {/* <Button variant="primary" onClick={handleSubmit}>
              Sign In
            </Button> */}
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
