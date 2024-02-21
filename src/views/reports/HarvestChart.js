import React from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const HarvestChart = () => {
  // Mock data
  const harvestData = [
    { month: 'January', crop1: 100, crop2: 0, crop3: 150 },
    { month: 'February', crop1: 200, crop2: 0, crop3: 160 },
    { month: 'March', crop1: 20, crop2: 0, crop3: 170 },
    { month: 'April', crop1: 0, crop2: 140, crop3: 0 },
    { month: 'May', crop1: 0, crop2: 200, crop3: 0 },
    { month: 'June', crop1: 0, crop2: 0, crop3: 240 },
    { month: 'July', crop1: 0, crop2: 0, crop3: 270 },
    { month: 'August', crop1: 0, crop2: 0, crop3: 0 },
    { month: 'September', crop1: 0, crop2: 0, crop3: 0 },
    { month: 'October', crop1: 240, crop2: 0, crop3: 230 },
    { month: 'November', crop1: 210, crop2: 0, crop3: 200 },
    { month: 'December', crop1: 180, crop2: 0, crop3: 0 },
  ]

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 id="traffic" className="card-title mb-0">
              Harvest
            </h4>
            <div className="small text-medium-emphasis">2023</div>
          </CCol>
        </CRow>
        <CChartBar
          style={{ height: '300px', marginTop: '40px' }}
          data={{
            labels: harvestData.map((data) => data.month),
            datasets: [
              {
                label: 'Crop 1',
                backgroundColor: 'blue',
                data: harvestData.map((data) => data.crop1),
              },
              {
                label: 'Crop 2',
                backgroundColor: 'green',
                data: harvestData.map((data) => data.crop2),
              },
              {
                label: 'Crop 3',
                backgroundColor: 'red',
                data: harvestData.map((data) => data.crop3),
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
                  max: 250,
                },
              },
            },
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default HarvestChart
