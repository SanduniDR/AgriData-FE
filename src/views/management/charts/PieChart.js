import React from 'react'
import PropTypes from 'prop-types'
import { CChart } from '@coreui/react-chartjs'
import { CContainer } from '@coreui/react'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const PieChart = ({ data }) => {
  const labels = Object.keys(data)
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: labels.map(() => getRandomColor()),
        borderColor: labels.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  }

  return (
    <CContainer fluid>
      <CChart
        type="pie"
        data={chartData}
        options={{
          plugins: {
            legend: {
              labels: {
                color: '#000000',
              },
            },
          },
        }}
      />
    </CContainer>
  )
}

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
}
export default PieChart
