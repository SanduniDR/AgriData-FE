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

const AidDistributionByAidTypeAdmin = () => {
  const [harvestData, setHarvestData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('')

  useEffect(() => {
    const getData = async (year, type) => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${API_BASE_URL}/report/aid-distributions/monthly`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            type: type,
            year: year,
          },
        })
        setHarvestData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    getData(year, type)
  }, [year, type])

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

  const handleTypeChange = (e) => {
    setType(e.target.value)
  }

  const handleDownload = (event) => {
    const jsonData = JSON.stringify(harvestData)
    exportData(jsonData, 'harvetDataByMonth.csv', 'text/csv;charset=utf-8;')
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

  return (
    <Container>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4>Total aid distribution in the following time range:</h4>
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
                </CInputGroup>
                <CInputGroup className={`mb-3`}>
                  <CFormSelect custom name="type" id="type" onChange={handleTypeChange}>
                    <option value="">Select Type</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Pesticide">Pesticide</option>
                    <option value="Monetary">Monetary</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Other">Other</option>
                  </CFormSelect>
                  {harvestData.length > 0 && (
                    <CInputGroupText>
                      <CButton color="secondary" onClick={handleDownload}>
                        <CIcon icon={cilArrowCircleBottom} />
                      </CButton>
                    </CInputGroupText>
                  )}
                </CInputGroup>
                <CChartBar
                  style={{ height: '300px', marginTop: '10px' }}
                  data={{
                    labels: harvestData.map((data) => monthNames[data.month - 1]),
                    datasets: [
                      {
                        label: 'Total Amount Approved',
                        backgroundColor: 'blue',
                        data: harvestData.map((data) => data.total_amount_approved),
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
                          max:
                            Math.max(...harvestData.map((data) => data.total_amount_approved)) +
                            100,
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

export default AidDistributionByAidTypeAdmin
