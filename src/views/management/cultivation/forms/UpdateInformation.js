import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { getCultivationInfoById, updateCultivationInfo } from 'src/api/CultivationService'
import SelectArea from 'src/views/maps/SelectArea'

const UpdateInformation = () => {
  // To-do Call and get user roles list from backend and set the roles options

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    display_name: '',
    farm_id: '',
    crop_id: '',
    latitude: '',
    longitude: '',
    area_of_cultivation: '',
    started_date: '',
    estimated_harvesting_date: '',
    estimated_harvest: '',
    cultivation_info_id: '',
    harvested_date: '',
    harvested_amount: '',
    agri_year: '',
    quarter: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [isInfoFound, setInfoFound] = useState(false)
  const [cultivation, setCultivation] = useState({})
  const [isCultivationInformationSet, setCultInformation] = useState(false)
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
  }

  const handleCultInfoSearch = async () => {
    try {
      const info = await getCultivationInfoById(formData)
      if (info.status === 200 && info) {
        setInfoFound(true)
        setCultInformation(info.data)
        setFormData((prevFormData) => ({
          ...prevFormData,
          display_name: info.data.display_name,
          crop_id: info.data.crop_id,
          latitude: info.data.latitude,
          longitude: info.data.longitude,
          area_of_cultivation: info.data.area_of_cultivation,
          started_date: info.data.started_date,
          estimated_harvesting_date: info.data.estimated_harvesting_date,
          estimated_harvest: info.data.estimated_harvest,
          cultivation_info_id: info.data.cultivation_info_id,
          agri_year: info.data.agri_year,
          quarter: info.data.quarter,
          farm_id: info.data.farm_id,
          harvested_date: info.data.harvested_date,
          harvested_amount: info.data.harvested_amount,
        }))
      }
    } catch (error) {
      console.log('error occurred while fetching farm details', error)
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

  const formClear = () => {
    setFormData({
      area_of_cultivation: '',
      started_date: '',
      estimated_harvesting_date: '',
      estimated_harvest: '',
      cultivation_info_id: '',
      agri_year: '',
      quarter: '',
      farm_id: '',
      harvested_date: '',
      harvested_amount: '',
    })
    setInfoFound(false)
  }

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
          const response = await updateCultivationInfo(formData)
          console.log(response)
          if (response.request.status === 200) {
            setCultInformation(true)
            alert('Cultivation information updated successfully!')
          } else {
            alert('Error occurred while updating cultivation information.')
          }
        } catch (error) {
          console.error(error)
          alert('Error occurred while updating cultivation information.')
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
              {isInfoFound && cultivation ? (
                <CCardBody>
                  <div className="d-grid">
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Cultivation ID</CInputGroupText>
                      <CFormInput
                        placeholder="Cultivation ID"
                        autoComplete="Cultivation ID"
                        onChange={handleInputChange}
                        name="cultivation_info_id"
                        value={formData.cultivation_info_id}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Farm ID</CInputGroupText>
                      <CFormInput
                        placeholder="Farm ID"
                        autoComplete="Farm ID"
                        onChange={handleInputChange}
                        name="farm_id"
                        value={formData.farm_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Display Name</CInputGroupText>
                      <CFormInput
                        placeholder="Display Name"
                        autoComplete="Display Name"
                        onChange={handleInputChange}
                        name="display_name"
                        value={formData.display_name}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Crop ID</CInputGroupText>
                      <CFormInput
                        placeholder="Crop ID"
                        autoComplete="Crop ID"
                        onChange={handleInputChange}
                        name="crop_id"
                        value={formData.crop_id}
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
                            <CInputGroup className={`m-3 ms-0`}>
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

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Area of the Cultivation</CInputGroupText>
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
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Estimated Harvest</CInputGroupText>
                      <CFormInput
                        placeholder="Estimated Harvest"
                        autoComplete="Estimated Harvest"
                        onChange={handleInputChange}
                        name="estimated_harvest"
                        value={formData.estimated_harvest}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Agri Year</CInputGroupText>
                      <CFormInput
                        placeholder="Agri Year"
                        autoComplete="Agri Year"
                        onChange={handleInputChange}
                        name="agri_year"
                        value={formData.agri_year}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Quarter</CInputGroupText>
                      <CFormInput
                        placeholder="Quarter"
                        autoComplete="Quarter"
                        onChange={handleInputChange}
                        name="quarter"
                        value={formData.quarter}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Harvested Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Harvested Date"
                        autoComplete="Harvested Date"
                        onChange={handleInputChange}
                        name="harvested_date"
                        value={formData.harvested_date}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Harvest Amount</CInputGroupText>
                      <CFormInput
                        placeholder="Harvest Amount"
                        autoComplete="Harvest Amount"
                        onChange={handleInputChange}
                        name="harvested_amount"
                        value={formData.harvested_amount}
                      />
                    </CInputGroup>
                  </div>
                  <div className="d-grid">
                    <CButton
                      className="mb-3"
                      color="success"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Update Cultivation Info
                    </CButton>
                    {isCultivationInformationSet ? (
                      <>
                        {/* <div>Success! The info has been added.</div> */}
                        <CButton onClick={() => formClear()}>Clear</CButton>
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
                    <h1>Update cultivation details</h1>
                    <p className="text-medium-emphasis">Update cultivation details</p>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Cultivation ID"
                        autoComplete="Cultivation ID"
                        onChange={handleInputChange}
                        name="cultivation_info_id"
                        value={formData.cultivation_info_id}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={() => handleCultInfoSearch()}>
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

export default UpdateInformation
