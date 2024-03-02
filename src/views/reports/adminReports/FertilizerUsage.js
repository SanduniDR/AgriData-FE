import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CFormSelect, CCol, CCard, CRow, CCardBody } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { API_BASE_URL } from 'src/Config'
import { Container } from 'react-bootstrap'

const FertilizersUsage = () => {
  const [harvestData, setHarvestData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/report/fertilizer-distributions/monthly/${year}`,
        )
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
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4>Total aid distribution in the following time range:</h4>
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
                    labels: harvestData.map((data) => `Month ${data.month}`),
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

export default FertilizersUsage
