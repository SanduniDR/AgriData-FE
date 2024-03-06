import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { cilUser, cilTrash } from '@coreui/icons'

const SearchFarmForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    farm_id: '',
    farm_name: '',
    address: '',
    type: '',
    farmer_id: '',
    area_of_field: '',
    owner_nic: '',
    owner_name: '',
  })
  const [farms, setFarms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setFarms([])
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // Call the backend API to fetch farms for the new page
    const token = localStorage.getItem('token')
    let q = ''
    Object.values(formData).forEach((value) => {
      if (value !== '') {
        q = value
      }
    })

    axios
      .get(`${API_BASE_URL}/farm/search`, {
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
        setFarms(response.data.farms)
        console.log(response.data.farms)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
        console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching farms for the new page.')
      })
  }

  const handleDelete = (farmId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the farm
    console.log(farmId)
    axios
      .delete(`${API_BASE_URL}/farm/${farmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('Farm deleted successfully.')
        // Refresh the farm list
        handleCleanForm()
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          handleCleanForm()
        } else {
          alert('An error occurred while deleting the farm.')
        }
      })
  }

  // const handleUpdate = (farmID) => {
  //   // Navigate to the update farm page with the selected farm ID
  //   // setActiveTabKey('2'); // Set the activeKey to the key of TabPane 2
  // }

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
      .get(`${API_BASE_URL}/farm/search`, {
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
        setFarms(response.data.farms)
        console.log(response.data.farms)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
        console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching farms for the new page.')
      })
  }

  const handleCleanForm = () => {
    setFormData({
      farm_id: '',
      farm_name: '',
      address: '',
      type: '',
      farmer_id: '',
      area_of_field: '',
      owner_nic: '',
      owner_name: '',
    })
    setFarms([])
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
                  <h1>Search Farms</h1>
                  <p className="text-medium-emphasis">Filter farm records</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farm Name"
                      autoComplete="Farm Name"
                      onChange={handleInputChange}
                      name="farm_name"
                      value={formData.farm_name}
                      disabled={
                        formData.farm_id ||
                        formData.address ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farm Id"
                      autoComplete="Farm Id"
                      onChange={handleInputChange}
                      name="farm_id"
                      value={formData.farm_id}
                      disabled={
                        formData.farm_name ||
                        formData.address ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Address"
                      autoComplete="Address"
                      onChange={handleInputChange}
                      name="address"
                      value={formData.address}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Type"
                      autoComplete="Type"
                      onChange={handleInputChange}
                      name="type"
                      value={formData.type}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.address ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farmer Id"
                      autoComplete="Farmer Id"
                      onChange={handleInputChange}
                      name="farmer_id"
                      value={formData.farmer_id}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.address ||
                        formData.type ||
                        formData.area_of_field ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Area of Field"
                      autoComplete="Area of Field"
                      onChange={handleInputChange}
                      name="area_of_field"
                      value={formData.area_of_field}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.address ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.owner_nic ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Owner NIC"
                      autoComplete="Owner NIC"
                      onChange={handleInputChange}
                      name="owner_nic"
                      value={formData.owner_nic}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.address ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_name
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Owner Name"
                      autoComplete="Owner Name"
                      onChange={handleInputChange}
                      name="owner_name"
                      value={formData.owner_name}
                      disabled={
                        formData.farm_name ||
                        formData.farm_id ||
                        formData.address ||
                        formData.type ||
                        formData.farmer_id ||
                        formData.area_of_field ||
                        formData.owner_nic
                      }
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
        {farms.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Farm ID</CTableHeaderCell>
                        <CTableHeaderCell>Farm Name</CTableHeaderCell>
                        <CTableHeaderCell>Address</CTableHeaderCell>
                        <CTableHeaderCell>Type</CTableHeaderCell>
                        <CTableHeaderCell>Farmer ID</CTableHeaderCell>
                        <CTableHeaderCell>Area of Field</CTableHeaderCell>
                        <CTableHeaderCell>Owner NIC</CTableHeaderCell>
                        <CTableHeaderCell>Owner Name</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {farms.map(
                        (farm) => (
                          console.log(farm),
                          (
                            <CTableRow>
                              <CTableDataCell>{farm.farm_id}</CTableDataCell>
                              <CTableDataCell>{farm.farm_name}</CTableDataCell>
                              <CTableDataCell>{farm.address}</CTableDataCell>
                              <CTableDataCell>{farm.type}</CTableDataCell>
                              <CTableDataCell>{farm.farmer_id}</CTableDataCell>
                              <CTableDataCell>{farm.area_of_field}</CTableDataCell>
                              <CTableDataCell>{farm.owner_nic}</CTableDataCell>
                              <CTableDataCell>{farm.owner_name}</CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(farm.farm_id)}
                                >
                                  <CIcon icon={cilTrash} />
                                </CButton>
                                {/* <CButton color="info" onClick={() => handleUpdate(user.user_id)}>
                                  <CIcon icon={cilPencil} />
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

export default SearchFarmForm
