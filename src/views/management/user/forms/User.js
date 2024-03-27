import { React, useState, useEffect } from 'react'
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
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CFormCheck,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import { API_BASE_URL } from 'src/Config'
import { useNavigate } from 'react-router-dom'

const User = () => {
  // useStates
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAllSearchClicked, setIsAllSearchClicked] = useState(false)
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)
  const [selectedRole, setRoleSelected] = useState('')

  //   User inputs
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

  //Password validation and role input
  useEffect(() => {
    if (formData.password === formData.repeatPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
    }
    setRoleSelected(formData.role)
  }, [formData])

  //Fields in update operation
  const [currentRecord, setCurrentRecord] = useState({
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
  //validate password in updating
  useEffect(() => {
    if (currentRecord.password === currentRecord.repeatPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
    }
  }, [currentRecord])

  //+ Add New User button
  const handleAddUserBtn = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  //Clean Form Fields and users[]
  const handleCleanForm = () => {
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
    setUsers([])
    setCurrentPage(1)
    setShowModal(false)
    setIsFormEmpty(false)
  }

  //Clean Form Fields and users[] in update modal
  const handleUpdateCleanForm = () => {
    setCurrentRecord({
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
  }

  //Handle radio button
  const handleRadioChange = (event) => {
    if (event.target.value === 'true') {
      setIsAllSearchClicked(true)
    } else {
      setIsAllSearchClicked(false)
    }
  }

  // Alert message when Form not having data
  const handleFormHasNoData = () => {
    if (Object.values(formData).every((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert(
        "Please add at least one filter or switch to get all records. and Click 'Search' again.",
      )
      return true
    } else {
      return false
    }
  }

  //set form fields when user input data
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    setUsers([])
  }

  //update form input handling
  const handleUpdateInputChange = (event) => {
    setCurrentRecord({
      ...currentRecord,
      [event.target.name]: event.target.value,
    })
  }

  //display update modal with relevant data
  const handlePenClick = (currentRecord) => {
    setCurrentRecord(currentRecord)
    setShowModal(true)
  }

  //Close button of modal
  const handleClose = () => {
    setShowModal(!showModal)
  }

  //Submit new user data to register -- api call
  const handleNewItemAddButtonSubmit = (event) => {
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
      .post(`${API_BASE_URL}/user/register`, formData, {
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
        handleCleanForm()
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

  //Handle search user operation --api call
  const handleSubmit = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }
    console.log(isAllSearchClicked)
    if (!isAllSearchClicked && handleFormHasNoData()) {
      return
    }

    axios
      .get(`${API_BASE_URL}/user/search`, {
        params: {
          ...formData,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // const { data, totalPages } = response.data
        setUsers(response.data.users)
        console.log(response.data.users)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
        console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching users for the new page.')
      })
  }

  //handle delete user operation --> api call
  const handleDelete = (user_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
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
          handleCleanForm()
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

    // setUsers([])
  }

  //handle pagination --- api call to get next page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .get(`${API_BASE_URL}/user/search`, {
        params: {
          page: newPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data.users)
        console.log(response.data.users)
        console.log(response.data.total_pages, 'totalPages')
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching users for the new page.')
      })
  }

  //Handle Update user ---> api call
  const handleUpdate = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .put(`${API_BASE_URL}/user/update/${currentRecord.user_id}`, currentRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('User Updated Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 404) {
          alert('No User Found !')
        } else {
          alert('An error occurred !')
        }
      })

    // setShowModal(false)
    // setUsers([])
  }

  return (
    <div>
      {/* Add new User form */}
      {showForm ? (
        <CContainer>
          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton color="danger" onClick={handleAddUserBtn}>
                Close
              </CButton>
            </CCol>
          </CRow>
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
                    <h1>Add New User</h1>
                    <p className="text-medium-emphasis">Add new user to the system</p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>First Name </CInputGroupText>
                      <CFormInput
                        placeholder="First name"
                        autoComplete="First name"
                        onChange={handleInputChange}
                        name="first_name"
                        value={formData.first_name}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Middle Name </CInputGroupText>
                      <CFormInput
                        placeholder="Middle name"
                        autoComplete="Middle name"
                        onChange={handleInputChange}
                        name="middle_name"
                        value={formData.middle_name}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Last Name </CInputGroupText>
                      <CFormInput
                        placeholder="Last name"
                        autoComplete="Last name"
                        onChange={handleInputChange}
                        name="last_name"
                        value={formData.last_name}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>NIC </CInputGroupText>
                      <CFormInput
                        placeholder="NIC"
                        autoComplete="NIC"
                        onChange={handleInputChange}
                        name="nic"
                        value={formData.nic}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Role </CInputGroupText>
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
                        <option value="4">Agriculture Field Officer</option>
                        <option value="5">Farmer</option>
                        <option value="6">Researcher</option>
                        <option value="2">User</option>
                      </CFormSelect>
                      {selectedRole === '4' ? (
                        <div className="alert alert-warning" role="alert" style={{ margin: '5px' }}>
                          Please add more details for the Agriculture Officer in Officer Management
                          to assign the officer to their agricultural officers and areas.
                        </div>
                      ) : (
                        <></>
                      )}
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>DOB </CInputGroupText>
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
                      <CInputGroupText>Email</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        name="email"
                        value={formData.email}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Password </CInputGroupText>
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
                      <CInputGroupText>Repeat Password </CInputGroupText>
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
                    {/* Submit button click to register new user */}
                    <div className="d-grid">
                      <CButton
                        color="success"
                        onClick={handleNewItemAddButtonSubmit}
                        disabled={isFormEmpty || !isPasswordMatch}
                      >
                        Submit
                      </CButton>{' '}
                      <br />
                      {/* Clear button to clean fields of the form */}
                      <CButton color="secondary" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        // Default displaying Search Form and Add New User Button
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs="auto" className={'mb-3'} style={{ marginTop: '10px' }}>
              <CButton color="success" onClick={handleAddUserBtn}>
                + Add New User
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search User information</h1>
                    <p className="text-medium-emphasis">Filter User records</p>
                    <div className="radio-border">
                      <CFormCheck
                        type="radio"
                        name="searchOptionSelectionRadio"
                        id="searchOptionSelectionRadio2"
                        onChange={handleRadioChange}
                        value="true"
                        label="Get all records with no filters"
                      />
                    </div>
                    <div className="radio-border">
                      {' '}
                      <CFormCheck
                        type="radio"
                        name="searchOptionSelectionRadio"
                        id="searchOptionSelectionRadio1"
                        onChange={handleRadioChange}
                        value="false"
                        label="Use Filters to Search"
                        defaultChecked
                      />
                      <div className="FilterSet">
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>First Name</CInputGroupText>
                          <CFormInput
                            placeholder="First Name"
                            autoComplete="First Name"
                            onChange={handleInputChange}
                            name="first_name"
                            value={formData.first_name}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Last Name</CInputGroupText>
                          <CFormInput
                            placeholder="Last Name"
                            autoComplete="Last Name"
                            onChange={handleInputChange}
                            name="last_name"
                            value={formData.last_name}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>NIC</CInputGroupText>
                          <CFormInput
                            placeholder="NIC"
                            autoComplete="NIC"
                            onChange={handleInputChange}
                            name="nic"
                            value={formData.nic}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Role</CInputGroupText>
                          <CFormSelect
                            placeholder="User Role"
                            autoComplete="Role"
                            onChange={handleInputChange}
                            name="role"
                            value={formData.role}
                            disabled={isAllSearchClicked}
                          >
                            <option value="">Select Role</option>
                            <option value="1">Admin</option>
                            <option value="4">Agriculture Field Officer</option>
                            <option value="5">Farmer</option>
                            <option value="6">Researcher</option>
                            <option value="2">User</option>
                          </CFormSelect>
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Email</CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            autoComplete="email"
                            onChange={handleInputChange}
                            name="email"
                            value={formData.email}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>DOB</CInputGroupText>
                          <CFormInput
                            type="date"
                            placeholder="DOB"
                            autoComplete="DOB"
                            onChange={handleInputChange}
                            name="dob"
                            value={formData.dob}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                      </div>
                    </div>
                    {/* Search Button for Search Operation */}
                    <div className="d-grid">
                      <CButton color="primary" onClick={handleSubmit}>
                        Search
                      </CButton>
                      <br />
                      {/* Clear Button for Clean Form Operation */}
                      <CButton color="danger" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/* If Users array is not empty, showing its results in a table */}
          {users.length !== 0 ? (
            <CRow className="justify-content-center mt-4">
              <CCol xs={12}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>User ID</CTableHeaderCell>
                          <CTableHeaderCell>First Name</CTableHeaderCell>
                          <CTableHeaderCell>Last Name</CTableHeaderCell>
                          <CTableHeaderCell>NIC</CTableHeaderCell>
                          <CTableHeaderCell>Role</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {users.map(
                          (user) => (
                            console.log(user),
                            (
                              <CTableRow key={user.user_id}>
                                <CTableDataCell>{user.user_id}</CTableDataCell>
                                <CTableDataCell>{user.first_name}</CTableDataCell>
                                <CTableDataCell>{user.last_name}</CTableDataCell>
                                <CTableDataCell>{user.nic}</CTableDataCell>
                                <CTableDataCell>{user.role}</CTableDataCell>
                                {/* Button to perform delete Operation */}
                                <CTableDataCell>
                                  <CButton
                                    className="me-2"
                                    color="danger"
                                    onClick={() => handleDelete(user.user_id)}
                                  >
                                    Delete
                                  </CButton>
                                  {/* Button to perform Update Operation -set update form visible*/}
                                  <CButton color="info" onClick={() => handlePenClick(user)}>
                                    Update
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          ),
                        )}
                      </CTableBody>
                      {/* Handling pagination */}
                      <CPagination
                        size="sm"
                        activePage={currentPage}
                        pages={totalPages}
                        onActivePageChange={(i) => handlePageChange(i)}
                      >
                        {Array.from({ length: totalPages }, (_, index) => (
                          <CPaginationItem
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </CPaginationItem>
                        ))}
                      </CPagination>
                    </CTable>
                    {/* If showModal is true- displaying update form */}
                    <CModal visible={showModal} onClose={() => setShowModal(false)}>
                      {/* Close button in Update Form */}
                      <CModalHeader onClose={handleClose}>
                        <CModalTitle>Update Record</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <CForm>
                          <h1>Update User information</h1>
                          <p className="text-medium-emphasis">
                            Update User information in the system
                          </p>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>First Name </CInputGroupText>
                            <CFormInput
                              placeholder="First name"
                              autoComplete="First name"
                              onChange={handleUpdateInputChange}
                              name="first_name"
                              value={currentRecord.first_name}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Middle Name </CInputGroupText>
                            <CFormInput
                              placeholder="Middle name"
                              autoComplete="Middle name"
                              onChange={handleUpdateInputChange}
                              name="middle_name"
                              value={currentRecord.middle_name}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Last Name </CInputGroupText>
                            <CFormInput
                              placeholder="Last name"
                              autoComplete="Last name"
                              onChange={handleUpdateInputChange}
                              name="last_name"
                              value={currentRecord.last_name}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>NIC </CInputGroupText>
                            <CFormInput
                              placeholder="NIC"
                              autoComplete="NIC"
                              onChange={handleUpdateInputChange}
                              name="nic"
                              value={currentRecord.nic}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Role </CInputGroupText>
                            <CFormSelect
                              placeholder="User Role"
                              autoComplete="Role"
                              onChange={handleUpdateInputChange}
                              name="role"
                              value={currentRecord.role}
                            >
                              <option value="">Select Role</option>
                              <option value="1">Admin</option>
                              <option value="4">Agriculture Field Officer</option>
                              <option value="5">Farmer</option>
                              <option value="6">Researcher</option>
                              <option value="2">User</option>
                            </CFormSelect>
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>DOB </CInputGroupText>
                            <CFormInput
                              type="date"
                              placeholder="Date of Birth"
                              autoComplete="Date of Birth"
                              onChange={handleUpdateInputChange}
                              name="dob"
                              value={currentRecord.dob}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Email</CInputGroupText>
                            <CFormInput
                              placeholder="Email"
                              autoComplete="email"
                              onChange={handleUpdateInputChange}
                              name="email"
                              value={currentRecord.email}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Password </CInputGroupText>
                            <CFormInput
                              type="password"
                              placeholder="Password"
                              autoComplete="new-password"
                              onChange={handleUpdateInputChange}
                              name="password"
                              value={currentRecord.password}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Repeat Password </CInputGroupText>
                            <CFormInput
                              type="password"
                              placeholder="Repeat password"
                              autoComplete="new-password"
                              onChange={handleUpdateInputChange}
                              name="repeatPassword"
                              value={currentRecord.repeatPassword}
                              style={{ borderColor: isPasswordMatch ? '' : 'red' }}
                            />
                          </CInputGroup>
                          {/* Button to perform Update Operation */}
                          <div className="d-grid">
                            <CButton
                              color="success"
                              onClick={() => handleUpdate()}
                              disabled={!isPasswordMatch}
                            >
                              Update
                            </CButton>
                            <br />
                            {/* Button to perform Clean Form Operation */}
                            <CButton color="secondary" onClick={handleUpdateCleanForm}>
                              Clear
                            </CButton>
                          </div>
                        </CForm>
                      </CModalBody>
                    </CModal>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <></>
          )}
        </CContainer>
      )}
    </div>
  )
}

export default User
