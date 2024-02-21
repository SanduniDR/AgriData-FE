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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilCloudUpload,
  cilCalendar,
  cilCreditCard,
  cilTag,
} from '@coreui/icons'

const AddUserForm = () => {
  // To-do Call and get user roles list from backend and set the roles options

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    profileImage: null,
    email: '',
    nic: '',
    role: '',
    password: '',
    repeatPassword: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

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
      .post('http://127.0.0.1:5000/user/register', formData)
      .then(function (response) {
        console.log(response)
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {isFormEmpty && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all the fields.
                  </div>
                )}
                <CForm>
                  <h1>Register new Users</h1>
                  <p className="text-medium-emphasis">Add user details</p>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First name"
                      autoComplete="First name"
                      onChange={handleInputChange}
                      name="first_name"
                      value={formData.first_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Middle name"
                      autoComplete="Middle name"
                      onChange={handleInputChange}
                      name="middle_name"
                      value={formData.middle_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last name"
                      autoComplete="Last name"
                      onChange={handleInputChange}
                      name="last_name"
                      value={formData.last_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilCreditCard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="NIC"
                      autoComplete="NIC"
                      onChange={handleInputChange}
                      name="nic"
                      value={formData.nic}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilTag} />
                    </CInputGroupText>
                    <CFormSelect
                      placeholder="User Role"
                      autoComplete="Role"
                      onChange={handleInputChange}
                      name="role"
                      value={formData.role}
                    >
                      <option value="">Select Role</option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">RegionalAdmin</option>
                      <option value="4">AgricultureOfficer</option>
                      <option value="5">Farmer</option>
                      <option value="6">Researcher</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type="date"
                      placeholder="Date of Birth"
                      autoComplete="Date of Birth"
                      onChange={handleInputChange}
                      name="dob"
                      value={formData.dob}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
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
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      name="email"
                      value={formData.email}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
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
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
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
                    <CButton color="success" onClick={handleSubmit} disabled={!isPasswordMatch}>
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

export default AddUserForm
