import axios from 'axios'

const getFarmers = async (office_id = 0, field_area_id = 0, page = 1, per_page = 50) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('http://127.0.0.1:5000/user/search_farmers', {
      params: {
        office_id: office_id,
        field_area_id: field_area_id,
        page: page,
        per_page: per_page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.farmers
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}

const getUserById = async (userId) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://127.0.0.1:5000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch user with id ${userId}:`, error)
    return null
  }
}

const getUserByMail = async (email) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://127.0.0.1:5000/user/find_by_email`, {
      params: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch user with id ${email}: , Contact Admin Service`, error)
    return null
  }
}

const getFarmerById = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://127.0.0.1:5000/user/farmer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to get farmer:', error)
    alert('Failed to get farmer details, Contact admin service')
    return null
  }
}

const addFarmer = async (farmerData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/user/farmer',
      {
        assigned_field_area_id: farmerData.assigned_field_area_id,
        assigned_office_id: farmerData.assigned_office_id,
        tax_file_no: farmerData.tax_file_no,
        user_id: farmerData.user_id,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.data.error) {
      alert(response.data.error)
      return null
    } else {
      alert('Farmer Added Successfully!')
      window.location.href = '/management/farmer'
      return response.data
    }
  } catch (error) {
    console.error('Failed to add farmer:', error)
    return null
  }
}

const updateFarmer = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `http://127.0.0.1:5000/user/farmer/${formData.user_id}`,
      {
        assigned_field_area_id: formData.assigned_field_area_id,
        assigned_office_id: formData.assigned_office_id,
        tax_file_no: formData.tax_file_no,
        user_id: formData.user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.data.error) {
      alert(response.data.error)
      return null
    } else {
      alert('Farmer Updated Successfully!')
      // window.location.href = '/management/farmer'
      return response.data
    }
  } catch (error) {
    console.error('Failed to update farmer:', error)
    return null
  }
}

const checkToken = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/user/check_token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.is_expired && response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Failed to validate token:', error)
    return false
  }
}

export {
  getFarmers,
  getUserById,
  addFarmer,
  getUserByMail,
  getFarmerById,
  updateFarmer,
  checkToken,
}
