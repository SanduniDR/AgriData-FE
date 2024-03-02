import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAidDistributionsTotal } from 'src/api/MisReportService'
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
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react'
import PieChart from 'src/views/management/charts/PieChart'

const AidDistributionOperations = () => {
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
    start_date: '',
    end_date: '',
  })
  const [isClosed, setIsClosed] = useState(true)

  const [chartData, setChartData] = useState({})

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await getAidDistributionsTotal(formData.start_date, formData.end_date)
    console.log(response)
    setChartData(response.data.total_aid_distributions)
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
      start_date: '',
      end_date: '',
    })
    setChartData({})
    setIsClosed(true)
  }

  return (
    <div className="bg-light d-flex flex-row" style={{ background: 'white' }}>
      <CContainer fluid>
        {Object.keys(chartData).length !== 0 && isClosed ? (
          <CRow>
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody>
                  <CRow>
                    <CCol>
                      <h4>Total aid distribution in the following time range:</h4>
                      <div className="small text-medium-emphasis">
                        {' '}
                        {formData.start_date} : {formData.end_date}
                      </div>
                      <PieChart data={chartData} />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs={12} className="text-right">
                      <CButton
                        color="secondary"
                        onClick={() => {
                          setIsClosed(!isClosed)
                          handleCleanForm()
                        }}
                      >
                        Close
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
                  <CForm>
                    <h4>Search Distribution information</h4>
                    <p className="text-medium-emphasis">Filter distribution records</p>

                    {/* <CInputGroup className={`mb-3`}>
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
                  </CInputGroup> */}

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="Start date"
                        autoComplete="Start date"
                        onChange={handleInputChange}
                        name="start_date"
                        value={formData.start_date}
                      />
                    </CInputGroup>

                    <CInputGroup className={`mb-3`}>
                      <CInputGroupText>End Date</CInputGroupText>
                      <CFormInput
                        type="date"
                        placeholder="End Date"
                        autoComplete="End Date"
                        onChange={handleInputChange}
                        name="end_date"
                        value={formData.end_date}
                      />
                    </CInputGroup>

                    {/* <CInputGroup className={`mb-3`}>
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
                  </CInputGroup> */}
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
        )}
      </CContainer>
    </div>
  )
}

export default AidDistributionOperations
