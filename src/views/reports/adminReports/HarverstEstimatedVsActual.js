import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CFormSelect, CCol, CCard, CRow, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { API_BASE_URL } from 'src/Config'
import { Container } from 'react-bootstrap'

const HarvestEstimatedVsActual = () => {
  const [harvestData, setHarvestData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [formData, setFormData] = useState({ start_date: '', end_date: '' }) // Add this line

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/report/harvest-amount-by-crop/${year}`)
        setHarvestData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    getData()
  }, [year])

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

  return (
    <Container>
      <CCard className="mx-4">
        <CCardBody>
          <CRow>
            <CCol>
              <h4>Total aid distribution in the following time range:</h4>
              <div className="small text-medium-emphasis">
                {' '}
                {formData.start_date} : {formData.end_date}
              </div>
              <div style={{ height: 'auto', marginTop: '40px' }}>
                <CFormSelect custom name="year" id="year" onChange={handleYearChange}>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </CFormSelect>
                <CChartBar
                  style={{ height: '300px', marginTop: '10px' }}
                  data={{
                    labels: harvestData.map((data) => data.crop_name),
                    datasets: [
                      {
                        label: 'Expected Harvest Amount',
                        backgroundColor: 'blue',
                        data: harvestData.map((data) => data.total_estimated_harvested_amount),
                      },
                      {
                        label: 'Actual Harvest Amount',
                        backgroundColor: 'green',
                        data: harvestData.map((data) => data.total_harvested_amount),
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
                            Math.max(...harvestData.map((data) => data.total_harvested_amount)) +
                            100, // Adjusted max value
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

export default HarvestEstimatedVsActual
