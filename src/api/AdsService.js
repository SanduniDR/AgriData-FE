import axios from 'axios'
import { API_BASE_URL } from 'src/Config'

const getMyAdvertisements = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/market/my_advertisement`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user_id: formData.user_id,
        page: page,
        page_size: pageSize,
      },
    })
    console.log(response, 'response')
    if (response.request.status === 404) {
      alert('No records found')
      return response
    }

    return response
  } catch (error) {
    console.error('Failed to search Advertisement:', error)
    return
  }
}

const getAllAdvertisements = async (page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/market/all_advertisements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        page_size: pageSize,
      },
    })

    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search Advertisement:', error)
    return
  }
}

const updateAdvertisement = async (id, formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(`${API_BASE_URL}/advertisement/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      alert('Advertisement updated successfully')
    }

    return response
  } catch (error) {
    console.error('Failed to update Advertisement:', error)
    return
  }
}

const approveAdvertisement = async (id, formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${API_BASE_URL}/market/approve/advertisement`,
      null, // Pass null as the second argument for PUT requests if no data is sent in the request body
      {
        params: {
          ad_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      alert('Advertisement Approved successfully')
    }

    return response
  } catch (error) {
    console.error('Failed to update Advertisement:', error)
    return
  }
}

const addAdvertisement = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/advertisement`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 201) {
      alert('Advertisement added successfully')
    }

    return response
  } catch (error) {
    console.error('Failed to add Advertisement:', error)
    return
  }
}

const deleteAdvertisement = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/market/advertisement/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      console.log('Advertisement deleted successfully')
    }

    return response
  } catch (error) {
    console.error('Failed to delete Advertisement:', error)
    return
  }
}

const getAllofficerRegionalAdvertisement = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/market/officer/regional/ads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      console.log('Advertisements received successfully')
    }

    return response
  } catch (error) {
    console.error('Failed to delete Advertisement:', error)
    return
  }
}

export {
  getAllAdvertisements,
  getMyAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
  updateAdvertisement,
  approveAdvertisement,
  getAllofficerRegionalAdvertisement,
}
