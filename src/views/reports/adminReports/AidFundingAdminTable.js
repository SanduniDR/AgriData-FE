import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAidDistributionsTotal, getAidDistributionsTotalByFund } from 'src/api/MisReportService'
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
  CFormSelect,
} from '@coreui/react'
import { Button } from 'react-bootstrap'
import PieChart from 'src/views/management/charts/PieChart'
import { searchTotalAidInfo } from 'src/api/AidService'
import Papa from 'papaparse'
import { exportData } from 'src/utils/Utils'

const AidFundingAdminTable = () => {
  const navigate = useNavigate()
  const [needToGetTotal, setNeedToGetTotal] = useState(false)
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
  const [fundChartData, setFundChartData] = useState({})
  const [fundAids, setFundAids] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [chartToPrint, setChartToPrint] = useState([])

  const handleYearChange = async (e) => {
    const formDataAid = { year: e.target.value }
    const response = await searchTotalAidInfo(formDataAid)
    console.log('Aids', response)
    setFundAids(response)
  }

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
      navigate('/', { replace: true })
      return
    }

    const response = await getAidDistributionsTotal(formData.start_date, formData.end_date)
    console.log(response)
    setChartData(response.data.total_aid_distributions)
  }

  const handleFundSelect = async (event) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/', { replace: true })
      return
    }

    const response = await getAidDistributionsTotalByFund(event.target.value, year)
    console.log(response)
    setChartToPrint(response)
    setFundChartData(response.data.total_aid_distributions)
  }

  //handle download data
  const handleDownloadYearFunds = (event) => {
    const csvData = Papa.unparse(fundAids)
    exportData(csvData, 'aid_funds_by_year.csv', 'text/csv;charset=utf-8;')
  }
  //handle download data

  const handleDownloadDataByFunds = (event) => {
    const jsonData = JSON.stringify(chartToPrint.data)
    exportData(jsonData, 'aid_distribution_by_fund.csv', 'text/csv;charset=utf-8;')
  }
  //handle download data

  const handleDownloadDataByTime = (event) => {
    const jsonData = JSON.stringify(chartData)
    exportData(jsonData, 'aid_funds_by_year.csv', 'text/csv;charset=utf-8;')
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

  const resetData = () => {
    setChartData({})
    setFundChartData({})
    setFundAids([])
  }

  return (
    <div className="bg-light d-flex flex-row" style={{ background: 'white' }}>
      <CContainer fluid>
        <CRow>
          <CCol>
            <CButton color="secondary" onClick={() => setNeedToGetTotal(!needToGetTotal)}>
              {needToGetTotal
                ? 'View Aid by Fund type >>'
                : '<< View Total Aid Distributions by Time Range'}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          {needToGetTotal ? (
            <>
              <CContainer fluid>
                {Object.keys(chartData).length !== 0 && isClosed ? (
                  <CRow>
                    <CCol style={{ margin: '30px' }}>
                      <CCard className="mx-4">
                        <CCardBody>
                          <CRow>
                            <CCol>
                              <h4>Total Aid distribution</h4>
                              <p>
                                Aid Distributed among farmers within the selected period ( Please
                                refer standard measurement units (Kg, L))
                              </p>
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
                              <CButton
                                style={{ marginLeft: '10px' }}
                                color="secondary"
                                onClick={handleDownloadDataByTime}
                              >
                                Download as CSV
                              </CButton>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                ) : (
                  // Search form
                  <CRow>
                    <CCol style={{ margin: '30px' }}>
                      <CCard>
                        <CCardBody>
                          <CForm>
                            <h4>Search Total Aid Distribution information</h4>
                            <p className="text-medium-emphasis">Filter distribution records</p>
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
            </>
          ) : (
            <>
              <CContainer>
                <CCard>
                  <CCardBody style={{ width: '800px' }}>
                    <CRow>
                      <CCol style={{ margin: '30px' }}>
                        <h4>Total Aid distribution based on Funding Type (Yearly)</h4>
                        <p>Eg:Total Aids distributed, received under _IndianAgriTrustFund_ </p>
                        <div style={{ height: 'auto', marginTop: '40px' }}>
                          <CInputGroup className={`mb-3`}>
                            <CFormSelect custom name="year" id="year" onChange={handleYearChange}>
                              <option value="">Select Year</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                            </CFormSelect>
                            <CInputGroupText>
                              <CButton color="secondary" onClick={handleDownloadYearFunds}>
                                Download Aid_Funds in Year{' '}
                              </CButton>
                            </CInputGroupText>
                          </CInputGroup>

                          <CInputGroup className={`mb-3`}>
                            <CInputGroupText>Select Aid_Fund Name</CInputGroupText>
                            <CFormSelect
                              name="fund_aid"
                              value={formData.fund_aid}
                              onChange={handleFundSelect}
                            >
                              <option value="">Select Fund for ...</option>
                              {fundAids.map((fund_aid, index) => (
                                <option key={index} value={fund_aid.aid_id}>
                                  {fund_aid.aid_name}
                                </option>
                              ))}
                            </CFormSelect>
                            <CInputGroupText>
                              <CButton color="secondary" onClick={handleDownloadDataByFunds}>
                                Download Distributed Amount{' '}
                              </CButton>
                            </CInputGroupText>
                          </CInputGroup>
                          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                            <Button variant="danger" onClick={resetData}>
                              Reset
                            </Button>{' '}
                          </div>
                          <PieChart data={fundChartData} />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CContainer>
            </>
          )}
        </CRow>
      </CContainer>
    </div>
  )
}

export default AidFundingAdminTable
