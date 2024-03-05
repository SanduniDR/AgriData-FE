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
} from '@coreui/react'
import Spinner from 'react-bootstrap/Spinner'
import {
  getAllOfficesAndDistrictsByProvince,
  searchCultivationMapInfoByDistrictMonthlyOffice,
} from 'src/api/MisReportService'
import PropTypes from 'prop-types'

function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const LankaMapByFieldMapping = () => {
  const center = [7.8731, 80.7718] // coordinates for Sri Lanka
  const [offices, setOffices] = useState([])
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState([])
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
  })
  const [districts, setDistrict] = useState([])
  const [filteredOffices, setFilteredOffices] = useState([])
  const [mapKey, setMapKey] = useState(0)
  const [markersData, setMarkersData] = useState([])
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
  const myIcon = new L.Icon({
    iconUrl: iconImage,
    iconSize: [20, 50],
  })

  let bounds = null
  if (markersData.length > 0) {
    bounds = L.latLngBounds(markersData.map((data) => [data.latitude, data.longitude]))
  }

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1)
  }, [formData])

  useEffect(() => {
    if (
      formData.year !== '' &&
      formData.crop_id !== '' &&
      formData.month !== '' &&
      formData.district !== '' &&
      formData.office_id !== ''
    ) {
      searchCultivationMapInfoByDistrictMonthlyOffice(
        formData.year,
        formData.crop_id,
        formData.month,
        formData.district,
        formData.office_id,
      )
        .then((response) => {
          if (response.status === 200) {
            setMarkersData(response.data)
            console.log('response', response.data)
          }
        })
        .catch((error) => {})
    }
  }, [formData.year, formData.crop_id, formData.month, formData.district, formData.office_id])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${API_BASE_URL}/crop/crops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCrops(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleTypeSelect = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleYearSelect = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleMonthSelect = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleProvinceChange = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    const response = await getAllOfficesAndDistrictsByProvince(value)
    console.log(response)
    setOffices(response.data.offices)
    setDistrict(response.data.districts)
  }

  const handleDistrictChange = async (event) => {
    const { value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: value,
    }))
    const filteredOffices = filterOfficesByDistrict(offices, value)
    console.log('filtered offices', filteredOffices)
    setFilteredOffices(filteredOffices)
  }

  const filterOfficesByDistrict = (offices, district) => {
    return offices.filter((office) => office.district === district)
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
                    <h4>Crop Yield Report</h4>
                    <div style={{ height: 'auto', marginTop: '40px' }}>
                      <CInputGroup className={`mb-3`}>
                        <CFormSelect
                          custom
                          name="crop_id"
                          value={formData.crop_id}
                          onChange={handleTypeSelect}
                        >
                          <option value="">Crop Type</option>
                          {crops.map((crop, index) => (
                            <option key={index} value={crop.crop_id}>
                              {crop.crop_name}
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
                          <option value="2024">2023</option>
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
                        <CInputGroupText>
                          <CButton color="secondary">
                            <CIcon icon={cilArrowCircleBottom} />
                          </CButton>
                        </CInputGroupText>
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
                        <CInputGroupText>
                          <CButton color="secondary">
                            <CIcon icon={cilArrowCircleBottom} />
                          </CButton>
                        </CInputGroupText>
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>Select Office</CInputGroupText>
                        <CFormSelect
                          name="office_id"
                          value={formData.office_id}
                          onChange={handleTypeSelect}
                        >
                          <option value="">Select Office</option>
                          {filteredOffices.map((office, index) => (
                            <option key={index} value={office.agri_office_id}>
                              {office.name}
                            </option>
                          ))}
                        </CFormSelect>
                        <CInputGroupText>
                          <CButton color="secondary">
                            <CIcon icon={cilArrowCircleBottom} />
                          </CButton>
                        </CInputGroupText>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CContainer>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'top',
                height: '700px',
              }}
            >
              <MapContainer
                key={mapKey}
                center={center}
                zoom={8}
                style={{ height: '700px', width: '500px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  maxZoom={16}
                />

                {bounds && <ChangeView center={bounds.getCenter()} zoom={13} />}

                {markersData.map(
                  (data, index) => (
                    console.log('dataToAdd', data),
                    (
                      <Marker
                        key={index}
                        position={[data.latitude, data.longitude]}
                        icon={myIcon}
                      />
                    )
                  ),
                )}
              </MapContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function getColor(d) {
  if (d > 4500) {
    return '#ccece6'
  } else if (d > 4300) {
    return '#99d8c9'
  } else if (d > 3750) {
    return '#66c2a4'
  } else if (d > 3500) {
    return '#41ae76'
  } else if (d > 3250) {
    return '#238b45'
  } else if (d > 3000) {
    return '#006d2c'
  } else if (d > 100) {
    return '#00441b' // dark green
  } else {
    return '#edf8fb' // light green
  }
}

ChangeView.propTypes = {
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
}

export default LankaMapByFieldMapping
