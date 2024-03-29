import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CFormSelect,
  CInputGroupText,
  CButton,
  CCol,
  CCard,
  CRow,
  CCardBody,
  CInputGroup,
} from '@coreui/react'
import { Button } from 'react-bootstrap'
import { CChartBar } from '@coreui/react-chartjs'
import { Container } from 'react-bootstrap'
import { exportData } from 'src/utils/Utils'
import {
  getAllOfficesByDistrict,
  getAllTaxPayersByDistrictByOffice,
  getAllDistrictTaxData,
  getAllTaxPayersDetailsByDistrictByOffice,
} from 'src/api/MisReportService'
import { convertJsonToCsv } from 'src/api/UserService'
import { saveAs } from 'file-saver'

const TotalTaxPayerReport = () => {
  const [taxPayers, setTaxPayers] = useState([])
  const [taxPayersInfo, setTaxPayersInfo] = useState([])
  const [offices, setOffices] = useState([])
  const [formData, setFormData] = useState({
    district: '',
    office_id: '',
  })

  const handlePDistrictChange = async () => {
    console.log(formData)
    const response = await getAllOfficesByDistrict(formData.district)
    console.log(response)
    setOffices(response.data.offices)
  }

  const getAllDistrictData = async () => {
    console.log(formData)
    const response = await getAllDistrictTaxData()
    console.log(response)
    setTaxPayers(response.data)
  }

  useEffect(() => {
    getAllDistrictData()
  }, [])

  useEffect(() => {
    if (formData.district !== '') {
      handlePDistrictChange()
    }
  }, [formData.district])

  const handleFarmerCount = async () => {
    const response = await getAllTaxPayersByDistrictByOffice(formData.district, formData.office_id)
    console.log(response)
    setTaxPayers(response.data)
  }

  const handleGetTaxPayerInfo = async () => {
    const response = await getAllTaxPayersDetailsByDistrictByOffice(formData)
    console.log(response)
    setTaxPayersInfo(response.data)
  }

  useEffect(() => {
    if (formData.district !== '' && formData.office_id !== '') {
      handleFarmerCount()
      handleGetTaxPayerInfo()
    }
  }, [formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

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

  const resetData = () => {
    // Clear the state variables
    setTaxPayers([])
    setOffices([])
    setTaxPayersInfo([])
  }
  const handleDownload = () => {
    //dowanload as a csv file
    const csv = convertJsonToCsv(taxPayersInfo)
    const blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, 'taxpayersInfoofSelectedDistrict.csv')
  }

  return (
    <Container>
      <CCard>
        <CCardBody style={{ height: '600px' }}>
          <CRow>
            <CCol>
              <h4>Total Acre Tax Payers in Districts</h4>
              <div style={{ height: 'auto', marginTop: '40px' }}>
                <CInputGroup className={`mb-3`}>
                  <CFormSelect
                    id="district"
                    name="district"
                    value={FormData.district}
                    onChange={handleInputChange}
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
                    value={FormData.office_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Office</option>
                    {offices.map((office, index) => (
                      <option key={index} value={office.agri_office_id}>
                        {office.name}
                      </option>
                    ))}
                  </CFormSelect>
                  {/* if data set to taxPayersInfo [] */}
                  {taxPayersInfo.length > 0 && (
                    <CInputGroupText>
                      <CButton color="secondary" onClick={handleDownload}>
                        Download (.csv){' '}
                      </CButton>
                    </CInputGroupText>
                  )}
                </CInputGroup>
                <CChartBar
                  style={{ height: '300px', marginTop: '10px' }}
                  data={{
                    labels: taxPayers.map((data) => data.district),
                    datasets: [
                      {
                        label: 'Tax payer count',
                        backgroundColor: 'blue',
                        data: taxPayers.map((data) => data.farmer_count),
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                      y: {
                        ticks: {
                          beginAtZero: true,
                          maxTicksLimit: 5,
                          stepSize: Math.ceil(250 / 5),
                          max: Math.max(...taxPayers.map((data) => data.farmer_count)) + 100,
                        },
                      },
                    },
                  }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="danger" onClick={resetData}>
                  Reset
                </Button>{' '}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </Container>
  )
}

export default TotalTaxPayerReport
