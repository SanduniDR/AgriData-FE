import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

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
import { exportData } from 'src/utils/Utils'

const AidDistributionByAidTypeAdmin = () => {
  const [approvedAidData, setApprovedAidData] = useState([])
  const [receivedAidData, setReceivedAidData] = useState([])
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
        setApprovedAidData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    if (year !== '' && type !== '') getData(year, type)
  }, [year, type])

  useEffect(() => {
    const getData = async (year, type) => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(
          `${API_BASE_URL}/report/aid-distributions-received/monthly`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              type: type,
              year: year,
            },
          },
        )
        setReceivedAidData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    if (year !== '' && type !== '') getData(year, type)
  }, [year, type])

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

  const handleTypeChange = (e) => {
    setType(e.target.value)
  }

  const resetData = () => {
    // Clear the state variables
    setApprovedAidData([])
    setReceivedAidData([])
    setYear('')
    setType('')
  }

  //download
  const handleDownload = (event) => {
    let aidApprovevsReceived = []
    aidApprovevsReceived = [...receivedAidData, ...approvedAidData]
    const jsonData = JSON.stringify(aidApprovevsReceived)
    exportData(jsonData, 'AiddistributionByMonth.csv', 'text/csv;charset=utf-8;')
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
        <CCardBody style={{ height: '600px', width: '800px' }}>
          <CRow>
            <CCol>
              <h4> Monthly Aid distribution </h4>
              <p> The approved amount and, Monthly aids distribution among farmers </p>
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
                    <option value="Fertilizer">Fertilizer (kg)</option>
                    <option value="Pesticide">Pesticide (Litre)</option>
                    <option value="Monetary">Monetary (Lkr)</option>
                    <option value="Fuel">Fuel (Litre)</option>
                    <option value="Other">Miscellaneous</option>
                  </CFormSelect>
                  {/* CButton appears if condiion true */}
                  {approvedAidData.length > 0 && (
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
                    labels: approvedAidData.map((data) => monthNames[data.month - 1]),
                    datasets: [
                      {
                        label: 'Total Amount Approved',
                        backgroundColor: 'blue',
                        data: approvedAidData.map((data) => data.total_amount_approved),
                      },
                      {
                        label: 'Total Amount Distributed',
                        backgroundColor: 'green',
                        data: receivedAidData.map((data) => data.total_amount_received),
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
                            Math.max(...approvedAidData.map((data) => data.total_amount_approved)) +
                            100,
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

export default AidDistributionByAidTypeAdmin
