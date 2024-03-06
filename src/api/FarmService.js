import axios from 'axios'
import { API_BASE_URL } from 'src/Config'
const getFarmById = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/farm/${formData.farm_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return
  }
}

export { getFarmById }
