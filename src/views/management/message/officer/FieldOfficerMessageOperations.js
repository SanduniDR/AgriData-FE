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
} from '@coreui/react'
import { React, useState, useEffect } from 'react'

const OfficerMessageOperations = () => {
  const [showForm, setShowForm] = useState(false)
  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const [formData, setFormData] = useState([])

  const handleAddForm = () => {
    setShowForm(!showForm)
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
  const handleSubmit = () => {}
  const handleCleanForm = () => {
    setFormData({
      email: '',
      subject: '',
      status_sent: '',
      sent_to: '',
    })
    //setOfficers([])
    // setCurrentPage(1)
    //  setShowModal(false)
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
                  <CForm>
                    <h1>Search Mail information</h1>
                    <p className="text-medium-emphasis">Filter Mail records</p>
                    <div className="FilterSet">
                      <CButton color="info" onClick={handleSubmit}>
                        Search Messages
                      </CButton>
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
        </CContainer>
      )}
    </div>
  )
}
export default OfficerMessageOperations
