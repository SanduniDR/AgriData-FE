import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'

import { React, useState, useEffect } from 'react'
import { searchMails, sendMailToFarmer } from 'src/api/CommunicationService'
import { getAllOfficesByDistrict, getFarmerDetailByOffice } from 'src/api/MisReportService'
import Spinner from 'react-bootstrap/Spinner'

const OfficerMessageOperations = () => {
  const [showForm, setShowForm] = useState(false)
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [formData, setFormData] = useState([])
  const [messages, setMessages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

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
    farmerList: [],
    message: '',
    office_id: '',
    subject: '',
    province: '',
  })

  const [isAllFarmersSelected, setIsAllFarmersSelected] = useState(false)
  const [isSelectFarmerbyFilters, setIsSelectFarmerbyFilters] = useState(false)
  const [offices, setOffices] = useState([])

  const handleAddForm = () => {
    setShowForm(!showForm)
  }

  const handleProvinceInput = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
  }

  const handleDistictInput = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
  }

  useEffect(() => {
    if (messageSendingForm.district !== '') {
      handleDistrictChange()
    }
  }, [messageSendingForm.district])

  const handleDistrictChange = async () => {
    console.log(messageSendingForm)
    const response = await getAllOfficesByDistrict(messageSendingForm.district)
    console.log(response)
    setOffices(response.data.offices)
  }
  const handleOfficeChange = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
  }
  useEffect(() => {
    if (messageSendingForm.office_id !== '') {
      getFarmerByOfficeId()
    }
  }, [messageSendingForm.office_id])

  const getFarmerByOfficeId = async () => {
    const response = await getFarmerDetailByOffice(messageSendingForm.office_id)
    const farmerEmails = response.data.farmer_mails.map((mail) => mail)
    console.log(response)
    setMsgSendingFormData((prevState) => ({ ...prevState, farmerList: farmerEmails }))
  }

  const handleFarmerMailListChange = (event) => {
    const array_value = event.target.value.split(', ')
    console.log(array_value)
    setMsgSendingFormData((prevState) => ({
      ...prevState,
      farmerList: array_value,
    }))
    console.log(messageSendingForm)
  }
  const handleSubjectInput = (event) => {
    const { name, value } = event.target
    setMsgSendingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(messageSendingForm)
  }

  const handleSendMessageBtnClick = async (event) => {
    event.preventDefault()
    console.log(messageSendingForm)
    try {
      if (
        messageSendingForm.farmerList.length !== 0 &&
        messageSendingForm.message !== '' &&
        messageSendingForm.subject !== ''
      ) {
        setIsLoading(true)
        const response = await sendMailToFarmer(
          messageSendingForm.subject,
          messageSendingForm.message,
          messageSendingForm.farmerList,
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
  // useEffect(() => {
  //   if (messageSendingForm.officerList.length !== 0 && messageSendingForm.district !== '') {
  //     setMsgSendingFormData((prevFormData) => ({
  //       ...prevFormData,
  //       mailList: messageSendingForm.officers,
  //     }))
  //   }
  // }, [messageSendingForm.district, messageSendingForm.officerList])

  const handleSelectAllFarmerRadioChange = (event) => {
    if (event.target.value === 'true') {
      setIsAllFarmersSelected(true)
    } else {
      setIsAllFarmersSelected(false)
    }
  }

  const handleSelectFarmerbyFilterRadioChange = (event) => {
    if (event.target.value === 'true') {
      setIsSelectFarmerbyFilters(true)
    } else {
      setIsSelectFarmerbyFilters(false)
    }
  }
  //   Handle user inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleSearch = async () => {
    if (handleFormHasNoData()) {
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
    setIsFormEmpty(false)
    //setOfficers([])
    // setCurrentPage(1)
    //  setShowModal(false)
  }

  const handleSendMessageCleanForm = () => {
    setMsgSendingFormData({
      district: '',
      farmerList: [],
      message: '',
      office_id: '',
      subject: '',
      province: '',
    })
  }
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

  const handleCloseForm = () => {
    setMessages([])
  }
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      return
    }

    const response = await searchMails(formData, newPage, 30)
    setMessages(response.data.messages)
    console.log(response.data.messages)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
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
                    <h1>Broadcasting Messages to Farmer(s)</h1>
                    <p className="text-medium-emphasis">
                      Send mail to farmers registered in the system
                    </p>

                    <CInputGroup>
                      <CFormCheck
                        inline
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineCheckbox2"
                        onChange={handleSelectAllFarmerRadioChange}
                        value="false"
                        label="Select farmers by filters"
                        defaultChecked={!isAllFarmersSelected}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CFormSelect
                        id="district"
                        name="district"
                        value={messageSendingForm.district}
                        onChange={handleDistictInput}
                        disabled={isAllFarmersSelected}
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
                        disabled={isAllFarmersSelected}
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
                        onChange={handleFarmerMailListChange}
                        value={messageSendingForm.farmerList}
                        disabled={isAllFarmersSelected}
                        placeholder='Enter officer IDs separated by ","'
                      ></CFormTextarea>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Subject</CInputGroupText>
                      <CFormInput
                        id="exampleFormControlTextarea2"
                        rows={3}
                        name="subject"
                        onChange={handleSubjectInput}
                        value={messageSendingForm.subject}
                        placeholder="Enter Subject"
                      ></CFormInput>
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Message</CInputGroupText>
                      <CFormTextarea
                        id="exampleFormControlTextarea3"
                        rows={5}
                        name="message"
                        onChange={handleSubjectInput}
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
                          onClick={handleSendMessageBtnClick}
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
                    <div className="FilterSet">
                      <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                        <CInputGroupText>Email</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="Email"
                          onChange={handleInputChange}
                          name="email"
                          value={formData.email}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                        <CInputGroupText>Subject</CInputGroupText>
                        <CFormInput
                          placeholder="Subject"
                          autoComplete="subject"
                          onChange={handleInputChange}
                          name="subject"
                          value={formData.subject}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                        <CInputGroupText>Sent Status</CInputGroupText>
                        <CFormInput
                          placeholder="Status [SENT, NOT_SENT]"
                          autoComplete="Status"
                          onChange={handleInputChange}
                          name="status_sent"
                          value={formData.status_sent}
                        />
                      </CInputGroup>
                      <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                        <CInputGroupText>Sent to</CInputGroupText>
                        <CFormInput
                          placeholder="Sent To"
                          autoComplete="Send to"
                          onChange={handleInputChange}
                          name="sent_to"
                          value={formData.sent_to}
                        />
                      </CInputGroup>
                    </div>
                    <div className="d-grid">
                      <CButton color="primary" onClick={handleSearch}>
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
                          <CTableHeaderCell>
                            <CButton color="danger" onClick={handleCloseForm}>
                              Close{' '}
                            </CButton>
                          </CTableHeaderCell>
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
          )}{' '}
        </CContainer>
      )}
    </div>
  )
}
export default OfficerMessageOperations
