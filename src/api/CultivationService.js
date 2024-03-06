import axios from 'axios'
import { API_BASE_URL } from 'src/Config'

const addCultivationInfo = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/cultivation/info`, formData, {
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
      `${API_BASE_URL}/cultivation/${formData.cultivation_info_id}`,
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
      `${API_BASE_URL}/cultivation/${formData.cultivation_info_id}`,
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
  console.log('searchCultivationInfo:', formData)
  try {
    const response = await axios.get(`${API_BASE_URL}/cultivation/search`, {
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
        per_page: pageSize,
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

const getTotalCultivationRecordsByYearByType = async (formData, pageSize) => {
  let page = 1
  let totalRecords = []
  while (true) {
    try {
      const response = await searchCultivationInfo(formData, page, pageSize)
      console.log('getTotalCultivationRecordsByYearByType:', response)
      if (response && response.data && response.data) {
        totalRecords = totalRecords.concat(response.data.data)

        if (totalRecords.length >= response.data.total_items) {
          break
        }

        page++
      } else {
        break
      }
    } catch (error) {
      console.error('Failed to get records:', error)
      break
    }
  }

  return totalRecords
}

export {
  addCultivationInfo,
  updateCultivationInfo,
  getCultivationInfoById,
  searchCultivationInfo,
  getTotalCultivationRecordsByYearByType,
}
