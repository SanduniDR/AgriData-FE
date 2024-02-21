import { React, useState } from 'react'
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
import { cilUser, cilCalendar, cilCreditCard, cilTrash } from '@coreui/icons'

const SearchFarmerForm = () => {
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
    user_id: '',
    assigned_field_area_id: '',
    tax_file_no: '',
    assigned_office_id: '',
  })
  const [farmers, setFarmers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setFarmers([])
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // Call the backend API to fetch users for the new page
    const token = localStorage.getItem('token')
    axios
      .get('http://127.0.0.1:5000/user/search_farmers', {
        params: {
          ...formData,
          page: newPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setFarmers(response.data.farmers)
        console.log(response.data.farmers)
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

    if (!window.confirm('Are you sure you want to delete this farmer?')) {
      return
    }

    // Call the backend API to delete the user
    console.log(userId)
    axios
      .delete(`http://127.0.0.1:5000/user/farmer/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('User & farmer details were deleted successfully.')
        // Refresh the user list
        handleCleanForm()
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          handleCleanForm()
        } else {
          alert('An error occurred while deleting the user. Contact Administrator.')
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
      .get('http://127.0.0.1:5000/user/search_farmers', {
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
        if (response.data.farmers && response.data.farmers.length !== 0) {
          setFarmers(response.data.farmers)
          console.log(response.data.farmers)
        } else {
          setFarmers([])
          alert('No farmers found.')
        }
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
      user_id: '',
      assigned_field_area_id: '',
      tax_file_no: '',
      assigned_office_id: '',
    })
    setFarmers([])
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Search Farmers</h1>
                  <p className="text-medium-emphasis">Filter farmer records</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="User Id"
                      autoComplete="Farmer Id"
                      onChange={handleInputChange}
                      name="user_id"
                      value={formData.user_id}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Tax File No"
                      autoComplete="Tax File No"
                      onChange={handleInputChange}
                      name="tax_file_no"
                      value={formData.tax_file_no}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilCreditCard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Office Id"
                      autoComplete="Assigned Office Id"
                      onChange={handleInputChange}
                      name="assigned_office_id"
                      value={formData.assigned_office_id}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Assigned Field Area Id"
                      autoComplete="Assigned Field Area Id"
                      onChange={handleInputChange}
                      name="assigned_field_area_id"
                      value={formData.assigned_field_area_id}
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
        {farmers.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>User Id</CTableHeaderCell>
                        <CTableHeaderCell>First Name</CTableHeaderCell>
                        <CTableHeaderCell>Last Name</CTableHeaderCell>
                        <CTableHeaderCell>NIC</CTableHeaderCell>
                        <CTableHeaderCell>Assigned Office</CTableHeaderCell>
                        <CTableHeaderCell>Assigned Field Area</CTableHeaderCell>
                        <CTableHeaderCell>Tax File No</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {farmers.map((farmer) => (
                        // console.log(farmer),
                        <CTableRow key={farmer.farmer.user_id}>
                          <CTableDataCell>{farmer.farmer.user_id}</CTableDataCell>
                          <CTableDataCell>{farmer.user.first_name}</CTableDataCell>
                          <CTableDataCell>{farmer.user.last_name}</CTableDataCell>
                          <CTableDataCell>{farmer.user.nic}</CTableDataCell>
                          <CTableDataCell>{farmer.farmer.assigned_office_id}</CTableDataCell>
                          <CTableDataCell>{farmer.farmer.assigned_field_area_id}</CTableDataCell>
                          <CTableDataCell>{farmer.farmer.tax_file_no}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              className="me-2"
                              color="danger"
                              onClick={() => handleDelete(farmer.user.user_id)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                            {/* <CButton color="info" onClick={() => handleUpdate(user.user_id)}>
                                  <CIcon icon={cilPencil} />
                                </CButton> */}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
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

export default SearchFarmerForm
