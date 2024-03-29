import { React, useEffect, useState, useContext } from 'react'
import { UserContext } from 'src'
import axios from 'axios'
import { API_BASE_URL } from 'src/Config'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CCardTitle,
  CFormTextarea,
} from '@coreui/react'
import Register from 'src/views/pages/register/Register'

export default function RequestData() {
  const [formData, setFormData] = useState({
    email: '',
    user_id: '',
    message: '',
    institute: '',
  })

  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registeredUser, setRegisteredUser] = useState(null)
  const { isValidUser, setIsValidUser } = useContext(UserContext)

  //get email and user id of a signed in user: farmer or researcher
  useEffect(() => {
    if (isValidUser) {
      const user = JSON.parse(localStorage.getItem('user')) //Get the user from the local storage
      console.log(user)
      setFormData((prevFormData) => ({
        ...prevFormData,
        ['email']: user.email,
        ['user_id']: user.user_id,
      }))
    }
  }, [isValidUser])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/communication/data-request`, formData)
      .then(function (response) {
        console.log(response)
        alert('Message Sent Successfully!')
        window.location.reload()
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred when submitting the message')
      })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleUserDetail = (user) => {
    console.log('user', user)
    setRegisteredUser(user)
    setIsRegistered(true)
    formData.email = user.email
    formData.user_id = user.user_id
  }

  return (
    <div className="main-content" style={{ marginTop: '100px' }}>
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol xs={6}>
            <CCard>
              {!isRegistered && !isValidUser ? (
                <div>
                  <CCardBody>
                    <CCardTitle>Please register to request data. </CCardTitle>
                    <Register handleUserRegistrationCompletion={handleUserDetail} />
                  </CCardBody>
                </div>
              ) : (
                <CCardBody>
                  <CCardTitle>Request Data</CCardTitle>
                  <CForm>
                    <CFormInput
                      disabled="true"
                      className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <CFormInput
                      className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                      name="institute"
                      type="institute"
                      label="institute"
                      placeholder="Institute"
                      value={formData.institute}
                      onChange={handleInputChange}
                    />
                    <CFormTextarea
                      className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                      name="message"
                      id="exampleFormControlTextarea1"
                      label="Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></CFormTextarea>
                  </CForm>

                  <div
                    className="d-grid gap-2 d-md-flex justify-content-md-end"
                    style={{ margin: '5px' }}
                  >
                    <CButton color="primary" onClick={handleSubmit}>
                      Submit
                    </CButton>
                  </div>
                </CCardBody>
              )}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
