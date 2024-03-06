import { React, useEffect, useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription, cilFork, cilPlant, cilUser } from '@coreui/icons'
import { API_BASE_URL } from 'src/Config'

const UpdateCropForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    crop_name: '',
    breed: '',
    description: '',
  })

  const [isCropFound, setIsCropFound] = useState(false)
  const [crop_id, setCropId] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    if (name === 'crop_id') {
      setCropId(value)
    }
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .put(`${API_BASE_URL}/crop/update/${crop_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('Crop Updated Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          alert('Crop already exists.')
        } else {
          alert('An error occurred.')
        }
      })
  }

  const clearForm = () => {
    setFormData({
      crop_name: '',
      breed: '',
      description: '',
    })
    setIsCropFound(false)
  }

  const handleSearchCrop = (cropId) => {
    // Call the backend API to search for the crop by ID
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    axios
      .get(`${API_BASE_URL}/crop/crop_details/${cropId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const crop = response.data
        if (crop) {
          setIsCropFound(true)
          setFormData((prevFormData) => ({
            ...prevFormData,
            crop_name: crop.crop_name,
            breed: crop.breed,
            description: crop.description,
          }))
        } else {
          setIsCropFound(false)
          alert('No crop found, Please Search the crop again in Search Crop')
        }
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while searching for the crop.')
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Update a Crop</h1>
                  <p className="text-medium-emphasis">Update crop details</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Crop ID"
                      autoComplete="Crop ID"
                      onChange={handleInputChange}
                      name="crop_id"
                      value={crop_id}
                    />
                    <CButton color="primary" onClick={() => handleSearchCrop(crop_id)}>
                      Search
                    </CButton>
                  </CInputGroup>
                  {isCropFound ? (
                    <>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilPlant} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Crop Name"
                          autoComplete="Crop Name"
                          onChange={handleInputChange}
                          name="crop_name"
                          value={formData.crop_name}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilFork} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Breed"
                          autoComplete="Breed"
                          onChange={handleInputChange}
                          name="breed"
                          value={formData.breed}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilDescription} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Description"
                          autoComplete="Description"
                          onChange={handleInputChange}
                          name="description"
                          value={formData.description}
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton color="success" onClick={handleSubmit}>
                          Update Crop
                        </CButton>
                        <br />
                        <CButton color="danger" onClick={clearForm}>
                          Clear
                        </CButton>
                      </div>
                    </>
                  ) : null}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default UpdateCropForm
