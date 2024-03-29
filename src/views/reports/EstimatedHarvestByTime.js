import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import axios from 'axios'
import { API_BASE_URL } from 'src/Config'
import { getStyle } from '@coreui/utils'

const EstimatedHarvestByTime = () => {
  const [data, setData] = useState([])

  //API Call
  useEffect(() => {
    axios.get(`${API_BASE_URL}/report/estimated-harvest/2024`).then((response) => {
      setData(response.data)
    })
  }, [])

  const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  return (
    <CChart
      type="line"
      data={{
        labels: [
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
        ],
        datasets: data.map((dataset) => {
          const color = generateColor()
          return {
            label: dataset.label,
            backgroundColor: color,
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            data: dataset.data,
          }
        }),
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: getStyle('--cui-body-color'),
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
        },
      }}
    />
  )
}

export default EstimatedHarvestByTime
