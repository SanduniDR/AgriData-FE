import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getFarmById } from 'src/api/FarmService'
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilCloudUpload,
  cilCalendar,
  cilCreditCard,
  cilTag,
} from '@coreui/icons'
import { addCultivationInfo } from 'src/api/CultivationService'
import SelectArea from 'src/views/maps/SelectArea'

const AddCultivationInfo = () => {
  // To-do Call and get user roles list from backend and set the roles options

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    display_name: '',
    farm_id: '',
    crop_id: '',
    gps_location_link: '',
    latitude: '',
    longitude: '',
    area_of_cultivation: '',
    started_date: '',
    estimated_harvesting_date: '',
    estimated_harvest: '',
    agri_year: '',
    quarter: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isFarmFound, setFarmFound] = useState(false)
  const [farm, setFarm] = useState({})
  const [isCultivationInformationSet, setCultInformation] = useState(false)
  const [estHarvestedDate, setEstHarvestedDate] = useState('')
  const [startedDate, setStartedDate] = useState('')
  const [isErrorDates, setIsErrorDates] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(false)
  const [isMapOpen, setOpenMap] = useState(false)

  useEffect(() => {
    if (formData.estimated_harvesting_date.length > 0 && formData.started_date.length > 0) {
      if (formData.estimated_harvesting_date < formData.started_date) {
        setIsErrorDates(true)
      } else {
        setIsErrorDates(false)
      }
    }
  }, [formData.estimated_harvesting_date, formData.started_date])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    if (isFarmFound && farm) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        farm_id: farm.farm_id,
      }))
    }
  }

  const handleFarmSearch = async () => {
    try {
      const farm = await getFarmById(formData)
      if (farm.status === 200) {
        setFarmFound(true)
        setFarm(farm.data)
      }
    } catch (error) {
      alert('No farm found with the given ID')
    }
  }

  const handleSetGPSLocation = (value) => {
    setOpenMap(value)
    if (!value) {
      const coordinates = JSON.parse(localStorage.getItem('coordinates'))
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: coordinates[0],
        longitude: coordinates[1],
      }))
      setSelectedCoordinates(true)
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [selectedCoordinates])

  useEffect(() => {
    if (isFarmFound && farm) {
      console.log('Farm found', farm)
      setFormData((prevFormData) => ({
        ...prevFormData,
        farm_id: farm.farm_id,
      }))
      console.log(formData)
    }
  }, [isFarmFound, farm])

  const handleSubmit = async (event) => {
    console.log(formData)
    if (event) {
      event.preventDefault()

      if (Object.values(formData).some((value) => value === '' || value === null)) {
        setIsFormEmpty(true)
        alert('Please fill in all the fields.')
        return
      } else {
        try {
          const response = await addCultivationInfo(formData)
          console.log(response)
          if (response.request.status === 201) {
            setCultInformation(true)
            alert('Cultivation information added successfully!')
          } else {
            alert(response, 'Error occurred while adding cultivation information.')
          }
        } catch (error) {
          console.error(error)
          alert('Error occurred while adding cultivation information.')
        }
      }
    }
  }

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  useEffect(() => {
    console.log(isCultivationInformationSet)
  }, [isCultivationInformationSet])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              {isFarmFound && farm ? (
                <CCardBody>
                  <div className="d-grid">
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Farm ID"
                        autoComplete="Farm ID"
                        onChange={handleInputChange}
                        name="farm_id"
                        value={farm.farm_id}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Display Name"
                        autoComplete="Display Name"
                        onChange={handleInputChange}
                        name="display_name"
                        value={formData.display_name}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Crop ID"
                        autoComplete="Crop ID"
                        onChange={handleInputChange}
                        name="crop_id"
                        value={formData.crop_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="GPS Location Link"
                        autoComplete="GPS Location Link"
                        onChange={handleInputChange}
                        name="gps_location_link"
                        value={formData.gps_location_link}
                      />
                    </CInputGroup>
                    <div className="row">
                      {!isMapOpen ? (
                        <>
                          <div className="col-md-9">
                            <CInputGroup
                              className={`m-3 ms-0 mt-0 ${
                                isFormEmpty ? 'border border-danger' : ''
                              }`}
                            >
                              <CInputGroupText>Longitude</CInputGroupText>
                              <CFormInput
                                placeholder="GPS Location - longitude"
                                autoComplete="GPS Location - longitude"
                                onChange={handleInputChange}
                                name="longitude"
                                value={formData.longitude}
                              />
                            </CInputGroup>
                            <CInputGroup
                              className={`m-3 ms-0 ${isFormEmpty ? 'border border-danger' : ''}`}
                            >
                              <CInputGroupText>Latitude</CInputGroupText>
                              <CFormInput
                                placeholder="GPS Location - latitude"
                                autoComplete="GPS Location latitude"
                                onChange={handleInputChange}
                                name="gps_location_link"
                                value={formData.latitude}
                              />
                            </CInputGroup>
                          </div>
                          <div className="col-md-3 mb-2 d-flex align-items-center justify-content-center">
                            <CButton color="success" onClick={() => handleSetGPSLocation(true)}>
                              Use Map
                            </CButton>
                          </div>
                        </>
                      ) : (
                        <div className="col-md-12 mb-2 d-flex align-items-center justify-content-center">
                          <SelectArea userCoordinates={selectedCoordinates} />

                          <div className="col-sm-2 mb-2 d-flex align-items-center justify-content-center">
                            <CButton color="danger" onClick={() => handleSetGPSLocation(false)}>
                              Close
                            </CButton>
                          </div>
                        </div>
                      )}
                    </div>

                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Area of Cultivation"
                        autoComplete="Area of Cultivation"
                        onChange={handleInputChange}
                        name="area_of_cultivation"
                        value={formData.area_of_cultivation}
                      />
                    </CInputGroup>
                    <CInputGroup
                      className={`mb-3 ${
                        isFormEmpty || isErrorDates ? 'border border-danger' : ''
                      }`}
                    >
                      <CInputGroupText>Started Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Started Date"
                        autoComplete="Started Date"
                        onChange={handleInputChange}
                        name="started_date"
                        value={formData.started_date}
                      />
                    </CInputGroup>
                    <CInputGroup
                      className={`mb-3 ${
                        isFormEmpty || isErrorDates ? 'border border-danger' : ''
                      }`}
                    >
                      <CInputGroupText>Est. Harvesting Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Estimated Harvesting Date"
                        autoComplete="Estimated Harvesting Date"
                        onChange={handleInputChange}
                        name="estimated_harvesting_date"
                        value={formData.estimated_harvesting_date}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Estimated Harvest"
                        autoComplete="Estimated Harvest"
                        onChange={handleInputChange}
                        name="estimated_harvest"
                        value={formData.estimated_harvest}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Agri Year"
                        autoComplete="Agri Year"
                        onChange={handleInputChange}
                        name="agri_year"
                        value={formData.agri_year}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Quarter"
                        autoComplete="Quarter"
                        onChange={handleInputChange}
                        name="quarter"
                        value={formData.quarter}
                      />
                    </CInputGroup>
                  </div>
                  <div className="d-grid">
                    <CButton
                      className="mb-3"
                      color="success"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Add Cultivation Info
                    </CButton>
                    {isCultivationInformationSet ? (
                      <>
                        {/* <div>Success! The info has been added.</div> */}
                        <CButton onClick={() => navigate('/officer-dashboard', { replace: true })}>
                          Back to Home
                        </CButton>
                      </>
                    ) : null}
                  </div>
                </CCardBody>
              ) : (
                <CCardBody className="p-4">
                  {isFormEmpty && (
                    <div className="alert alert-danger" role="alert">
                      Please fill in all the fields.
                    </div>
                  )}
                  <CForm>
                    <h1>Add new cultivation details</h1>
                    <p className="text-medium-emphasis">Add cultivation details</p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Farm ID"
                        autoComplete="Farm ID"
                        onChange={handleInputChange}
                        name="farm_id"
                        value={formData.farm_id}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={() => handleFarmSearch()}>
                        Search
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              )}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AddCultivationInfo
