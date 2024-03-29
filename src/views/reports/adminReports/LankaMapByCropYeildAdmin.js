import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapFeatureData from 'src/defaultData/LankaMapData/District_geo.json' // replace with the path to your MapFeatureData file
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'src/Config'
import Papa from 'papaparse'
import { exportData } from 'src/utils/Utils'
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
  searchCultivationInfoCountByYearly,
  searchCultivationInfoCountByMonthly,
  searchCultivationInfoCountByDistrictMonthly,
  searchCultivationInfoCountByDistrictMonthlyOffice,
} from 'src/api/MisReportService'

function MapFeatureDataLayer1({ formData }) {
  const { year, month, crop_id, district, office_id } = formData
  const mapNew = useMap(null)
  const info = useRef(null)
  const [data, setData] = useState(null)
  let geojson

  useEffect(() => {
    const freshStatesData = JSON.parse(JSON.stringify(MapFeatureData))
    if (
      formData.year !== '' &&
      formData.crop_id !== '' &&
      formData.month === '' &&
      formData.district === '' &&
      formData.office_id === ''
    ) {
      searchCultivationInfoCountByYearly(formData.year, formData.crop_id)
        .then((response) => {
          if (response.status === 200) {
            const apiData = response.data
            const apiDataByDistrict = apiData.reduce((acc, curr) => {
              acc[curr.district] = curr
              return acc
            }, {})

            freshStatesData.features.forEach((feature) => {
              const properties = feature.properties
              const apiDataForFeature = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
              if (apiDataForFeature) {
                feature.properties = { ...properties, ...apiDataForFeature }
              }
            })
            setData(freshStatesData)
          } else {
            setData(freshStatesData)
          }
        })
        .catch((error) => {
          setData(freshStatesData)
        })
    }
  }, [formData.year, formData.crop_id])

  useEffect(() => {
    if (
      formData.year !== '' &&
      formData.crop_id !== '' &&
      formData.month !== '' &&
      formData.district === '' &&
      formData.office_id === ''
    ) {
      const freshStatesData = JSON.parse(JSON.stringify(MapFeatureData))
      searchCultivationInfoCountByMonthly(formData.year, formData.crop_id, formData.month)
        .then((response) => {
          if (response.status === 200) {
            const apiData = response.data
            const apiDataByDistrict = apiData.reduce((acc, curr) => {
              acc[curr.district] = curr
              return acc
            }, {})

            freshStatesData.features.forEach((feature) => {
              const properties = feature.properties
              const apiDataForFeature = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
              if (apiDataForFeature) {
                feature.properties = { ...properties, ...apiDataForFeature }
              }
            })
            setData(freshStatesData)
          } else {
            setData(freshStatesData)
          }
        })
        .catch((error) => {
          setData(freshStatesData)
        })
    }
  }, [formData.year, formData.crop_id, formData.month])

  useEffect(() => {
    if (
      formData.year !== '' &&
      formData.crop_id !== '' &&
      formData.month !== '' &&
      formData.district !== '' &&
      formData.office_id === ''
    ) {
      const freshStatesData = JSON.parse(JSON.stringify(MapFeatureData))
      searchCultivationInfoCountByDistrictMonthly(
        formData.year,
        formData.crop_id,
        formData.month,
        formData.district,
      )
        .then((response) => {
          if (response.status === 200) {
            const apiData = response.data
            const apiDataByDistrict = apiData.reduce((acc, curr) => {
              acc[curr.district] = curr
              return acc
            }, {})

            freshStatesData.features.forEach((feature) => {
              const properties = feature.properties
              const apiDataForFeature = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
              if (apiDataForFeature) {
                feature.properties = { ...properties, ...apiDataForFeature }
              }
            })
            setData(freshStatesData)
          } else {
            setData(freshStatesData)
          }
        })
        .catch((error) => {
          setData(freshStatesData)
        })
    }
  }, [formData.year, formData.crop_id, formData.month, formData.district])

  useEffect(() => {
    if (
      formData.year !== '' &&
      formData.crop_id !== '' &&
      formData.month !== '' &&
      formData.district !== '' &&
      formData.office_id !== ''
    ) {
      const freshStatesData = JSON.parse(JSON.stringify(MapFeatureData))
      searchCultivationInfoCountByDistrictMonthlyOffice(
        formData.year,
        formData.crop_id,
        formData.month,
        formData.district,
        formData.office_id,
      )
        .then((response) => {
          if (response.status === 200) {
            const apiData = response.data
            const apiDataByDistrict = apiData.reduce((acc, curr) => {
              if (curr.crop_id === formData.crop_id) {
                acc[curr.district] = curr
              }
              return acc
            }, {})
            freshStatesData.features.forEach((feature) => {
              const properties = feature.properties
              const apiDataForFeature = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
              if (apiDataForFeature) {
                feature.properties = { ...properties, ...apiDataForFeature }
              }
            })
            setData(freshStatesData)
          } else {
            setData(freshStatesData)
          }
        })
        .catch((error) => {
          setData(freshStatesData)
        })
    }
  }, [formData.year, formData.crop_id, formData.month, formData.district, formData.office_id])

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
          '<h4 class="mapBanner" style="z-index: 500;"> District Overall Cultivation Info 2024 </h4>' +
          (props ? '<b>' + props.crop_name + ':' + props.total_harvested : 'Hover over a district')
      }

      info.current.addTo(mapNew)
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
      geojson = L.geoJSON(data, {
        style: function (feature) {
          return {
            fillColor: getColor(feature.properties.total_harvested),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5,
          }
        },
        onEachFeature: onEachFeature,
      }).addTo(mapNew)
    }
  }, [mapNew, data])

  return null
}

const LankaMapByCropYieldAdmin = () => {
  const center = [7.8731, 80.7718] // coordinates for Sri Lanka
  const [offices, setOffices] = useState([])
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataToDownload, setDownloadData] = useState([])
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
    setMapKey((prevKey) => prevKey + 10)
  }, [formData])

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
    const response = await getAllOfficesAndDistrictsByProvince(value)
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
    setFilteredOffices(filteredOffices)
  }

  const filterOfficesByDistrict = (offices, district) => {
    return offices.filter((office) => office.district === district)
  }

  const handleCleanForm = () => {
    setFormData({
      year: '',
      month: '',
      crop_id: '',
      type: '',
      district: '',
      office_id: '',
    })
  }

  //handle download data
  const handleDownloadData = (event) => {
    const csvData = Papa.unparse(dataToDownload)
    exportData(csvData, 'dataset.csv', 'text/csv;charset=utf-8;')
  }

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          <CContainer fluid>
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
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
                <CInputGroupText>
                  <CButton color="primary" onClick={handleCleanForm}>
                    Clear
                  </CButton>
                </CInputGroupText>
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
                <MapFeatureDataLayer1 formData={formData} />
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

MapFeatureDataLayer1.propTypes = {
  ADM2_EN: PropTypes.string.isRequired,
  total_cultivated: PropTypes.number.isRequired,
  total_harvested: PropTypes.string.isRequired,
  crop_name: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    crop_id: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    office_id: PropTypes.string.isRequired,
  }).isRequired,
}

export default LankaMapByCropYieldAdmin
