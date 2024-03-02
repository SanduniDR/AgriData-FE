import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CFormSelect } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { API_BASE_URL } from 'src/Config'

const HarvestChart = () => {
  const [harvestData, setHarvestData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())

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
    <div>
      <CFormSelect custom name="year" id="year" onChange={handleYearChange}>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </CFormSelect>
      <CChartBar
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: harvestData.map((data) => data.crop_name),
          datasets: [
            {
              label: 'Harvest Amount',
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
                max: 250,
              },
            },
          },
        }}
      />
    </div>
  )
}

export default HarvestChart
