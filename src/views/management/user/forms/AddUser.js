import { React, useEffect, useState } from 'react'
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
import { cilLockLocked, cilUser, cilCalendar, cilCreditCard, cilTag } from '@coreui/icons'

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    email: '',
    nic: '',
    role: '',
    password: '',
    repeatPassword: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [selectedRole, setRoleSelected] = useState('')

  useEffect(() => {
    if (formData.password === formData.repeatPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
    }

    setRoleSelected(formData.role)
  }, [formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const CleanForm = () => {
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      email: '',
      nic: '',
      role: '',
      password: '',
      repeatPassword: '',
    })
    setIsFormEmpty(false)
  }

  // function handleFileChange(event) {
  //   const file = event.target.files[0]
  //   const reader = new FileReader()

  //   reader.onload = function (event) {
  //     const arrayBuffer = event.target.result
  //     const uint8Array = new Uint8Array(arrayBuffer)
  //     const byteArray = Array.from(uint8Array)
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       profileImage: byteArray,
  //     }))
  //   }

  //   reader.readAsArrayBuffer(file)
  // }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    if (!window.confirm('Are you sure you want to register this user?')) {
      return
    }

    const token = localStorage.getItem('token')

    axios
      .post('http://127.0.0.1:5000/user/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        // alert('User Registered Successfully!')
        if (
          window.confirm(
            'User Registered Successfully! Do you want to inform this to user by email?',
          )
        ) {
          // send mail
        }
        CleanForm()
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
                      title='If the role is selected as "Officer",
                       Please add more details in Officer Management to assign Officer to their agricultural officers and areas.'
                    >
                      <option value="">Select Role</option>
                      <option value="1">Admin</option>
                      <option value="4">AgricultureOfficer</option>
                      <option value="5">Farmer</option>
                    </CFormSelect>
                    {selectedRole === '4' ? (
                      <div className="alert alert-warning" role="alert" style={{ margin: '5px' }}>
                        Please add more details for the Agriculture Officer in Officer Management to
                        assign the officer to their agricultural officers and areas.
                      </div>
                    ) : (
                      <></>
                    )}
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
