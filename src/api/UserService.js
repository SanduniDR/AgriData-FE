import axios from 'axios'
import { saveAs } from 'file-saver'
import { API_BASE_URL } from 'src/Config'

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

const addOfficer = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/officers`,
      {
        user_id: formData.user_id,
        employee_id: formData.employee_id,
        managed_by_employee_id: formData.managed_by_employee_id,
        agri_office_id: formData.agri_office_id,
        service_start_date: formData.service_start_date,
        field_area_id: formData.field_area_id,
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
      alert('Officer Added Successfully!')
      return response
    }
  } catch (error) {
    alert('Something went wrong!, Contact DB & Support Admin Service')
    console.error('Failed to add officer:', error)
    return null
  }
}

const updateOfficer = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/officer/${formData.user_id}`,
      {
        user_id: formData.user_id,
        employee_id: formData.employee_id,
        managed_by_employee_id: formData.managed_by_employee_id,
        agri_office_id: formData.agri_office_id,
        service_start_date: formData.service_start_date,
        field_area_id: formData.field_area_id,
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
      console.log(response)
      return response
    }
  } catch (error) {
    alert('Something went wrong!, Contact DB & Support Admin Service')
    console.error('Failed to update officer:', error)
    return null
  }
}

const deleteOfficer = async (userId) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/officer/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.error) {
      alert(response.data.error)
      return null
    } else {
      alert('Officer Deleted Successfully!')
      return response.data
    }
  } catch (error) {
    alert('Something went wrong!, Contact DB & Support Admin Service')
    console.error('Failed to delete officer:', error)
    return null
  }
}

const searchOfficers = async (formdata, page = 1, per_page = 50) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/user/search/officers`, {
      params: {
        agri_office_id: formdata.agri_office_id,
        user_id: formdata.user_id,
        field_area_id: formdata.field_area_id,
        district: formdata.district,
        managed_by_employee_id: formdata.managed_by_employee_id,
        page: page,
        per_page: per_page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.officers.length === 0) {
      alert('No officers found!')
    }
    return response
  } catch (error) {
    console.error('Failed to search officers:', error)
    return []
  }
}

const getAllFarmersByOfficeID = async (office_id = 0, field_area_id = 0, per_page = 50) => {
  const token = localStorage.getItem('token')
  let page = 1
  let allFarmers = []
  while (true) {
    try {
      const response = await axios.get(`${API_BASE_URL}/report/search_farmers`, {
        params: {
          assigned_office_id: office_id,
          field_area_id: field_area_id,
          page: page,
          per_page: per_page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data.farmers.length === 0) {
        break
      }
      allFarmers = allFarmers.concat(response.data.farmers)
      page += 1
    } catch (error) {
      console.error('Failed to fetch users:', error)
      break
    }
  }

  const csv = convertJsonToCsv(allFarmers)
  const blob = new Blob([csv], { type: 'text/csv' })
  saveAs(blob, 'farmers.csv')
}

const convertJsonToCsv = (data) => {
  const replacer = (key, value) => (value === null ? '' : value)
  const header = Object.keys(data[0])
  let csv = data.map((row) =>
    header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','),
  )
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')
  return csv
}

export {
  getFarmers,
  getUserById,
  addFarmer,
  getUserByMail,
  getFarmerById,
  updateFarmer,
  checkToken,
  addOfficer,
  updateOfficer,
  searchOfficers,
  deleteOfficer,
  getAllFarmersByOfficeID,
}
