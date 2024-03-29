import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { API_BASE_URL } from 'src/Config'
import { cilArrowCircleBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import iconImage from 'src/assets/map/paddy.png'
import {
  CContainer,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CInputGroup,
  CFormSelect,
  CInputGroupText,
  CButton,
  CPagination,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPaginationItem,
} from '@coreui/react'
import Spinner from 'react-bootstrap/Spinner'
import {
  getAllOfficesAndDistrictsByProvince,
  searchDisasterInfoByDistrictMonthlyOffice,
} from 'src/api/MisReportService'
import { convertJsonToCsv } from 'src/api/UserService'
import { saveAs } from 'file-saver'

const AdminDisasterOverview = () => {
  const center = [7.8731, 80.7718] // coordinates for Sri Lanka
  const [offices, setOffices] = useState([])
  const [disasterType, setDisasterType] = useState([])
  const [loading, setLoading] = useState(false)
  const [disasters, setDisasters] = useState([])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    crop_id: '',
    type: '',
    district: '',
    office_id: '',
    province: '',
  })
  const [districts, setDistrict] = useState([])
  const [filteredOffices, setFilteredOffices] = useState([])
  const [mapKey, setMapKey] = useState(0)
  const [markersData, setMarkersData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const sri_lanka_provinces = [
    'Central',
    'Eastern',
    'Northern',
    'Southern',
    'Western',
    'North Western',
    'North Central',
    'Uva Province',
    'Sabaragamuwa',
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${API_BASE_URL}/disaster/disasters/type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDisasterType(response.data.disasterTypes)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  //disaster type
  const handleTypeSelect = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  //Year
  const handleYearSelect = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  //MOnth
  const handleMonthSelect = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  //Province --gets offices and districts list from AgriOffice
  const handleProvinceChange = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    const response = await getAllOfficesAndDistrictsByProvince(value)
    console.log(response)
    setOffices(response.data.offices) //sets offices
    setDistrict(response.data.districts)
  }

  //District
  const handleDistrictChange = async (event) => {
    const { value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: value,
    }))
    const filteredOffices = filterOfficesByDistrict(offices, value)
    console.log('filtered offices', filteredOffices)
    setFilteredOffices(filteredOffices) //set resulting array to filteredOffices
  }
  //office
  const handleOfficeSelect = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const filterOfficesByDistrict = (offices, district) => {
    return offices.filter((office) => office.district === district) //if the condition true return the office
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    // Call the backend API to fetch users for the new page
    const token = localStorage.getItem('token')

    try {
      const response = await searchDisasterInfoByDistrictMonthlyOffice(formData, newPage)
      setDisasters(response.data.disasters)
      console.log(response.data.disasters)
      setTotalPages(response.data.total_pages)
      console.log(response.data.total_pages)
      console.log(totalPages)
    } catch (error) {
      console.error(error)
      alert('An error occurred while fetching users for the new page.')
    }
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    const response = await searchDisasterInfoByDistrictMonthlyOffice(formData, currentPage)
    console.log(response)
    setDisasters(response.data.disasters)
    console.log(response.data.disasters)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages)
    console.log(totalPages)
    setLoading(false)
  }

  const handleSendMessageCleanForm = () => {
    setFormData({
      year: '',
      month: '',
      crop_id: '',
      type: '',
      district: '',
      office_id: '',
      province: '',
    })
    setFilteredOffices([])
    setOffices([])
    setDistrict([])
    setFilteredOffices([])
    setDisasters([])
  }

  const handleDownload = () => {
    //dowanload as a csv file
    const csv = convertJsonToCsv(offices)
    const blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, 'OfficesInSelectedProvince.csv')
  }
  const handleDownloadDistrict = () => {
    //dowanload as a csv file
    const csv = convertJsonToCsv(filteredOffices)
    const blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, 'OfficesInSelectedDistrict.csv')
  }
  const handleDownloadDisaster = () => {
    //dowanload as a csv file
    const csv = convertJsonToCsv(disasters)
    const blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, 'DisasterInfo.csv')
  }

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          <CContainer>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol style={{ margin: '30px' }}>
                    <h4>Disaster OverView Report</h4>
                    <div style={{ height: 'auto', marginTop: '40px' }}>
                      <CInputGroup className={`mb-3`}>
                        <CFormSelect
                          custom
                          name="type"
                          value={formData.type}
                          onChange={handleTypeSelect}
                        >
                          {/* set the disaster types to drop down */}
                          <option value="">Disaster Type</option>
                          {disasterType.map((disaster, index) => (
                            <option key={index} value={disaster}>
                              {disaster}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CFormSelect
                          custom
                          name="year"
                          value={formData.year}
                          onChange={handleYearSelect}
                        >
                          <option value="">Select Year</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>Select Month</CInputGroupText>
                        <CFormSelect
                          name="month"
                          value={formData.month}
                          onChange={handleMonthSelect}
                        >
                          <option value="">Select Month</option>
                          {monthNames.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>Select Province</CInputGroupText>
                        <CFormSelect
                          onChange={handleProvinceChange}
                          name="province"
                          value={formData.province}
                        >
                          <option value="">Select Province</option>
                          {sri_lanka_provinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </CFormSelect>
                        {offices.length > 0 && (
                          <CInputGroupText>
                            <CButton color="secondary" onClick={handleDownload}>
                              Download offices in province{' '}
                            </CButton>
                          </CInputGroupText>
                        )}
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>Select District</CInputGroupText>
                        <CFormSelect
                          name="District"
                          value={formData.district}
                          onChange={handleDistrictChange}
                        >
                          <option value="">Select District</option>
                          {districts.map((district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          ))}
                        </CFormSelect>
                        {filteredOffices.length > 0 && (
                          <CInputGroupText>
                            <CButton color="secondary" onClick={handleDownloadDistrict}>
                              Download offices in district{' '}
                            </CButton>
                          </CInputGroupText>
                        )}
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>Select Office</CInputGroupText>
                        <CFormSelect
                          name="office_id"
                          value={formData.office_id}
                          onChange={handleOfficeSelect}
                        >
                          <option value="">Select Office</option>
                          {filteredOffices.map((office, index) => (
                            <option key={index} value={office.agri_office_id}>
                              {office.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton color="success" onClick={handleSubmit}>
                          Submit
                        </CButton>

                        <br />
                        <CButton color="secondary" onClick={handleSendMessageCleanForm}>
                          Clear
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            {disasters.length !== 0 ? (
              <CRow className="justify-content-center mt-4">
                <CCol xs={12}>
                  <CCard className="mx-4">
                    <CCardBody className="p-4">
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Disaster info Id</CTableHeaderCell>
                            <CTableHeaderCell>Crop Id</CTableHeaderCell>
                            <CTableHeaderCell>Crop Name</CTableHeaderCell>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>District</CTableHeaderCell>
                            <CTableHeaderCell>Office Id</CTableHeaderCell>
                            <CTableHeaderCell>Type</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {disasters.map(
                            (disaster) => (
                              console.log(disaster),
                              (
                                <CTableRow>
                                  <CTableDataCell>{disaster.disaster_info_id}</CTableDataCell>
                                  <CTableDataCell>{disaster.crop_id}</CTableDataCell>
                                  <CTableDataCell>{disaster.crop_name}</CTableDataCell>
                                  <CTableDataCell>{disaster.date}</CTableDataCell>
                                  <CTableDataCell>{disaster.district}</CTableDataCell>
                                  <CTableDataCell>{disaster.office_id}</CTableDataCell>
                                  <CTableDataCell>{disaster.type}</CTableDataCell>
                                  <CTableDataCell>
                                    <CInputGroupText>
                                      <CButton color="success" onClick={handleDownloadDisaster}>
                                        Download{' '}
                                      </CButton>
                                    </CInputGroupText>
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
        </>
      )}
    </div>
  )
}

export default AdminDisasterOverview
