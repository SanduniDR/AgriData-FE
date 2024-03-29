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

const SearchCropForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    crop_id: '',
    crop_name: '',
    breed: '',
    description: '',
  })
  const [crops, setCrops] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setCrops([])
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // Call the backend API to fetch users for the new page
    const token = localStorage.getItem('token')
    let q = ''
    Object.values(formData).forEach((value) => {
      if (value !== '') {
        q = value
      }
    })

    axios
      .get(`${API_BASE_URL}/crop/search`, {
        params: {
          ...formData,
          page: newPage,
          q: q,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setCrops(response.data.crops)
        console.log(response.data.crops)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
        console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching users for the new page.')
      })
  }

  const handleDelete = (cropId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the user
    console.log(cropId)
    axios
      .delete(`${API_BASE_URL}/crop/remove/${cropId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('Crop deleted successfully.')
        // Refresh the user list
        handleCleanForm()
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          handleCleanForm()
        } else {
          alert('An error occurred while deleting the crop.')
        }
      })
  }

  const handleUpdate = (cropID) => {
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

    let q = ''
    Object.values(formData).forEach((value) => {
      if (value !== '') {
        q = value
      }
    })

    axios
      .get(`${API_BASE_URL}/crop/search`, {
        params: {
          ...formData,
          page: currentPage,
          q: q,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // const { data, totalPages } = response.data
        setCrops(response.data.crops)
        console.log(response.data.crops)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
        console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching crops for the new page.')
      })
  }

  const handleCleanForm = () => {
    setFormData({
      crop_name: '',
      breed: '',
      description: '',
    })
    setCrops([])
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
                  <h1>Search Crops</h1>
                  <p className="text-medium-emphasis">Filter crop records</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Crop Name"
                      autoComplete="Crop Name"
                      onChange={handleInputChange}
                      name="crop_name"
                      value={formData.crop_name}
                      disabled={formData.crop_id || formData.breed}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Crop Id"
                      autoComplete="Crop Id"
                      onChange={handleInputChange}
                      name="crop_id"
                      value={formData.crop_id}
                      disabled={formData.crop_name || formData.breed}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilCreditCard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="breed"
                      autoComplete="Breed"
                      onChange={handleInputChange}
                      name="breed"
                      value={formData.breed}
                      disabled={formData.crop_name || formData.crop_id}
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
        {crops.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Crop ID</CTableHeaderCell>
                        <CTableHeaderCell>Crop Name</CTableHeaderCell>
                        <CTableHeaderCell>Breed</CTableHeaderCell>
                        <CTableHeaderCell>Description</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {crops.map(
                        (crop) => (
                          console.log(crop),
                          (
                            <CTableRow>
                              <CTableDataCell>{crop.crop_id}</CTableDataCell>
                              <CTableDataCell>{crop.crop_name}</CTableDataCell>
                              <CTableDataCell>{crop.breed}</CTableDataCell>
                              <CTableDataCell>{crop.description}</CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(crop.crop_id)}
                                >
                                  Delete
                                </CButton>
                                {/* <CButton color="info" onClick={() => handleUpdate(user.user_id)}>
                                  Update
                                </CButton> */}
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

export default SearchCropForm
