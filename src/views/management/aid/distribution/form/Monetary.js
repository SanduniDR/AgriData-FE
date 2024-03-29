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
import { cilUser, cilPlant, cilFork, cilBuilding, cilPencil } from '@coreui/icons'
import { searchMonetaryAidInfo, deleteMonetaryAid, updateMonetaryAid } from 'src/api/AidService'
import { API_BASE_URL } from 'src/Config'

const Monetary = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aid_id: '',
    description: '',
    reason: '',
  })

  const [formDataAdding, setAddFormData] = useState({
    aid_id: '',
    description: '',
    reason: '',
  })

  const [aids, setAids] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    aid_id: '',
    monetaryAid_id: '',
    description: '',
    reason: '',
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

  const handleAddFormInputChange = (event) => {
    const { name, value } = event.target
    setAddFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formDataAdding)
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

    const response = await searchMonetaryAidInfo(formData, newPage, 10)
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
      navigate('/login', { replace: true })
      return
    }

    // Call the backend API to delete the cultivation
    console.log(aid_id)
    const response = await deleteMonetaryAid(aid_id)
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

    const response = await searchMonetaryAidInfo(formData, currentPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      aid_id: '',
      description: '',
      reason: '',
      monetaryAid_id: '',
    })

    setAddFormData({
      aid_id: '',
      description: '',
      reason: '',
    })

    setAids([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleAddMonetary = () => {
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
    navigate('/login', { replace: true })
    return
  }

  const handleNewItemAddButtonSubmit = (event) => {
    event.preventDefault()
    if (Object.values(formDataAdding).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/aid/monetary-aid`, formDataAdding, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('New monetary was added Successfully!')
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
    const response = await updateMonetaryAid(currentRecord)
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
              <CButton color="danger" onClick={handleAddMonetary}>
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
                    <h1>Add Monetary information</h1>
                    <p className="text-medium-emphasis">
                      Add Monetary distribution for distribution
                    </p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilPlant} />
                        {/* aid_id: '', monetaryAid_id: '', description: '', reason: '', */}
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleAddFormInputChange}
                        name="aid_id"
                        value={formDataAdding.aid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilFork} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Description"
                        autoComplete="Description"
                        onChange={handleAddFormInputChange}
                        name="description"
                        value={formDataAdding.description}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CIcon icon={cilBuilding} />
                        <CInputGroupText>Reason</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Reason"
                        autoComplete="Reason"
                        onChange={handleAddFormInputChange}
                        name="reason"
                        value={formDataAdding.reason}
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
              <CButton color="success" onClick={handleAddMonetary}>
                + Add New Monetary Aid Record
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Monetary info</h1>
                    <p className="text-medium-emphasis">Filter Aid records</p>
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
                        disabled={formData.reason || formData.monetaryAid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Reason"
                        autoComplete="Reason"
                        onChange={handleInputChange}
                        name="reason"
                        value={formData.reason}
                        disabled={formData.aid_id || formData.monetaryAid_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Monetary Aid ID"
                        autoComplete="Monetary Aid ID"
                        onChange={handleInputChange}
                        name="monetaryAid_id"
                        value={formData.monetaryAid_id}
                        disabled={formData.aid_id || formData.reason}
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
                          <CTableHeaderCell>Monetary ID</CTableHeaderCell>
                          <CTableHeaderCell>Reason</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {aids.map((aid) => (
                          <CTableRow key={aid.monetaryAid_id}>
                            <CTableDataCell>{aid.aid_id}</CTableDataCell>
                            <CTableDataCell>{aid.monetaryAid_id}</CTableDataCell>
                            <CTableDataCell>{aid.reason}</CTableDataCell>
                            <CTableDataCell>{aid.description}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(aid.monetaryAid_id)}
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
                              <CIcon icon={cilFork} />
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Description"
                              autoComplete="Description"
                              onChange={handleUpdateInputChange}
                              name="description"
                              value={currentRecord.description}
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

export default Monetary
