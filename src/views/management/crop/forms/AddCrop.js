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
import { cilPlant, cilFork, cilDescription } from '@coreui/icons'
import { API_BASE_URL } from 'src/Config'

const AddCropForm = () => {
  const [formData, setFormData] = useState({
    crop_name: '',
    breed: '',
    description: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  if (!token) {
    alert('Please login first.')
    navigate('/login', { replace: true })
    return
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/crop/add_crop`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('Crop was added Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          alert('This crop already exists.')
        } else {
          alert('An error occurred.')
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {isFormEmpty && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all the fields.
                  </div>
                )}
                <CForm>
                  <h1>Add Crop Type</h1>
                  <p className="text-medium-emphasis">Add Crop details</p>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilPlant} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Crop name"
                      autoComplete="Crop name"
                      onChange={handleInputChange}
                      name="crop_name"
                      value={formData.crop_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
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
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
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
                    <CButton color="success" onClick={handleSubmit} disabled={isFormEmpty}>
                      Submit
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AddCropForm
