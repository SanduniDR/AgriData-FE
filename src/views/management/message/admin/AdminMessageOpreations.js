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
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilTrash, cilFork, cilPencil } from '@coreui/icons'

import { addOfficer, searchOfficers, deleteOfficer, updateOfficer } from 'src/api/UserService'
import { getAllOfficesByDistrict, getOfficerDetailByOffice } from 'src/api/MisReportService'
import {
  sendBulkMailsByProvice,
  sendMailToOfficer,
  searchMails,
} from 'src/api/CommunicationService'
import Spinner from 'react-bootstrap/Spinner'

const AdminMessageOperations = () => {
  const navigate = useNavigate()
  const sri_lanka_provinces = [
    'Central',
    'Eastern',
    'Northern',
    'Southern',
    'Western',
    'North Western',
    'North Central',
    'Uva Province',
    'Sabaragamuwa',
  ]

  const districts = [
    'Ampara',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Colombo',
    'Galle',
    'Gampaha',
    'Hambantota',
    'Jaffna',
    'Kalutara',
    'Kandy',
    'Kegalle',
    'Kilinochchi',
    'Kurunegala',
    'Mannar',
    'Matale',
    'Matara',
    'Monaragala',
    'Mullaitivu',
    'Nuwara Eliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya',
  ]
  const [messageSendingForm, setMsgSendingFormData] = useState({
    district: '',
    isAllSelected: '',
    officerList: [],
    message: '',
    office_id: '',
    subject: '',
    province: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_id: '',
  })

  const [officers, setOfficers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [offices, setOffices] = useState([])
  const [messages, setMessages] = useState([])
  const [isAllSearchClicked, setIsAllSearchClicked] = useState(false)
  const [isAllOfficerSelected, setAllOfficerSelected] = useState(false)

  useEffect(() => {
    if (messageSendingForm.district !== '') {
      handlePDistrictChange()
    }
  }, [messageSendingForm.district])

  const handleSelectAllOfficerRadioChange = (event) => {
    if (event.target.value === 'true') {
      setAllOfficerSelected(true)
    } else {
      setAllOfficerSelected(false)
    }
  }

  useEffect(() => {
    messageSendingForm.isAllSelected = isAllOfficerSelected
  }, [isAllOfficerSelected])

  const handlePDistrictChange = async () => {
    console.log(messageSendingForm)
    const response = await getAllOfficesByDistrict(messageSendingForm.district)
    console.log(response)
    setOffices(response.data.offices)
  }

  useEffect(() => {
    if (messageSendingForm.district !== '') {
      handlePDistrictChange()
    }
  }, [messageSendingForm.district])

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

  const handleRadioChange = (event) => {
    if (event.target.value === 'true') {
      setIsAllSearchClicked(true)
    } else {
      setIsAllSearchClicked(false)
    }
  }

  const handleDistrictInputChange = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
    setOfficers([])
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchMails(formData, newPage, 30)
    setMessages(response.data.messages)
    console.log(response.data.messages)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }
    console.log(id)
    const response = await deleteOfficer(id)
    if (response.status === 200) {
      alert('Officer account deleted successfully.')
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

    console.log(isAllSearchClicked)
    if (!isAllSearchClicked && handleFormHasNoData()) {
      return
    }

    const response = await searchMails(formData, currentPage, 30)
    setMessages(response.data.messages)
    console.log(response.data.messages)
    setTotalPages(response.data.total_pages)
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      email: '',
      subject: '',
      status_sent: '',
      sent_to: '',
    })
    setOfficers([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleSendMessageCleanForm = () => {
    setMsgSendingFormData({
      district: '',
      isAllSelected: false,
      officerList: [],
      message: '',
      office_id: '',
      subject: '',
      province: '',
    })
  }

  useEffect(() => {
    if (messageSendingForm.officerList.length !== 0 && messageSendingForm.district !== '') {
      setMsgSendingFormData((prevFormData) => ({
        ...prevFormData,
        mailList: messageSendingForm.officers,
      }))
    }
  }, [messageSendingForm.district, messageSendingForm.officerList])

  //   useEffect(() => {
  //     if (messageSendingForm.officerList.length !== 0) {
  //       setMsgSendingFormData((prevFormData) => ({
  //         ...prevFormData,
  //         mailList: messageSendingForm.officers.split(','),
  //       }))
  //     }
  //   }, [messageSendingForm.district])

  const getOfficersByOfficeId = async () => {
    const response = await getOfficerDetailByOffice(messageSendingForm.office_id)
    const officerEmails = response.data.officers.map((officer) => officer.email)
    console.log(response)
    setMsgSendingFormData((prevState) => ({ ...prevState, officerList: officerEmails }))
  }

  useEffect(() => {
    if (messageSendingForm.office_id !== '') {
      getOfficersByOfficeId()
    }
  }, [messageSendingForm.office_id])

  const handleOfficeChange = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(setMsgSendingFormData)
  }

  const handleAddForm = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
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

  const handleMessageInput = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
  }

  const handleNewItemSendButtonSubmit = async (event) => {
    event.preventDefault()
    console.log(messageSendingForm)
    try {
      if (
        messageSendingForm.isAllSelected === true &&
        messageSendingForm.message !== '' &&
        messageSendingForm.subject !== '' &&
        messageSendingForm.province !== ''
      ) {
        setIsLoading(true)
        const response = await sendBulkMailsByProvice(
          messageSendingForm.province,
          messageSendingForm.subject,
          messageSendingForm.message,
        )
        console.log(response)
        if (response.status === 200) {
          alert('Messages were dispatched Successfully!')
        } else if (response.status === 409) {
          alert(response.data.message)
        } else {
          alert('Message sending to the system failed. Contact API service in charge.')
        }
      } else if (
        messageSendingForm.isAllSelected === false &&
        messageSendingForm.message !== '' &&
        messageSendingForm.subject !== '' &&
        messageSendingForm.officerList.length !== 0
      ) {
        setIsLoading(true)
        const response = await sendMailToOfficer(
          messageSendingForm.subject,
          messageSendingForm.message,
          messageSendingForm.officerList,
        )
        console.log(response)
        if (response.status === 200) {
          alert('Messages were dispatched Successfully!')
        } else if (response.status === 409) {
          alert(response.data.message)
        } else {
          alert('Message sending to the system failed. Contact API service in charge.')
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOfficerMailListChange = (event) => {
    const array_value = event.target.value.split(', ')
    console.log(array_value)
    setMsgSendingFormData((prevState) => ({
      ...prevState,
      officerList: array_value,
    }))
    console.log(messageSendingForm)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {showForm ? (
        <CContainer>
          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton color="danger" onClick={handleAddForm}>
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
                    <h1>Send new mail to Officer(s)</h1>
                    <p className="text-medium-emphasis">
                      Send mail to officers registered in the system
                    </p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Select Province</CInputGroupText>
                      <CFormSelect
                        name="province"
                        value={messageSendingForm.province}
                        onChange={handleMessageInput}
                        disabled={!isAllOfficerSelected}
                      >
                        <option value="">Select Province</option>
                        {sri_lanka_provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup>
                      <CFormCheck
                        inline
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineCheckbox1"
                        value="true"
                        onChange={handleSelectAllOfficerRadioChange}
                        label="Select all officers"
                        defaultChecked={isAllOfficerSelected}
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineCheckbox2"
                        onChange={handleSelectAllOfficerRadioChange}
                        value="false"
                        label="Select officers by filters"
                        defaultChecked={!isAllOfficerSelected}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CFormSelect
                        id="district"
                        name="district"
                        value={messageSendingForm.district}
                        onChange={handleDistrictInputChange}
                        disabled={isAllOfficerSelected}
                      >
                        <option value="">Select District</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className={`mb-3`}>
                      <CFormSelect
                        id="office_id"
                        name="office_id"
                        value={messageSendingForm.office_id}
                        onChange={handleOfficeChange}
                        disabled={isAllOfficerSelected}
                      >
                        <option value="">Select Office</option>
                        {offices.map((office, index) => (
                          <option key={index} value={office.agri_office_id}>
                            {office.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Receivers</CInputGroupText>
                      <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows={3}
                        onChange={handleOfficerMailListChange}
                        value={messageSendingForm.officerList}
                        disabled={isAllOfficerSelected}
                        placeholder='Enter officer IDs separated by ","'
                      ></CFormTextarea>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Receivers</CInputGroupText>
                      <CFormInput
                        id="exampleFormControlTextarea1"
                        rows={3}
                        name="subject"
                        onChange={handleMessageInput}
                        value={messageSendingForm.subject}
                        placeholder="Enter Subject"
                      ></CFormInput>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Receivers</CInputGroupText>
                      <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows={3}
                        name="message"
                        onChange={handleMessageInput}
                        value={messageSendingForm.message}
                        placeholder="Enter Message"
                      ></CFormTextarea>
                    </CInputGroup>
                    <div className="d-grid">
                      {isLoading ? (
                        <Spinner animation="border" variant="primary" />
                      ) : (
                        <CButton
                          color="success"
                          onClick={handleNewItemSendButtonSubmit}
                          disabled={isFormEmpty}
                        >
                          Send Message
                        </CButton>
                      )}
                      <br />
                      <CButton color="secondary" onClick={handleSendMessageCleanForm}>
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
              <CButton color="success" onClick={handleAddForm}>
                Send New Message by Mail
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Search Mail information</h1>
                    <p className="text-medium-emphasis">Filter Mail records</p>
                    <CFormCheck
                      className="radio-border"
                      type="radio"
                      name="searchOptionSelectionRadio"
                      id="searchOptionSelectionRadio2"
                      onChange={handleRadioChange}
                      value="true"
                      label="Get all records with no filters"
                      disabled={true}
                    />
                    <div className="radio-border">
                      <CFormCheck
                        type="radio"
                        name="searchOptionSelectionRadio"
                        id="searchOptionSelectionRadio1"
                        onChange={handleRadioChange}
                        value="false"
                        label="Use Filters to Search"
                        defaultChecked
                      />
                      <div className="FilterSet">
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Email</CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            autoComplete="Email"
                            onChange={handleInputChange}
                            name="email"
                            value={formData.email}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Subject</CInputGroupText>
                          <CFormInput
                            placeholder="Subject"
                            autoComplete="subject"
                            onChange={handleInputChange}
                            name="subject"
                            value={formData.subject}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Sent Status</CInputGroupText>
                          <CFormInput
                            placeholder="Status [SENT, NOT_SENT]"
                            autoComplete="Status"
                            onChange={handleInputChange}
                            name="status_sent"
                            value={formData.status_sent}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Sent to</CInputGroupText>
                          <CFormInput
                            placeholder="Sent To"
                            autoComplete="Send to"
                            onChange={handleInputChange}
                            name="sent_to"
                            value={formData.sent_to}
                            disabled={isAllSearchClicked}
                          />
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="d-grid">
                      <CButton color="primary" onClick={handleSubmit}>
                        Search Messages
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
          {messages.length !== 0 ? (
            <CRow className="justify-content-center mt-4">
              <CCol xs={12}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Mail ID</CTableHeaderCell>
                          <CTableHeaderCell>Sender</CTableHeaderCell>
                          <CTableHeaderCell>Message</CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                          <CTableHeaderCell>Sent To</CTableHeaderCell>
                          <CTableHeaderCell>Response</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {messages.map((message) => (
                          <CTableRow key={message.email}>
                            <CTableDataCell>{message.id}</CTableDataCell>
                            <CTableDataCell>{message.email}</CTableDataCell>
                            <CTableDataCell>{message.message_text}</CTableDataCell>
                            <CTableDataCell>{message.status_sent}</CTableDataCell>
                            <CTableDataCell>{message.sent_to}</CTableDataCell>
                            <CTableDataCell>{message.response}</CTableDataCell>
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

export default AdminMessageOperations
