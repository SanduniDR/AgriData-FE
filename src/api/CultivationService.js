import axios from 'axios'

const addCultivationInfo = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`http://127.0.0.1:5000/cultivation/info`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data.message)
      return
    }
    console.error('Failed to fetch farm details:', error)
    return
  }
}

const updateCultivationInfo = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `http://127.0.0.1:5000/cultivation/${formData.cultivation_info_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update cultivation information:', error)
    return
  }
}

const getCultivationInfoById = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/cultivation/${formData.cultivation_info_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    if (error.response.status === 404) {
      alert('No records found')
      return
    }
    console.error('Failed to fetch cultivation information:', error)
    return
  }
}

const searchCultivationInfo = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://127.0.0.1:5000/cultivation/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        farm_id: formData.farm_id,
        crop_id: formData.crop_id,
        agri_year: formData.agri_year,
        quarter: formData.quarter,
        page: page,
        pageSize: pageSize,
      },
    })
    // return response
    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search cultivation information:', error)
    return
  }
}

export { addCultivationInfo, updateCultivationInfo, getCultivationInfoById, searchCultivationInfo }
