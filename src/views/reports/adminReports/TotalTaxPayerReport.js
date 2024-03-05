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
import { cilArrowCircleBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CChartBar } from '@coreui/react-chartjs'
import { API_BASE_URL } from 'src/Config'
import { Container } from 'react-bootstrap'
import Papa from 'papaparse'
import { exportData } from 'src/utils/Utils'
import {
  getAllOfficesByDistrict,
  getAllTaxPayersByDistrictByOffice,
  getAllDistrictTaxData,
} from 'src/api/MisReportService'

const TotalTaxPayerReport = () => {
  const [taxPayers, setTaxPayers] = useState([])
  const [district, setDistrict] = useState([])
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

  useEffect(() => {
    if (formData.district !== '' && formData.office_id !== '') {
      handleFarmerCount()
    }
  }, [formData])

  const handleDownloadByDistrict = (event) => {
    const jsonData = JSON.stringify(taxPayers)
    exportData(jsonData, 'taxpayers.csv', 'text/csv;charset=utf-8;')
  }

  const handleDownloadByoffice = (event) => {
    const jsonData = JSON.stringify(taxPayers)
    exportData(jsonData, 'taxpayers.csv', 'text/csv;charset=utf-8;')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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

  return (
    <Container>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4>Acre Tax Payer Tracking Report</h4>
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
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </Container>
  )
}

export default TotalTaxPayerReport
