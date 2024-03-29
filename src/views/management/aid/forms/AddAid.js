import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from 'src/Config'
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
import {
  cilPlant,
  cilFork,
  cilDescription,
  cilBuilding,
  cilApplicationsSettings,
} from '@coreui/icons'

const AddAidForm = () => {
  const [formData, setFormData] = useState({
    aid_name: '',
    in_charged_office_id: '',
    description: '',
    year: '',
    aid_batch: '',
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
      .post(`${API_BASE_URL}/aid`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('Aid was added Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          // alert('This aid already exists.')
          alert(error.response.data.message)
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
                  <h1>Add Aid information</h1>
                  <p className="text-medium-emphasis">Add Aid to deliver to the farmers</p>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilPlant} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid Name"
                      autoComplete="Aid name"
                      onChange={handleInputChange}
                      name="aid_name"
                      value={formData.aid_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilFork} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Year"
                      autoComplete="year"
                      onChange={handleInputChange}
                      name="year"
                      value={formData.year}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="In Charged Office ID"
                      autoComplete="In Charged Office ID"
                      onChange={handleInputChange}
                      name="in_charged_office_id"
                      value={formData.in_charged_office_id}
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
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilApplicationsSettings} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid Batch"
                      autoComplete="Aid Batch"
                      onChange={handleInputChange}
                      name="aid_batch"
                      value={formData.aid_batch}
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

export default AddAidForm
