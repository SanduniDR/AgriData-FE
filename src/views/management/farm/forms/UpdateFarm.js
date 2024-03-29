import { React, useState } from 'react'
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
import { API_BASE_URL } from 'src/Config'
import {
  cilAddressBook,
  cilCreditCard,
  cilFactory,
  cilLocationPin,
  cilTags,
  cilUser,
} from '@coreui/icons'

const UpdateFarmForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    farm_name: '',
    address: '',
    type: '',
    farmer_id: '',
    area_of_field: '',
    owner_nic: '',
    owner_name: '',
  })

  const [isFarmFound, setIsFarmFound] = useState(false)
  const [farm_id, setFarmId] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    if (name === 'farm_id') {
      setFarmId(value)
    }
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
     
      return
    }

    axios
      .put(`${API_BASE_URL}/farm/${farm_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('Farm Updated Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          alert('Farm already exists.')
        } else {
          alert('An error occurred.')
        }
      })
  }

  const clearForm = () => {
    setFormData({
      farm_name: '',
      address: '',
      type: '',
      farmer_id: '',
      area_of_field: '',
      owner_nic: '',
      owner_name: '',
    })
    setIsFarmFound(false)
  }

  const handleSearchFarm = (farmId) => {
    // Call the backend API to search for the farm by ID
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
     
      return
    }

    axios
      .get(`${API_BASE_URL}/farm/${farmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const farm = response.data
        if (farm) {
          setIsFarmFound(true)
          setFormData((prevFormData) => ({
            ...prevFormData,
            farm_name: farm.farm_name,
            address: farm.address,
            type: farm.type,
            farmer_id: farm.farmer_id,
            area_of_field: farm.area_of_field,
            owner_nic: farm.owner_nic,
            owner_name: farm.owner_name,
          }))
        } else {
          setIsFarmFound(false)
          alert('No farm found, Please Search the farm again in Search Farm')
        }
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while searching for the farm.')
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
                  <h1>Update a Farm</h1>
                  <p className="text-medium-emphasis">Update farm details</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Farm ID"
                      autoComplete="Farm ID"
                      onChange={handleInputChange}
                      name="farm_id"
                      value={farm_id}
                    />
                    <CButton color="primary" onClick={() => handleSearchFarm(farm_id)}>
                      Search
                    </CButton>
                  </CInputGroup>
                  {isFarmFound ? (
                    <>
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilFactory} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Farm Name"
                          autoComplete="Farm Name"
                          onChange={handleInputChange}
                          name="farm_name"
                          value={formData.farm_name}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilTags} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Type"
                          autoComplete="Type"
                          onChange={handleInputChange}
                          name="type"
                          value={formData.type}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
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
                      <CInputGroup className={`mb-3`}>
                        <CInputGroupText>
                          <CIcon icon={cilCreditCard} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Owner NIC"
                          autoComplete="Owner NIC"
                          onChange={handleInputChange}
                          name="owner_nic"
                          value={formData.owner_nic}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3`}>
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
                        <CButton color="success" onClick={handleSubmit}>
                          Update Farm
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

export default UpdateFarmForm
