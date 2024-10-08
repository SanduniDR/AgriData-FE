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
import { cilUser, cilCalendar, cilCreditCard, cilTag } from '@coreui/icons'
import { API_BASE_URL } from 'src/Config'

const RemoveUserForm = () => {
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

  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [isUserFound, setIsUserFound] = useState(false)
  const [user_id, setUserId] = useState('')

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
    if (name === 'user_id') {
      if (value !== '') {
        setUserId(value)
      } else {
        setIsUserFound(false)
        setUserId('')
      }
    }

    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
     
      return
    }

    axios
      .delete(`${API_BASE_URL}/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          clearForm()
          alert('User removed successfully.')
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          alert('User not found, please check the user ID and check again')
        } else if (error.response.status === 400) {
          alert('Failed. This user may have some dependencies.')
        } else {
          alert('Something went wrong!. Please contact DB Administrator and See logs')
        }
      })
  }

  const clearForm = () => {
    setFormData({
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
    setIsUserFound(false)
  }

  const handleSearchUser = (userId) => {
    // Call the backend API to search for the user by ID
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
     
      return
    }

    axios
      .get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const user = response.data
        if (user && Object.keys(user).length !== 0) {
          setIsUserFound(true)
          setFormData((prevFormData) => ({
            ...prevFormData,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            dob: user.dob,
            profileImage: user.profileImage,
            email: user.email,
            nic: user.nic,
            role: user.role,
          }))
        } else {
          setIsUserFound(false)
          alert('No user found.')
        }
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          setIsUserFound(false)
          alert('User not found, please check the user ID and check again')
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Remove a User</h1>
                  <p className="text-medium-emphasis">Add user details</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="User ID"
                      autoComplete="User ID"
                      onChange={handleInputChange}
                      name="user_id"
                      value={user_id}
                    />
                    <CButton color="primary" onClick={() => handleSearchUser(user_id)}>
                      Search
                    </CButton>
                  </CInputGroup>
                  {isUserFound ? (
                    <>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          {/* <CIcon icon={cilUser} /> */}
                          First name
                        </CInputGroupText>
                        <CFormInput
                          placeholder="First name"
                          autoComplete="First name"
                          onChange={handleInputChange}
                          name="first_name"
                          disabled
                          value={formData.first_name}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          {/* <CIcon icon={cilUser} /> */}
                          Middle name
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Middle name"
                          autoComplete="Middle name"
                          onChange={handleInputChange}
                          name="middle_name"
                          disabled
                          value={formData.middle_name}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          {/* <CIcon icon={cilUser} /> */}
                          Last name
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Last name"
                          autoComplete="Last name"
                          onChange={handleInputChange}
                          name="last_name"
                          disabled
                          value={formData.last_name}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilCreditCard} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="NIC"
                          autoComplete="NIC"
                          onChange={handleInputChange}
                          name="nic"
                          disabled
                          value={formData.nic}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilTag} />
                        </CInputGroupText>
                        <CFormSelect
                          placeholder="User Role"
                          autoComplete="Role"
                          onChange={handleInputChange}
                          name="role"
                          disabled
                          value={formData.role}
                        >
                          <option value="">Select Role</option>
                          <option value="1">Admin</option>
                          <option value="2">User</option>
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput
                          type="date"
                          placeholder="Date of Birth"
                          autoComplete="Date of Birth"
                          onChange={handleInputChange}
                          name="dob"
                          disabled
                          value={formData.dob}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          onChange={handleInputChange}
                          name="email"
                          disabled
                          value={formData.email}
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton color="success" onClick={handleSubmit} disabled={!isPasswordMatch}>
                          Remove User
                        </CButton>
                        <br />
                        <CButton color="danger" onClick={clearForm}>
                          Clear
                        </CButton>
                      </div>
                    </>
                  ) : null}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RemoveUserForm
