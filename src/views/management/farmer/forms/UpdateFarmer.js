import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFarmerById, updateFarmer } from 'src/api/UserService'
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
import { cilLockLocked, cilUser, cilCalendar, cilCreditCard } from '@coreui/icons'

const UpdateFarmerForm = () => {
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
    assigned_field_area_id: '',
    tax_file_no: '',
    assigned_office_id: '',
  })

  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [isUserFound, setIsUserFound] = useState(false)
  const [isNextClicked, setIsNextClicked] = useState(false)
  const [user, setUser] = useState(null)
  const [farmer, setFarmer] = useState(null)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .put(`http://127.0.0.1:5000/user/update/${formData.user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('User was updated Successfully!')
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
      user_id: '',
      assigned_field_area_id: '',
      tax_file_no: '',
      assigned_office_id: '',
    })
    setIsUserFound(false)
    setFarmer(null)
    setUser(null)
    setIsNextClicked(false)
  }

  const handleSearchUser = (userId) => {
    // Call the backend API to search for the user by ID
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .get(`http://127.0.0.1:5000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const user = response.data
        console.log(user, 'user')
        if (user && user.role === 5) {
          setIsUserFound(true)
          setUser(user)
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
          alert(
            'No result found for this user as a farmer. Please try again with a different user ID.',
          )
        }
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 404) {
          alert('User not found. Please try again with a different user ID.')
        } else {
          alert('An error occurred while searching for the user.')
        }
      })
  }

  const handleNext = () => {
    setIsNextClicked(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (isNextClicked) {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('Please login first.')
          navigate('/login', { replace: true })
          return
        }
        const farmer = await getFarmerById(user.user_id)
        console.log(farmer)
        setFarmer(farmer)
        setFormData((prevFormData) => ({
          ...prevFormData,
          assigned_field_area_id: farmer.assigned_field_area_id,
          tax_file_no: farmer.tax_file_no,
          assigned_office_id: farmer.assigned_office_id,
        }))
      }
    }

    fetchData()
  }, [isNextClicked, navigate, user])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {/* {isFormEmpty && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all the fields.
                  </div>
                )} */}
                <CForm>
                  {!farmer && (
                    <>
                      <h1>Update Farmer</h1>
                      <p className="text-medium-emphasis">Add user & farmer details</p>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="User ID"
                          autoComplete="User ID"
                          onChange={handleInputChange}
                          name="user_id"
                          value={formData.user_id}
                        />
                        <CButton color="primary" onClick={() => handleSearchUser(formData.user_id)}>
                          Search
                        </CButton>
                      </CInputGroup>
                    </>
                  )}
                  {isUserFound && !farmer ? (
                    <>
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
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
                          value={formData.email}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-4 `}>
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
                          Update User details
                        </CButton>
                        <br />
                        <CButton color="success" onClick={handleNext} disabled={!isUserFound}>
                          Next
                        </CButton>
                        <br />
                        <CButton color="danger" onClick={clearForm}>
                          Clear
                        </CButton>
                      </div>
                    </>
                  ) : null}
                  {isNextClicked && isUserFound ? (
                    <>
                      <CCardBody>
                        <div className="d-grid">
                          <CInputGroup className={`mb-3`}>
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="User ID"
                              autoComplete="User ID"
                              onChange={handleInputChange}
                              name="user_id"
                              value={formData.user_id}
                              disabled
                            />
                          </CInputGroup>
                          <CInputGroup className={`mb-3`}>
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Tax File Number"
                              autoComplete="tax-file-number"
                              onChange={handleInputChange}
                              name="tax_file_no"
                              value={formData.tax_file_no}
                            />
                          </CInputGroup>
                          <CInputGroup className={`mb-3`}>
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Assigned Office ID"
                              autoComplete="assigned-office-id"
                              onChange={handleInputChange}
                              name="assigned_office_id"
                              value={formData.assigned_office_id}
                            />
                          </CInputGroup>
                          <CInputGroup className={`mb-3`}>
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Assigned Field Area ID"
                              autoComplete="assigned-field-area-id"
                              onChange={handleInputChange}
                              name="assigned_field_area_id"
                              value={formData.assigned_field_area_id}
                            />
                          </CInputGroup>
                        </div>
                        <div className="d-grid">
                          <CButton color="success" onClick={() => updateFarmer(formData)}>
                            Update farmer details
                          </CButton>
                          <br />
                          <CButton color="danger" onClick={clearForm}>
                            Clear
                          </CButton>
                        </div>
                      </CCardBody>
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

export default UpdateFarmerForm
