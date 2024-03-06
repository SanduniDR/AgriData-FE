import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UpdateUserForm from './UpdateUser'
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
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCalendar, cilCreditCard, cilTag, cilTrash, cilPencil } from '@coreui/icons'
import { API_BASE_URL } from 'src/Config'

const SearchUserForm = () => {
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
  })
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setUsers([])
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // Call the backend API to fetch users for the new page
    const token = localStorage.getItem('token')
    axios
      .get(`${API_BASE_URL}/user/search`, {
        params: {
          ...formData,
          page: newPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
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

  const handleDelete = (userId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the user
    console.log(userId)
    axios
      .delete(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('User deleted successfully.')
        handleCleanForm()
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          handleCleanForm()
        } else if (error.response.status === 400) {
          alert('Failed. This user may have some dependencies.')
        } else {
          alert('Something went wrong!. Please contact DB Administrator and See logs')
        }
      })
  }

  const handleUpdate = (userId) => {
    // Navigate to the update user page with the selected user ID
    // setActiveTabKey('2'); // Set the activeKey to the key of TabPane 2
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
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

  const handleCleanForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      dob: '',
      nic: '',
    })
    setUsers([])
    setCurrentPage(1)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Search Users</h1>
                  <p className="text-medium-emphasis">Filter user records</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      autoComplete="First Name"
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
                      placeholder="Last Name"
                      autoComplete="Last Name"
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
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleSubmit}>
                      Search
                    </CButton>
                    <br />
                    <CButton color="danger" onClick={handleCleanForm}>
                      Clear
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
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
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(user.user_id)}
                                >
                                  <CIcon icon={cilTrash} />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        ),
                      )}
                    </CTableBody>
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
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CContainer>
    </div>
  )
}

export default SearchUserForm
