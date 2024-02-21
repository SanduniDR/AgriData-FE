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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilFactory,
  cilAddressBook,
  cilTag,
  cilUser,
  cilLocationPin,
  cilInput,
} from '@coreui/icons'

const AddFarmForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    type: '',
    farmer_id: '',
    area_of_field: '',
    owner_nic: '',
    owner_name: '',
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
      .post('http://127.0.0.1:5000/farm', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('Farm was added Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          alert('This farm already exists.')
        } else if (error.response && error.response.status === 404) {
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
                  <h1>Add Farm</h1>
                  <p className="text-medium-emphasis">Add Farm details</p>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilFactory} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farm name"
                      autoComplete="Farm name"
                      onChange={handleInputChange}
                      name="farm_name"
                      value={formData.farm_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilAddressBook} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Address"
                      autoComplete="Address"
                      onChange={handleInputChange}
                      name="address"
                      value={formData.address}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilTag} />
                    </CInputGroupText>
                    <CFormSelect
                      placeholder="Farm Type"
                      autoComplete="Type"
                      onChange={handleInputChange}
                      name="type"
                      value={formData.type}
                    >
                      <option value="">Select Type</option>
                      <option value="Animal">Animal</option>
                      <option value="Crop">Cultivation</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farmer ID"
                      autoComplete="Farmer ID"
                      onChange={handleInputChange}
                      name="farmer_id"
                      value={formData.farmer_id}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Area of Field"
                      autoComplete="Area of Field"
                      onChange={handleInputChange}
                      name="area_of_field"
                      value={formData.area_of_field}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilInput} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Owner NIC"
                      autoComplete="Owner NIC"
                      onChange={handleInputChange}
                      name="owner_nic"
                      value={formData.owner_nic}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Owner Name"
                      autoComplete="Owner Name"
                      onChange={handleInputChange}
                      name="owner_name"
                      value={formData.owner_name}
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

export default AddFarmForm
