import { React, useState, useEffect } from 'react'
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
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilTrash,
  cilPlant,
  cilFork,
  cilBuilding,
  cilDescription,
  cilApplicationsSettings,
  cilPencil,
} from '@coreui/icons'

import { addFuelAid, searchFuelAid, deleteFuelAid, updateFuelAid } from 'src/api/AidService'
import { API_BASE_URL } from 'src/Config'

const Fuel = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aid_id: '',
    reason: '',
    fuel_type: '',
    description: '',
  })

  const [aids, setAids] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    aid_id: '',
    reason: '',
    fuel_type: '',
    description: '',
    fuelAid_id: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    setAids([])
  }

  const handleUpdateInputChange = (event) => {
    setCurrentRecord({
      ...currentRecord,
      [event.target.name]: event.target.value,
    })
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchFuelAid(formData, newPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (aid_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the cultivation
    console.log(aid_id)
    // axios
    //   .delete(`${API_BASE_URL}/aid/${aid_id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     alert('Aid deleted successfully.')
    //     // Refresh the farm list
    //     handleCleanForm()
    //   })
    //   .catch(function (error) {
    //     console.error(error)
    //     if (error.response.status === 404) {
    //       handleCleanForm()
    //     } else {
    //       alert('An error occurred while deleting the Aid.')
    //     }
    //   })
    const response = await deleteFuelAid(aid_id)
    if (response.status === 200) {
      alert('Aid deleted successfully.')
      handleCleanForm()
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchFuelAid(formData, currentPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      aid_id: '',
      reason: '',
      fuel_type: '',
      description: '',
    })
    setAids([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleAddFuel = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  const [isFormEmpty, setIsFormEmpty] = useState(false)
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

  const handleNewItemAddButtonSubmit = async (event) => {
    event.preventDefault()
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    const response = await addFuelAid(formData)
    console.log(response)
    if (response.status === 200) {
      alert('New Pesticide was added Successfully!')
    } else if (response.status === 409) {
      alert(response.data.message)
    } else {
      alert('Aid add failed.')
    }
  }

  const handleUpdate = async () => {
    const response = await updateFuelAid(currentRecord)
    console.log(response)
    if (response.status === 200) {
      alert('Aid updated successfully.')
    } else {
      alert('Aid update failed.')
    }
  }

  const handlePenClick = (currentRecord) => {
    setCurrentRecord(currentRecord)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    handleCleanForm()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {showForm ? (
        <CContainer>
          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton color="danger" onClick={handleAddFuel}>
                Close
              </CButton>
            </CCol>
          </CRow>
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
                    <h1>Add Fuel AId information</h1>
                    <p className="text-medium-emphasis">Add Fuel Aid information on distribution</p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilPlant} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilFork} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Reason"
                        autoComplete="Reason"
                        onChange={handleInputChange}
                        name="reason"
                        value={formData.reason}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Fuel Type</CInputGroupText>
                      </CInputGroupText>
                      <CFormSelect
                        placeholder="Fuel Type"
                        autoComplete="Fuel Type"
                        onChange={handleInputChange}
                        name="fuel_type"
                        value={formData.fuel_type}
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Other">Other</option>
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Description</CInputGroupText>
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
                      <CButton
                        color="success"
                        onClick={handleNewItemAddButtonSubmit}
                        disabled={isFormEmpty}
                      >
                        Submit
                      </CButton>{' '}
                      <br />
                      <CButton color="secondary" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol xs="auto" className={'mb-3'}>
              <CButton color="success" onClick={handleAddFuel}>
                + Add New Fuel Aid
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Fuel Aid info</h1>
                    <p className="text-medium-emphasis">Filter Aid records</p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilPlant} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilFork} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Reason"
                        autoComplete="Reason"
                        onChange={handleInputChange}
                        name="reason"
                        value={formData.reason}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Fuel Type</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Fuel Type"
                        autoComplete="Fuel Type"
                        onChange={handleInputChange}
                        name="fuel_type"
                        value={formData.fuel_type}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Description</CInputGroupText>
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
                      <CButton color="primary" onClick={handleSubmit}>
                        Search
                      </CButton>
                      <br />
                      <CButton color="danger" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {aids.length !== 0 ? (
            <CRow className="justify-content-center mt-4">
              <CCol xs={12}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Fuel AID ID</CTableHeaderCell>
                          <CTableHeaderCell>AID ID</CTableHeaderCell>
                          <CTableHeaderCell>Fuel Type</CTableHeaderCell>
                          <CTableHeaderCell>Reason</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {aids.map((aid) => (
                          <CTableRow key={aid.fuelAid_id}>
                            <CTableDataCell>{aid.fuelAid_id}</CTableDataCell>
                            <CTableDataCell>{aid.aid_id}</CTableDataCell>
                            <CTableDataCell>{aid.fuel_type}</CTableDataCell>
                            <CTableDataCell>{aid.reason}</CTableDataCell>
                            <CTableDataCell>{aid.description}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(aid.fuelAid_id)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                              <CButton color="info" onClick={() => handlePenClick(aid)}>
                                Update
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                    <CPagination
                      size="sm"
                      activePage={currentPage}
                      pages={totalPages}
                      onActivePageChange={(i) => handlePageChange(i)}
                    >
                      {Array.from({ length: totalPages }, (_, index) => (
                        <CPaginationItem
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </CPaginationItem>
                      ))}
                    </CPagination>
                    <CModal visible={showModal} onClose={() => setShowModal(false)}>
                      <CModalHeader onClose={handleClose}>
                        <CModalTitle>Update Record</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <CForm>
                          <h1>Update Aid information</h1>
                          <p className="text-medium-emphasis">
                            Update Aid to deliver to the farmers
                          </p>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilPlant} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="AId ID"
                              autoComplete="AID ID"
                              onChange={handleUpdateInputChange}
                              name="aid_id"
                              value={currentRecord.aid_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilFork} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Fuel Type"
                              autoComplete="Fuel Type"
                              onChange={handleUpdateInputChange}
                              name="fuel_type"
                              value={currentRecord.fuel_type}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilBuilding} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Reason"
                              autoComplete="Reason"
                              onChange={handleUpdateInputChange}
                              name="reason"
                              value={currentRecord.reason}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilDescription} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Description"
                              autoComplete="Description"
                              onChange={handleUpdateInputChange}
                              name="description"
                              value={currentRecord.description}
                            />
                          </CInputGroup>
                          <div className="d-grid">
                            <CButton color="success" onClick={() => handleUpdate()}>
                              Update
                            </CButton>
                            <br />
                            <CButton color="secondary" onClick={handleCleanForm}>
                              Clear
                            </CButton>
                          </div>
                        </CForm>
                      </CModalBody>
                    </CModal>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <></>
          )}
        </CContainer>
      )}
    </div>
  )
}

export default Fuel
