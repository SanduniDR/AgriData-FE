import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AxiosError } from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { UserContext } from 'src'

const Login = () => {
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  // const [isValidUser, setIsValidUser] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (isValidUser && response && response.data) {
      if ([1].includes(response.data.user.role)) {
        navigate('/dashboard', { state: { isValidUser: isValidUser } }) // Update isValidUser to true
      } else if ([2, 5, 6].includes(response.data.user.role)) {
        navigate('/genericDashboard', { state: { isValidUser: isValidUser } }) // Update isValidUser to true
      } else if ([3, 4].includes(response.data.user.role)) {
        console.log(isValidUser, 'isValidUser')
        navigate('/officer-dashboard', { state: { isValidUser: isValidUser } }) // Update isValidUser to true
      } else {
        alert('Logging was failed, please log in again or contact Admin')
      }
    }
  }, [isValidUser, response])

  const logInUser = () => {
    if (username.length === 0) {
      alert('Email has left Blank!')
    } else if (password.length === 0) {
      alert('password has left Blank!')
    } else {
      axios
        .post('http://127.0.0.1:5000/user/login', {
          email: username,
          password: password,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.token) {
            // Validate the user with the token
            axios
              .post(
                'http://127.0.0.1:5000/user/validate',
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
                  setIsValidUser(true)
                  setResponse(validateResponse)
                } else {
                  alert('User validation failed, please log in again or contact Admin')
                }
              })
              .catch(function (validateError) {
                console.log(validateError, 'validateError')
                alert('Error validating token')
              })
          } else {
            alert('Invalid token')
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

  useEffect(() => {
    setIsError(false)
  }, [username, password])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ borderColor: isError ? 'red' : '' }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: isError ? 'red' : '' }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={logInUser}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Register</h2>
                    <p>Register and support the community & the Sri Lankan Agricultural System</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
