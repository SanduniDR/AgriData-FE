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
  cilHealing,
  cilHospital,
  cilNoteAdd,
} from '@coreui/icons'

const UpdateAidForm = () => {
  const [formData, setFormData] = useState({
    aid_name: '',
    in_charged_office_id: '',
    description: '',
    year: '',
    aid_id: '',
    aid_batch: '',
  })
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [ai_id, setAidId] = useState('')
  const [isAidFound, setIsAidFound] = useState(false)

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
    if (name === 'aid_id') {
      setAidId(value)
    }
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
      .put(`${API_BASE_URL}/aid/${ai_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('The Aid with ID ' + ai_id + ' was updated Successfully!')
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

  const clearForm = () => {
    setFormData({
      aid_batch: '',
      aid_id: '',
      year: '',
      description: '',
      in_charged_office_id: '',
    })
    setAidId('')
    setIsAidFound(false)
  }

  const handleGetAidInfo = (ai_id) => {
    // Call the backend API to search for the aid by ID
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    axios
      .get(`${API_BASE_URL}/aid/${ai_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const aid = response.data
        if (Object.keys(aid).length > 0) {
          setIsAidFound(true)
          setFormData((prevFormData) => ({
            ...prevFormData,
            aid_batch: aid.aid_batch,
            aid_name: aid.aid_name,
            year: aid.year,
            in_charged_office_id: aid.in_charged_office_id,
            description: aid.description,
          }))
        } else {
          setIsAidFound(false)
          console.log(Object.keys(aid).length)
          alert(
            'No Aid info found, Please contact the system administrator or check Aid Id and try again.',
          )
        }
      })
      .catch(function (error) {
        console.error(error)
        setIsAidFound(false)
        alert('An error occurred while searching for Aids.')
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
                  <h1>Update Aid information</h1>
                  <p className="text-medium-emphasis">
                    Update Aid information that already exists in the system
                  </p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilNoteAdd} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid ID"
                      autoComplete="Aid ID"
                      onChange={handleInputChange}
                      name="aid_id"
                      value={ai_id}
                    />
                    <CButton color="primary" onClick={() => handleGetAidInfo(ai_id)}>
                      Search
                    </CButton>
                  </CInputGroup>
                  {isAidFound ? (
                    <>
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

export default UpdateAidForm
