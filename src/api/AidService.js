import axios from 'axios'
import { API_BASE_URL } from 'src/Config'

const addAid = async (formData) => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/cultivation/info`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     return response
  //   } catch (error) {
  //     console.error('Failed to fetch farm details:', error)
  //     return
  //   }
}

const updateAid = async (formData) => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}/cultivation/${formData.cultivation_info_id}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     return response
  //   } catch (error) {
  //     console.error('Failed to update cultivation information:', error)
  //     return
  //   }
}

const getAidByID = async (formData) => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/cultivation/${formData.cultivation_info_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     return response
  //   } catch (error) {
  //     if (error.response.status === 404) {
  //       alert('No records found')
  //       return
  //     }
  //     console.error('Failed to fetch cultivation information:', error)
  //     return
  //   }
}

const searchAidInfo = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        aid_name: formData.aid_name,
        year: formData.year,
        aid_batch: formData.aid_batch,
        aid_id: formData.aid_id,
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
    console.error('Failed to search Aid information:', error)
    return
  }
}

const searchTotalAidInfo = async (formData, pageSize) => {
  const token = localStorage.getItem('token')
  let page = 1
  let totalItems = 0
  let allData = []

  try {
    while (true) {
      const response = await axios.get(`${API_BASE_URL}/aid/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          aid_name: formData.aid_name,
          year: formData.year,
          aid_batch: formData.aid_batch,
          aid_id: formData.aid_id,
          page: page,
          pageSize: pageSize,
        },
      })

      totalItems += response.data.data.length
      allData = allData.concat(response.data.data)

      if (totalItems >= response.data.total_items) {
        break
      }

      page++
    }

    if (totalItems === 0) {
      alert('No records found')
    }
    console.log('allData', allData)
    return allData
  } catch (error) {
    console.error('Failed to search Aid information:', error)
    return
  }
}

const deleteAid = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/${aid_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete Aid information:', error)
    return
  }
}

const searchFertilizerAidInfo = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/fertilizer/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name: formData.aid_name,
        brand: formData.brand,
        aid_id: formData.aid_id,
        page: page,
        pageSize: pageSize,
      },
    })

    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search Aid information:', error)
    return
  }
}

const addFertilizerAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/aid/fertilizer`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to add fertilizer details:', error)
    return
  }
}

const updateFertilizerAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    console.log(formData)
    const response = await axios.put(
      `${API_BASE_URL}/aid/fertilizer/${formData.fertilizer_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update fertilizer details:', error)
    return
  }
}

const deleteFertilizerAid = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/fertilizer/${aid_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete fertilizer details:', error)
    return
  }
}

const searchPesticidesAidInfo = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/pesticides/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name: formData.aid_name,
        brand: formData.brand,
        aid_id: formData.aid_id,
        page: page,
        pageSize: pageSize,
      },
    })

    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search Aid information:', error)
    return
  }
}

const addPesticidesAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/aid/pesticides`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to add pesticide details:', error)
    return
  }
}

const updatePesticidesAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    console.log(formData)
    const response = await axios.put(
      `${API_BASE_URL}/aid/pesticides/${formData.pesticides_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update pesticide details:', error)
    return
  }
}

const deletePesticidesAid = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/pesticides/${aid_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete pesticide details:', error)
    return
  }
}

const searchMonetaryAidInfo = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/monetary-aid/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        aid_id: formData.aid_name,
        monetary_aid_id: formData.monetary_aid_id,
        description: formData.brand,
        reason: formData.aid_id,
        page: page,
        pageSize: pageSize,
      },
    })

    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search Aid information:', error)
    return
  }
}

const addMonetaryAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/aid/monetary-aid`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to add monetary details:', error)
    return
  }
}

const updateMonetaryAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    console.log(formData)
    const response = await axios.put(
      `${API_BASE_URL}/aid/monetary-aid/${formData.monetaryAid_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update monetary details:', error)
    return
  }
}

const deleteMonetaryAid = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/monetary-aid/${aid_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete monetary details:', error)
    return
  }
}

const addAidDistribution = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/aid/aid-distribution`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to add aid distribution:', error)
    return
  }
}

const searchAidDistribution = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/aid-distribution/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        aid_id: formData.aid_id,
        agri_office_id: formData.agri_office_id,
        date: formData.date,
        time: formData.time,
        in_charged_officer_id: formData.in_charged_officer_id,
        cultivation_info_id: formData.cultivation_info_id,
        farmer_id: formData.farmer_id,
        amount_received: formData.amount_received,
        amount_approved: formData.amount_approved,
        description: formData.description,
        page: page,
        pageSize: pageSize,
      },
    })

    if (response.data.total_items === 0) {
      alert('No records found')
    }

    return response
  } catch (error) {
    console.error('Failed to search aid distribution:', error)
    return
  }
}

const updateAidDistribution = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${API_BASE_URL}/aid/aid-distribution/${formData.distribution_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update aid distribution:', error)
    return
  }
}

const deleteAidDistribution = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/aid-distribution/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete aid distribution:', error)
    return
  }
}

const addFuelAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(`${API_BASE_URL}/aid/fuel-aid`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to add fuel aid:', error)
    return error
  }
}

const searchFuelAid = async (formData, page, pageSize) => {
  const token = localStorage.getItem('token')
  console.log('formData', formData)
  try {
    const response = await axios.get(`${API_BASE_URL}/aid/fuel-aid/search`, {
      params: {
        aid_id: formData.aid_id,
        fuel_type: formData.type,
        reason: formData.reason,
        description: formData.description,
        page: page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.total_items === 0) {
      alert('No records found')
    }
    console.log('response', response)
    return response
  } catch (error) {
    console.error('Failed to search fuel aid:', error)
    return
  }
}

const deleteFuelAid = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.delete(`${API_BASE_URL}/aid/fuel-aid/${aid_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to delete fuel aid:', error)
    return
  }
}

const updateFuelAid = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(
      `${API_BASE_URL}/aid/fuel-aid/${formData.fuelAid_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to update fuel aid:', error)
    return
  }
}

export {
  addAid,
  updateAid,
  getAidByID,
  searchAidInfo,
  searchTotalAidInfo,
  deleteAid,
  searchPesticidesAidInfo,
  addPesticidesAid,
  updatePesticidesAid,
  deletePesticidesAid,
  searchFertilizerAidInfo,
  addFertilizerAid,
  updateFertilizerAid,
  deleteFertilizerAid,
  searchMonetaryAidInfo,
  addMonetaryAid,
  updateMonetaryAid,
  deleteMonetaryAid,
  addAidDistribution,
  searchAidDistribution,
  updateAidDistribution,
  deleteAidDistribution,
  addFuelAid,
  searchFuelAid,
  deleteFuelAid,
  updateFuelAid,
}
