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
  CFormSelect,
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
import {
  deleteAidDistribution,
  searchAidDistribution,
  updateAidDistribution,
} from 'src/api/AidService'
import { API_BASE_URL } from 'src/Config'

const Distribution = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aid_id: '',
    agri_office_id: '',
    date: '',
    time: '',
    in_charged_officer_id: '',
    cultivation_info_id: '',
    farmer_id: '',
    amount_received: '',
    amount_approved: '',
    description: '',
  })

  const [aids, setAids] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    distribution_id: '',
    aid_id: '',
    agri_office_id: '',
    date: '',
    in_charged_officer_id: '',
    cultivation_info_id: '',
    farmer_id: '',
    amount_received: '',
    amount_approved: '',
    description: '',
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

    const response = await searchAidDistribution(formData, newPage, 50)
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
    console.log(aid_id)
    const response = await deleteAidDistribution(aid_id)
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

    const response = await searchAidDistribution(formData, currentPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      aid_id: '',
      agri_office_id: '',
      date: '',
      in_charged_officer_id: '',
      cultivation_info_id: '',
      farmer_id: '',
      amount_received: '',
      amount_approved: '',
      description: '',
    })
    setAids([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleAddNewAidDistributionRecord = () => {
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
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/aid/aid-distribution`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('New distribution was added successfully!')
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
    const response = await updateAidDistribution(currentRecord)
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
              <CButton color="danger" onClick={handleAddNewAidDistributionRecord}>
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
                    <h1>Add Distribution information</h1>
                    <p className="text-medium-emphasis">Add distribution for distribution</p>
                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Aid ID</CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Agri Cultural office ID</CInputGroupText>
                      <CFormInput
                        placeholder="Agri Cultural office ID"
                        autoComplete="name"
                        onChange={handleInputChange}
                        name="agri_office_id"
                        value={formData.agri_office_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Date"
                        autoComplete="date"
                        onChange={handleInputChange}
                        name="date"
                        value={formData.date}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>In Charged Officer ID</CInputGroupText>
                      <CFormInput
                        placeholder="In Charged Officer ID"
                        autoComplete="in_charged_officer_id"
                        onChange={handleInputChange}
                        name="in_charged_officer_id"
                        value={formData.in_charged_officer_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Cultivation Info ID</CInputGroupText>
                      <CFormInput
                        placeholder="Cultivation Info ID"
                        autoComplete="cultivation_info_id"
                        onChange={handleInputChange}
                        name="cultivation_info_id"
                        value={formData.cultivation_info_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Farmer ID</CInputGroupText>
                      <CFormInput
                        placeholder="Farmer ID"
                        autoComplete="farmer_id"
                        onChange={handleInputChange}
                        name="farmer_id"
                        value={formData.farmer_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Amount Received</CInputGroupText>
                      <CFormInput
                        placeholder="Amount Received"
                        autoComplete="amount_received"
                        onChange={handleInputChange}
                        name="amount_received"
                        value={formData.amount_received}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Amount Approved</CInputGroupText>
                      <CFormInput
                        placeholder="Amount Approved"
                        autoComplete="amount_approved"
                        onChange={handleInputChange}
                        name="amount_approved"
                        value={formData.amount_approved}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Description</CInputGroupText>
                      <CFormSelect
                        onChange={handleInputChange}
                        name="description"
                        value={formData.description}
                      >
                        <option value="">Select Type Description</option>
                        <option value="Pesticide">Pesticide</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Monetary">Monetary</option>
                        <option value="Fuel">Fuel</option>
                      </CFormSelect>
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
              <CButton color="success" onClick={handleAddNewAidDistributionRecord}>
                + Add New Distribution
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Distribution info</h1>
                    <p className="text-medium-emphasis">Filter distribution records</p>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Aid ID</CInputGroupText>
                      <CFormInput
                        placeholder="Aid ID"
                        autoComplete="Aid ID"
                        onChange={handleInputChange}
                        name="aid_id"
                        value={formData.aid_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Agri Cultural office ID</CInputGroupText>
                      <CFormInput
                        placeholder="Agri Cultural office ID"
                        autoComplete="name"
                        onChange={handleInputChange}
                        name="agri_office_id"
                        value={formData.agri_office_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Date"
                        autoComplete="date"
                        onChange={handleInputChange}
                        name="date"
                        value={formData.date}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>In Charged Officer ID</CInputGroupText>
                      <CFormInput
                        placeholder="In Charged Officer ID"
                        autoComplete="in_charged_officer_id"
                        onChange={handleInputChange}
                        name="in_charged_officer_id"
                        value={formData.in_charged_officer_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Cultivation Info ID</CInputGroupText>
                      <CFormInput
                        placeholder="Cultivation Info ID"
                        autoComplete="cultivation_info_id"
                        onChange={handleInputChange}
                        name="cultivation_info_id"
                        value={formData.cultivation_info_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Farmer ID</CInputGroupText>
                      <CFormInput
                        placeholder="Farmer ID"
                        autoComplete="farmer_id"
                        onChange={handleInputChange}
                        name="farmer_id"
                        value={formData.farmer_id}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Amount Received</CInputGroupText>
                      <CFormInput
                        placeholder="Amount Received"
                        autoComplete="amount_received"
                        onChange={handleInputChange}
                        name="amount_received"
                        value={formData.amount_received}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Amount Approved</CInputGroupText>
                      <CFormInput
                        placeholder="Amount Approved"
                        autoComplete="amount_approved"
                        onChange={handleInputChange}
                        name="amount_approved"
                        value={formData.amount_approved}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Description</CInputGroupText>
                      <CFormInput
                        placeholder="Description"
                        autoComplete="description"
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
                          <CTableHeaderCell>Distribution ID</CTableHeaderCell>
                          <CTableHeaderCell>Aid ID</CTableHeaderCell>
                          <CTableHeaderCell>Agri Office ID</CTableHeaderCell>
                          <CTableHeaderCell>Date</CTableHeaderCell>
                          <CTableHeaderCell>In Charged Officer ID</CTableHeaderCell>
                          <CTableHeaderCell>Cultivation Info ID</CTableHeaderCell>
                          <CTableHeaderCell>Farmer ID</CTableHeaderCell>
                          <CTableHeaderCell>Amount Received</CTableHeaderCell>
                          <CTableHeaderCell>Amount Approved</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {aids.map((aid) => (
                          <CTableRow key={aid.distribution_id}>
                            <CTableDataCell>{aid.distribution_id}</CTableDataCell>
                            <CTableDataCell>{aid.aid_id}</CTableDataCell>
                            <CTableDataCell>{aid.agri_office_id}</CTableDataCell>
                            <CTableDataCell>{aid.date}</CTableDataCell>
                            <CTableDataCell>{aid.in_charged_officer_id}</CTableDataCell>
                            <CTableDataCell>{aid.cultivation_info_id}</CTableDataCell>
                            <CTableDataCell>{aid.farmer_id}</CTableDataCell>
                            <CTableDataCell>{aid.amount_received}</CTableDataCell>
                            <CTableDataCell>{aid.amount_approved}</CTableDataCell>
                            <CTableDataCell>{aid.description}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(aid.distribution_id)}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                              <CButton color="info" onClick={() => handlePenClick(aid)}>
                                <CIcon icon={cilPencil} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
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
                    </CTable>
                    <CModal visible={showModal} onClose={() => setShowModal(false)}>
                      <CModalHeader onClose={handleClose}>
                        <CModalTitle>Update Record</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <CForm>
                          <h1>Update distribution information</h1>
                          <p className="text-medium-emphasis">Update distribution to the farmers</p>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Distribution ID</CInputGroupText>
                            <CFormInput
                              placeholder="Distribution ID"
                              autoComplete="Distribution ID"
                              onChange={handleUpdateInputChange}
                              name="distribution_id"
                              value={currentRecord.distribution_id}
                              disabled={true}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Aid ID</CInputGroupText>
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
                            <CInputGroupText>Agri Office ID</CInputGroupText>
                            <CFormInput
                              placeholder="Agri Office ID"
                              autoComplete="Agri Office ID"
                              onChange={handleUpdateInputChange}
                              name="agri_office_id"
                              value={currentRecord.agri_office_id}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Date</CInputGroupText>
                            <CFormInput
                              type="date"
                              placeholder="Date"
                              autoComplete="Date"
                              onChange={handleUpdateInputChange}
                              name="date"
                              value={currentRecord.date}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>In Charged Officer ID</CInputGroupText>
                            <CFormInput
                              placeholder="In Charged Officer ID"
                              autoComplete="In Charged Officer ID"
                              onChange={handleUpdateInputChange}
                              name="in_charged_officer_id"
                              value={currentRecord.in_charged_officer_id}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Cultivation Info ID</CInputGroupText>
                            <CFormInput
                              placeholder="Cultivation Info ID"
                              autoComplete="Cultivation Info ID"
                              onChange={handleUpdateInputChange}
                              name="cultivation_info_id"
                              value={currentRecord.cultivation_info_id}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Farmer ID</CInputGroupText>
                            <CFormInput
                              placeholder="Farmer ID"
                              autoComplete="Farmer ID"
                              onChange={handleUpdateInputChange}
                              name="farmer_id"
                              value={currentRecord.farmer_id}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Aid Amount Received</CInputGroupText>
                            <CFormInput
                              placeholder="Amount Received"
                              autoComplete="Amount Received"
                              onChange={handleUpdateInputChange}
                              name="amount_received"
                              value={currentRecord.amount_received}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Aid Amount Approved</CInputGroupText>
                            <CFormInput
                              placeholder="Amount Approved"
                              autoComplete="Amount Approved"
                              onChange={handleUpdateInputChange}
                              name="amount_approved"
                              value={currentRecord.amount_approved}
                            />
                          </CInputGroup>

                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Description</CInputGroupText>
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

export default Distribution
