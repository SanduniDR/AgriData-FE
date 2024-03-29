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
import { convertJsonToCsv } from 'src/api/UserService'
import { saveAs } from 'file-saver'

const AdminAdvertismentServiceReport = () => {
  const [AdData, setAdData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('')
  const [crops, setCrops] = useState([])

  useEffect(() => {
    const getData = async (year, type) => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${API_BASE_URL}/report/ads/monthly`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            crop_id: type,
            year: year,
          },
        })
        console.log(response.data)
        setAdData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    getData(year, type)
  }, [year, type])

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

  const handleTypeSelect = (e) => {
    setType(e.target.value)
  }

  // const handleDownload = (event) => {
  //   const jsonData = JSON.stringify(AdData)
  //   exportData(jsonData, 'AdvertisementDataByMonth.csv', 'text/csv;charset=utf-8;')
  // }

  const handleDownload = () => {
    //dowanload as a csv file
    const csv = convertJsonToCsv(AdData)
    const blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, 'AddsCount.csv')
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${API_BASE_URL}/crop/crops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCrops(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const resetData = () => {
    // Clear the state variables
    setAdData([])
    setCrops([])
    setYear('')
    setType('')
  }
  return (
    <Container>
      <CCard>
        <CCardBody style={{ height: '600px' }}>
          <CRow>
            <CCol>
              <h4>Total Advertisements:</h4>
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
                  <CInputGroup className={`mb-3`}>
                    <CFormSelect custom name="crop_id" value={type} onChange={handleTypeSelect}>
                      <option value="">Crop Type</option>
                      {crops.map((crop, index) => (
                        <option key={index} value={crop.crop_id}>
                          {crop.crop_name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>
                  {AdData.length > 0 && (
                    <CInputGroupText>
                      <CButton color="secondary" onClick={handleDownload}>
                        Download{' '}
                      </CButton>
                    </CInputGroupText>
                  )}
                </CInputGroup>
                <CChartBar
                  style={{ height: '300px', marginTop: '10px' }}
                  data={{
                    labels: AdData.map((data) => monthNames[data.month - 1]),
                    datasets: [
                      {
                        label: 'Total Advertisements Count',
                        backgroundColor: 'green',
                        data: AdData.map((data) => data.total_ads),
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
                          max: Math.max(...AdData.map((data) => data.total_ads)) + 100,
                        },
                      },
                    },
                  }}
                />
                {AdData.length > 0 && (
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <Button variant="danger" onClick={resetData}>
                      Reset
                    </Button>{' '}
                  </div>
                )}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </Container>
  )
}

export default AdminAdvertismentServiceReport
