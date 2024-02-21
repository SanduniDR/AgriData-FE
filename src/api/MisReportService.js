import axios from 'axios'
import { API_BASE_URL } from 'src/Config'

const getUserGroupByRole = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/users/count-by-role`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch farm details:', error)
    return
  }
}

const getAidDistributionsTotal = async (startDate, endDate) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/aid-distributions/total`,
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch aid distributions total:', error)
    return
  }
}

export { getUserGroupByRole, getAidDistributionsTotal }
