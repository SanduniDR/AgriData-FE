import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CFormCheck,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import { addOfficer, searchOfficers, deleteOfficer, updateOfficer } from 'src/api/UserService'

const Officer = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_id: '',
    employee_id: '',
    managed_by_employee_id: '',
    agri_office_id: '',
    service_start_date: '',
    field_area_id: '',
    district: '',
  })
  const [officers, setOfficers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    user_id: '',
    employee_id: '',
    agri_office_id: '',
    service_start_date: '',
    field_area_id: '',
    district: '',
  })
  const [isAllSearchClicked, setIsAllSearchClicked] = useState(false)
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const token = localStorage.getItem('token')

  //Handle radio button click
  const handleRadioChange = (event) => {
    if (event.target.value === 'true') {
      setIsAllSearchClicked(true)
    } else {
      setIsAllSearchClicked(false)
    }
  }

  //Handle the form when no filter fields added
  const handleFormHasNoData = () => {
    if (Object.values(formData).every((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert(
        "Please add at least one filter or switch to get all records. and Click 'Search' again.",
      )
      return true
    } else {
      return false
    }
  }

  //set form data while user inputs data
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    setOfficers([])
  }

  //handle update fields of update form
  const handleUpdateInputChange = (event) => {
    setCurrentRecord({
      ...currentRecord,
      [event.target.name]: event.target.value,
    })
  }

  //handle pagination -->load required page
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    const response = await searchOfficers(formData, newPage, 10)
    setOfficers(response.data.officers)
    console.log(response.data.officers)
    // setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  //handle delete operation -->api call
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }
    console.log(id)
    const response = await deleteOfficer(id)
    if (response.status === 200) {
      alert('Officer account deleted successfully.')
      handleCleanForm()
    }
  }

  //handle search officer operation -->api call
  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    console.log(isAllSearchClicked)
    if (!isAllSearchClicked && handleFormHasNoData()) {
      return
    }

    const response = await searchOfficers(formData, currentPage, 10)
    setOfficers(response.data.officers)
    console.log(response.data.officers)
    setTotalPages(response.data.total_pages)
    setShowModal(false)
  }

  //clean form fields in search form
  const handleCleanForm = () => {
    setFormData({
      user_id: '',
      employee_id: '',
      agri_office_id: '',
      service_start_date: '',
      field_area_id: '',
      district: '',
    })
    setOfficers([])
    setCurrentPage(1)
    setShowModal(false)
  }

  // clean update clean form
  const handleUpdateCleanForm = () => {
    setCurrentRecord({
      user_id: '',
      employee_id: '',
      agri_office_id: '',
      service_start_date: '',
      field_area_id: '',
      district: '',
    })
  }

  //perform add officer form
  const handleAddOfficer = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  const handleNewItemAddButtonSubmit = async (event) => {
    event.preventDefault()
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    const response = await addOfficer(formData)
    console.log(response)
    if (response.status === 201) {
      alert('New Officer was added Successfully!')
    } else if (response.response.status === 409) {
      alert(response.response.data)
    } else {
      alert('Officer adding to the system failed. Contact DB Admin service')
    }

    handleCleanForm()
  }

  const handleUpdate = async () => {
    if (currentRecord.user_id === '') {
      alert('USer Id is Empty !')
      return
    }
    const response = await updateOfficer(currentRecord)
    console.log(response)
    if (response.status === 200) {
      alert('Officer updated successfully.')
    } else {
      alert('Officer update failed.')
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

  //Setting the view
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {showForm ? (
        <CContainer>
          {/* Close button of form - Add New Officer */}
          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton color="danger" onClick={handleAddOfficer}>
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
                  {/* Add new Agri-field officer form */}
                  <CForm>
                    <h1>Add New Agricultural Field Officer</h1>
                    <p className="text-medium-emphasis" style={{ color: 'red' }}>
                      **Register as a user first, before assigning.
                    </p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>User ID</CInputGroupText>
                      <CFormInput
                        placeholder="User ID"
                        autoComplete="User ID"
                        onChange={handleInputChange}
                        name="user_id"
                        value={formData.user_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Employee Id </CInputGroupText>
                      <CFormInput
                        placeholder="Employee ID (Optional)"
                        autoComplete="Employee ID (Optional)"
                        onChange={handleInputChange}
                        name="employee_id"
                        value={formData.employee_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Managed_by Employee ID</CInputGroupText>
                      <CFormInput
                        placeholder="Manger Employee ID"
                        autoComplete="Manager Employee ID"
                        onChange={handleInputChange}
                        name="managed_by_employee_id"
                        value={formData.managed_by_employee_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Service Starting Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Service Starting Date"
                        autoComplete="Service Starting Date"
                        onChange={handleInputChange}
                        name="service_start_date"
                        value={formData.service_start_date}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Office ID</CInputGroupText>
                      <CFormInput
                        placeholder="Office ID"
                        autoComplete="Office ID"
                        onChange={handleInputChange}
                        name="agri_office_id"
                        value={formData.agri_office_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Field Area</CInputGroupText>
                      <CFormInput
                        placeholder="Field Area ID"
                        autoComplete="Field Area ID"
                        onChange={handleInputChange}
                        name="field_area_id"
                        value={formData.field_area_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>District</CInputGroupText>
                      <CFormInput
                        placeholder="District"
                        autoComplete="District"
                        onChange={handleInputChange}
                        name="district"
                        value={formData.district}
                      />
                    </CInputGroup>
                    {/* Submit button to Add new Agri-officer;endpoint */}
                    <div className="d-grid">
                      <CButton
                        color="success"
                        onClick={handleNewItemAddButtonSubmit}
                        disabled={isFormEmpty}
                      >
                        Submit
                      </CButton>{' '}
                      <br />
                      {/* Clear button to clean add new field officer form fields */}
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
            <CCol xs="auto" className={'mb-3'} style={{ marginTop: '10px' }}>
              {/* Add new officer button */}
              <CButton color="success" onClick={handleAddOfficer}>
                + Add New Officer
              </CButton>
            </CCol>
          </CRow>
          {/* Search Officer Form  */}
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search officer information</h1>
                    <p className="text-medium-emphasis">Filter officer records</p>
                    <div className="radio-border">
                      <CFormCheck
                        type="radio"
                        name="searchOptionSelectionRadio"
                        id="searchOptionSelectionRadio2"
                        value="true"
                        onChange={handleRadioChange}
                        label="Get all records with no filters"
                      />{' '}
                    </div>
                    <div className="radio-border">
                      <CFormCheck
                        type="radio"
                        name="searchOptionSelectionRadio"
                        id="searchOptionSelectionRadio1"
                        value="false"
                        onChange={handleRadioChange}
                        label="Use Filters to Search"
                        defaultChecked
                      />
                      <div className="FilterSet">
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Officer ID</CInputGroupText>
                          <CFormInput
                            placeholder="Officer Id (User Id)"
                            autoComplete="Officer Id (User Id)"
                            onChange={handleInputChange}
                            name="user_id"
                            value={formData.user_id}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Manager ID</CInputGroupText>
                          <CFormInput
                            placeholder="Manager ID"
                            autoComplete="Manager ID"
                            onChange={handleInputChange}
                            name="managed_by_employee_id"
                            value={formData.managed_by_employee_id}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Office</CInputGroupText>
                          <CFormInput
                            placeholder="Office Id"
                            autoComplete="Office ID"
                            onChange={handleInputChange}
                            name="agri_office_id"
                            value={formData.agri_office_id}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Field Area</CInputGroupText>
                          <CFormInput
                            placeholder="Field Area Id"
                            autoComplete="Field Area ID"
                            onChange={handleInputChange}
                            name="field_area_id"
                            value={formData.field_area_id}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>District</CInputGroupText>
                          <CFormInput
                            placeholder="District"
                            autoComplete="District"
                            onChange={handleInputChange}
                            name="district"
                            value={formData.district}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                      </div>
                    </div>
                    {/* Search officer button */}
                    <div className="d-grid">
                      <CButton color="primary" onClick={handleSubmit}>
                        Search
                      </CButton>
                      <br />
                      {/* Search officer form clear button */}
                      <CButton color="danger" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/* If search results available preview the table */}
          {officers.length !== 0 ? (
            <CRow className="justify-content-center mt-4">
              <CCol xs={12}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>User ID</CTableHeaderCell>
                          <CTableHeaderCell>Manage By (User ID)</CTableHeaderCell>
                          <CTableHeaderCell>Office</CTableHeaderCell>
                          <CTableHeaderCell>Field ID</CTableHeaderCell>
                          <CTableHeaderCell>Field Name</CTableHeaderCell>
                          <CTableHeaderCell>District</CTableHeaderCell>
                          <CTableHeaderCell>Service Started On</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {officers.map((officer) => (
                          <CTableRow key={officer.officer.user_id}>
                            <CTableDataCell>{officer.officer.user_id}</CTableDataCell>
                            <CTableDataCell>
                              {officer.officer.managed_by_employee_id}
                            </CTableDataCell>
                            <CTableDataCell>{officer.officer.agri_office_id}</CTableDataCell>
                            <CTableDataCell>{officer.officer.field_area_id}</CTableDataCell>
                            <CTableDataCell>{officer.field_area.name}</CTableDataCell>
                            <CTableDataCell>{officer.office.district}</CTableDataCell>
                            <CTableDataCell>{officer.officer.service_start_date}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(officer.officer.user_id)}
                              >
                                Delete
                              </CButton>
                              <CButton color="info" onClick={() => handlePenClick(officer.officer)}>
                                Update
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                      {/* Handle pagination */}
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
                    {/* Update Officer Model */}
                    <CModal visible={showModal} onClose={() => setShowModal(false)}>
                      <CModalHeader onClose={handleClose}>
                        <CModalTitle>Update Record</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <CForm>
                          <h1>Update Officer information</h1>
                          <p className="text-medium-emphasis">
                            Update Field officer information in the system
                          </p>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>User Account ID</CInputGroupText>
                            <CFormInput
                              placeholder="User Account ID"
                              autoComplete="User ID"
                              onChange={handleUpdateInputChange}
                              name="user_id"
                              value={currentRecord.user_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Employee Id </CInputGroupText>
                            <CFormInput
                              placeholder="Employee ID (Optional)"
                              autoComplete="Employee ID (Optional)"
                              onChange={handleUpdateInputChange}
                              name="employee_id"
                              value={currentRecord.employee_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>Managing User ID</CInputGroupText>
                            <CFormInput
                              placeholder="Manger ID"
                              autoComplete="Manager ID"
                              onChange={handleUpdateInputChange}
                              name="managed_by_employee_id"
                              value={currentRecord.managed_by_employee_id}
                            />
                          </CInputGroup>
                          <CInputGroup
                            className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                          >
                            <CInputGroupText>
                              <CInputGroupText>Service starting date</CInputGroupText>
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              placeholder="Service Starting Date"
                              autoComplete="Service Starting Date"
                              onChange={handleUpdateInputChange}
                              name="service_start_date"
                              value={currentRecord.service_start_date}
                            />
                          </CInputGroup>
                          {/* Update Button */}
                          <div className="d-grid">
                            <CButton color="success" onClick={() => handleUpdate()}>
                              Update
                            </CButton>
                            <br />
                            {/* Clear Button */}
                            <CButton color="secondary" onClick={handleUpdateCleanForm}>
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

export default Officer
