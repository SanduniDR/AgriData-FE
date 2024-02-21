import axios from 'axios'

const getFarmById = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://127.0.0.1:5000/farm/${formData.farm_id}`, {
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
