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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilPlant,
  cilFork,
  cilBuilding,
  cilDescription,
  cilApplicationsSettings,
  cilPencil,
} from '@coreui/icons'
import {
  searchPesticidesAidInfo,
  updatePesticidesAid,
  deletePesticidesAid,
} from 'src/api/AidService'
import { API_BASE_URL } from 'src/Config'

const Pesticides = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aid_id: '',
    manufactured_date: '',
    brand: '',
    batch_no: '',
    expiry_date: '',
    name: '',
    type: '',
    description: '',
  })

  const [aids, setAids] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    aid_id: '',
    manufactured_date: '',
    brand: '',
    batch_no: '',
    expiry_date: '',
    name: '',
    type: '',
    description: '',
    pesticides_id: '',
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

      return
    }

    const response = await searchPesticidesAidInfo(formData, newPage, 10)
    //const { data, total_pages } = response
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (aid_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

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
    const response = await deletePesticidesAid(aid_id)
    if (response.status === 200) {
      alert('Aid deleted successfully.')
      handleCleanForm()
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    const response = await searchPesticidesAidInfo(formData, currentPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      aid_id: '',
      manufactured_date: '',
      brand: '',
      batch_no: '',
      expiry_date: '',
      name: '',
      type: '',
      description: '',
    })
    setAids([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleAddPesticides = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  ////////////////////
  const [isFormEmpty, setIsFormEmpty] = useState(false)
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

  const handleNewItemAddButtonSubmit = (event) => {
    event.preventDefault()
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/aid/pesticides`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('New Pesticide was added Successfully!')
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

  const handleUpdate = async () => {
    const response = await updatePesticidesAid(currentRecord)
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
              <CButton color="danger" onClick={handleAddPesticides}>
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
                    <h1>Add Pesticide information</h1>
                    <p className="text-medium-emphasis">
                      Add Pesticide distribution for distribution
                    </p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilPlant} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid Name"
                        autoComplete="Aid name"
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilFork} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Type"
                        autoComplete="Type"
                        onChange={handleInputChange}
                        name="type"
                        value={formData.type}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Manufactured Date</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Manufactured Date"
                        autoComplete="Manufactured Date"
                        onChange={handleInputChange}
                        name="manufactured_date"
                        value={formData.manufactured_date}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilDescription} />
                        <CInputGroupText>Expiry Date</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Expiry Date"
                        autoComplete="Expiry Date"
                        onChange={handleInputChange}
                        name="expiry_date"
                        value={formData.expiry_date}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilApplicationsSettings} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="AID ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilApplicationsSettings} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Batch No"
                        autoComplete="Batch No"
                        onChange={handleInputChange}
                        name="batch_no"
                        value={formData.batch_no}
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
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilApplicationsSettings} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Brand"
                        autoComplete="Brand"
                        onChange={handleInputChange}
                        name="brand"
                        value={formData.brand}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilApplicationsSettings} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Description"
                        autoComplete="Description"
                        onChange={handleInputChange}
                        name="description"
                        value={formData.Description}
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
              <CButton color="success" onClick={handleAddPesticides}>
                + Add New Pesticide
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Pesticide info</h1>
                    <p className="text-medium-emphasis">Filter Pesticide details under Aid Funds</p>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                        disabled={formData.name || formData.brand}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Name"
                        autoComplete="name"
                        onChange={handleInputChange}
                        name="name"
                        value={formData.name}
                        disabled={formData.aid_id || formData.aid_brand}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid Brand"
                        autoComplete="Aid Brand"
                        onChange={handleInputChange}
                        name="aid_Brand"
                        value={formData.brand}
                        disabled={formData.aid_id || formData.name}
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
                          <CTableHeaderCell>AID ID</CTableHeaderCell>
                          <CTableHeaderCell>Pesticide ID</CTableHeaderCell>
                          <CTableHeaderCell>Aid Name</CTableHeaderCell>
                          <CTableHeaderCell>Brand</CTableHeaderCell>
                          <CTableHeaderCell>Batch</CTableHeaderCell>
                          <CTableHeaderCell>Manufactured Date</CTableHeaderCell>
                          <CTableHeaderCell>Expiry Date</CTableHeaderCell>
                          <CTableHeaderCell>Type</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {aids.map((aid) => (
                          <CTableRow key={aid.pesticides_id}>
                            <CTableDataCell>{aid.aid_id}</CTableDataCell>
                            <CTableDataCell>{aid.pesticides_id}</CTableDataCell>
                            <CTableDataCell>{aid.name}</CTableDataCell>
                            <CTableDataCell>{aid.brand}</CTableDataCell>
                            <CTableDataCell>{aid.batch_no}</CTableDataCell>
                            <CTableDataCell>{aid.manufactured_date}</CTableDataCell>
                            <CTableDataCell>{aid.expiry_date}</CTableDataCell>
                            <CTableDataCell>{aid.type}</CTableDataCell>
                            <CTableDataCell>{aid.description}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(aid.pesticides_id)}
                              >
                                Delete
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
                      style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap' }}
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
                              placeholder="Aid Name"
                              autoComplete="Aid name"
                              onChange={handleUpdateInputChange}
                              name="name"
                              value={currentRecord.name}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilFork} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Type"
                              autoComplete="Type"
                              onChange={handleUpdateInputChange}
                              name="type"
                              value={currentRecord.type}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilBuilding} />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              placeholder="Manufactured Date"
                              autoComplete="Manufactured Date"
                              onChange={handleUpdateInputChange}
                              name="manufactured_date"
                              value={currentRecord.manufactured_date}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilDescription} />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              placeholder="Expiry Date"
                              autoComplete="Expiry Date"
                              onChange={handleUpdateInputChange}
                              name="expiry_date"
                              value={currentRecord.expiry_date}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilApplicationsSettings} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Batch No"
                              autoComplete="Batch No"
                              onChange={handleUpdateInputChange}
                              name="batch_no"
                              value={currentRecord.batch_no}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilApplicationsSettings} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Aid ID"
                              autoComplete="Aid ID"
                              onChange={handleUpdateInputChange}
                              name="aid_id"
                              value={currentRecord.aid_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilApplicationsSettings} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Pesticides ID"
                              autoComplete="Pesticides ID"
                              onChange={handleUpdateInputChange}
                              name="pesticides_id"
                              value={currentRecord.pesticides_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilApplicationsSettings} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Aid Batch"
                              autoComplete="Aid Batch"
                              onChange={handleUpdateInputChange}
                              name="batch_no"
                              value={currentRecord.batch_no}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CIcon icon={cilApplicationsSettings} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Brand"
                              autoComplete="Brand"
                              onChange={handleUpdateInputChange}
                              name="brand"
                              value={currentRecord.brand}
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

export default Pesticides
