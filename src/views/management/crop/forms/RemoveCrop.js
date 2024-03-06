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
import { cilUser, cilPlant, cilFork, cilDescription } from '@coreui/icons'
import { API_BASE_URL } from 'src/Config'

const RemoveUserForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    crop_name: '',
    breed: '',
    description: '',
  })

  const [isCropFound, setIsCropFound] = useState(false)
  const [cropId, setCropId] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    if (name === 'crop_id') {
      if (value !== '') {
        setCropId(value)
      } else {
        setIsCropFound(false)
        setCropId('')
      }
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
      .delete(`${API_BASE_URL}/crop/remove/${cropId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        if (response.status === 202) {
          clearForm()
          alert('Crop removed successfully.')
        }
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred.')
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
        if (error.response.status === 404) {
          alert('No crop found, Please Search the crop again in Search Crop')
          return
        }
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
                {/* {isFormEmpty && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all the fields.
                  </div>
                )} */}
                <CForm>
                  <h1>Remove a Crop</h1>
                  <p className="text-medium-emphasis">Remove a crop</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Crop ID"
                      autoComplete="Crop ID"
                      onChange={handleInputChange}
                      name="crop_id"
                      value={cropId}
                    />
                    <CButton color="primary" onClick={() => handleSearchCrop(cropId)}>
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
                          Remove Crop
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

export default RemoveUserForm
