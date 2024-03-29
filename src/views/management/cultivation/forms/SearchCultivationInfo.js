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
import { searchCultivationInfo } from 'src/api/CultivationService'
import ShowMap from 'src/views/maps/ShowMap'

const SearchCultivationInfo = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    farm_id: '',
    crop_id: '',
    agri_year: '',
    quarter: '',
  })

  const [cultivations, setCultivations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setCultivations([])
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchCultivationInfo(formData, currentPage, 10)
    //const { data, total_pages } = response
    setCultivations(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = (cultivation_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the cultivation
    console.log(cultivation_id)
    axios
      .delete(`${API_BASE_URL}/cultivation/${cultivation_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('Cultivation deleted successfully.')
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

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchCultivationInfo(formData, currentPage, 10)
    setCultivations(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleCleanForm = () => {
    setFormData({
      farm_id: '',
      crop_id: '',
      agri_year: '',
      quarter: '',
    })
    setCultivations([])
    setCurrentPage(1)
  }

  const handleMapOpenClick = (value, longi, latti) => {
    if (!value) {
      console.log(longi, 'longi')
      localStorage.setItem('longitude', longi)
      localStorage.setItem('latitude', latti)
    }
    setIsMapOpen(!value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              {isMapOpen ? (
                <ShowMap />
              ) : (
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Cultivation info</h1>
                    <p className="text-medium-emphasis">Filter cultivation records</p>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Farm ID"
                        autoComplete="Farm ID"
                        onChange={handleInputChange}
                        name="farm_id"
                        value={formData.farm_id}
                        disabled={formData.crop_id || formData.agri_year || formData.quarter}
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
                        disabled={formData.farm_id || formData.agri_year || formData.quarter}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Agri Year"
                        autoComplete="Agri Year"
                        onChange={handleInputChange}
                        name="agri_year"
                        value={formData.agri_year}
                        disabled={formData.farm_id || formData.crop_id || formData.quarter}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Quarter"
                        autoComplete="Quarter"
                        onChange={handleInputChange}
                        name="quarter"
                        value={formData.quarter}
                        disabled={formData.farm_id || formData.crop_id || formData.agri_year}
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
              )}
            </CCard>
          </CCol>
        </CRow>
        {cultivations.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Farm ID</CTableHeaderCell>
                        <CTableHeaderCell>Crop ID</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Location</CTableHeaderCell>
                        <CTableHeaderCell>Estimated Harvest</CTableHeaderCell>
                        <CTableHeaderCell>Agri Year</CTableHeaderCell>
                        <CTableHeaderCell>Quarter</CTableHeaderCell>
                        <CTableHeaderCell>Estimated Harvesting Date</CTableHeaderCell>
                        <CTableHeaderCell>Harvested Date</CTableHeaderCell>
                        <CTableHeaderCell>Harvested Amount</CTableHeaderCell>
                        <CTableHeaderCell>Recorded Date</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {cultivations.map(
                        (cultivation) => (
                          console.log(cultivation),
                          (
                            <CTableRow>
                              <CTableDataCell>{cultivation.farm_id}</CTableDataCell>
                              <CTableDataCell>{cultivation.crop_id}</CTableDataCell>
                              <CTableDataCell>{cultivation.display_name}</CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  onClick={() =>
                                    handleMapOpenClick(
                                      isMapOpen,
                                      cultivation.longitude,
                                      cultivation.latitude,
                                    )
                                  }
                                >
                                  {isMapOpen ? 'Close' : 'View Map'}
                                </CButton>
                              </CTableDataCell>
                              <CTableDataCell>{cultivation.estimated_harvest}</CTableDataCell>
                              <CTableDataCell>{cultivation.agri_year}</CTableDataCell>
                              <CTableDataCell>{cultivation.quarter}</CTableDataCell>
                              <CTableDataCell>
                                {cultivation.estimated_harvesting_date}
                              </CTableDataCell>
                              <CTableDataCell>{cultivation.harvested_date}</CTableDataCell>
                              <CTableDataCell>{cultivation.harvested_amount}</CTableDataCell>
                              <CTableDataCell>{cultivation.added_date}</CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(cultivation.cultivation_id)}
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
                  </CTable>
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

export default SearchCultivationInfo
