import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import statesData from 'src/defaultData/LankaMapData/District_geo.json' // replace with the path to your statesData file
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'src/Config'
import { cilArrowCircleBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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

import { getAllOfficesAndDistrictsByProvince } from 'src/api/MisReportService'

let geojson

function StatesDataLayer({ formData }) {
  const { year, month, crop, district, office } = formData
  const map = useMap()
  const info = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/report/cultivation-info/cropByDistrict`, {
        agri_year: year,
        month: month,
        crop: crop,
      })
      .then((response) => {
        if (response.status === 200) {
          const apiData = response.data
          const apiDataByDistrict = apiData.reduce((acc, curr) => {
            acc[curr.district] = curr
            return acc
          }, {})

          statesData.features.forEach((feature) => {
            const properties = feature.properties
            const apiDataForFeature = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
            if (apiDataForFeature) {
              feature.properties = { ...properties, ...apiDataForFeature }
            }
            console.log(feature.properties)
          })
          setData(statesData)
        } else {
          setData(statesData)
        }
      })
      .catch((error) => {
        setData(statesData)
      })
  }, [])

  useEffect(() => {
    if (!info.current) {
      // only create a new info control if it doesn't already exist
      info.current = L.control()

      info.current.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info')
        this.update()
        return this._div
      }

      info.current.update = function (props) {
        this._div.innerHTML =
          '<h4 class="mapBanner" style="z-index: 500;"> District Overall Cultivation Info 2024/h1 </h4>' +
          (props ? '<b>Paddy(Acrs):' + props.total_cultivated : 'Hover over a district')
      }

      info.current.addTo(map)
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: function (e) {
          const layer = e.target

          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9,
          })

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront()
          }

          info.current.update(layer.feature.properties)
        },
        mouseout: function (e) {
          geojson.resetStyle(e.target)
          info.current.update()
        },
      })
    }

    if (data) {
      geojson = L.geoJSON(statesData, {
        style: function (feature) {
          return {
            fillColor: getColor(feature.properties.total_cultivated),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5,
          }
        },
        onEachFeature: onEachFeature,
      }).addTo(map)
    }
  }, [map, data])

  return null
}

const LankaMapByCropYieldAdmin = () => {
  const center = [7.8731, 80.7718] // coordinates for Sri Lanka
  const [offices, setOffices] = useState([])
  const [crops, setCrops] = useState([])
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
    crop: '',
    district: '',
    office: '',
  })
  const [districts, setDistrict] = useState([])
  const [filteredOffices, setFilteredOffices] = useState([])
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
                      name="type"
                      value={formData.type}
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
                      onChange={handleTypeSelect}
                    >
                      <option value="">Select Year</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>Select Month</CInputGroupText>
                    <CFormSelect name="month" value={formData.month} onChange={handleTypeSelect}>
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
                    <CFormSelect name="office" value={formData.office} onChange={handleTypeSelect}>
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
            center={center}
            zoom={8}
            style={{ height: '700px', width: '500px' }}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            keyboard={false}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              maxZoom={8}
            />
            <StatesDataLayer formData={formData} />
          </MapContainer>
        </div>
      </div>
    </>
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

StatesDataLayer.propTypes = {
  ADM2_EN: PropTypes.string.isRequired,
  total_cultivated: PropTypes.number.isRequired,
  formData: PropTypes.shape({
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    crop: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
  }).isRequired,
}

export default LankaMapByCropYieldAdmin
