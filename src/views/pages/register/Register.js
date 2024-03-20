import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { API_BASE_URL } from 'src/Config'
import PropTypes from 'prop-types'

const Register = ({ handleUserRegistrationCompletion }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    profileImage: 'N/A',
    email: '',
    nic: '',
    password: '',
    repeatPassword: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false)

  useEffect(() => {
    if (formData.password === formData.repeatPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
    }
  }, [formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setIsSuccessfulRegistration(false)
    console.log(formData)
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      const arrayBuffer = event.target.result
      const uint8Array = new Uint8Array(arrayBuffer)
      const byteArray = Array.from(uint8Array)
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: byteArray,
      }))
    }

    reader.readAsArrayBuffer(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/user/register`, formData)
      .then(function (response) {
        console.log(response)
        setIsSuccessfulRegistration(true)
        if (response.status === 201) {
          handleUserRegistrationCompletion(response.data.user)
        }
        alert('User Registered Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          alert('User already exists.')
        } else {
          alert('An error occurred.')
        }
      })
  }

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  return (
    <div className="bg-light">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard>
              <CCardBody>
                {isFormEmpty && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all the fields.
                  </div>
                )}
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>First Name</CInputGroupText>
                    <CFormInput
                      placeholder="First name"
                      autoComplete="First name"
                      onChange={handleInputChange}
                      name="first_name"
                      value={formData.first_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>Middle Name</CInputGroupText>
                    <CFormInput
                      placeholder="Middle name"
                      autoComplete="Middle name"
                      onChange={handleInputChange}
                      name="middle_name"
                      value={formData.middle_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>Last Name</CInputGroupText>
                    <CFormInput
                      placeholder="Last name"
                      autoComplete="Last name"
                      onChange={handleInputChange}
                      name="last_name"
                      value={formData.last_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>NIC</CInputGroupText>
                    <CFormInput
                      placeholder="NIC"
                      autoComplete="NIC"
                      onChange={handleInputChange}
                      name="nic"
                      value={formData.nic}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>DoB</CInputGroupText>
                    <CFormInput
                      type="date"
                      placeholder="Date of Birth"
                      autoComplete="Date of Birth"
                      onChange={handleInputChange}
                      name="dob"
                      value={formData.dob}
                    />
                  </CInputGroup>
                  {/* <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilCloudUpload} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Upload Profile Image"
                      accept=".png, .jpg, .bmp"
                      onChange={handleFileChange}
                      name="profileImage"
                      value={formData.profileImage ? formData.profileImage.name : ''}
                    />
                  </CInputGroup> */}
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>E-mail</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      name="email"
                      value={formData.email}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>Password</CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleInputChange}
                      name="password"
                      value={formData.password}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-4 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>Repeat Password</CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={handleInputChange}
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      style={{ borderColor: isPasswordMatch ? '' : 'red' }}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton
                      color="success"
                      onClick={handleSubmit}
                      disabled={!isPasswordMatch || isSuccessfulRegistration}
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Register.propTypes = {
  handleUserRegistrationCompletion: PropTypes.func,
}
export default Register
