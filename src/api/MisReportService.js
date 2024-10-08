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

//total distribution within given period
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

const getAidDistributionsTotalByFund = async (aid_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/aid-distributions/total-byfund`,
      {
        aid_id: aid_id,
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

const getOfficesByDistrictAndProvince = async (district, province) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/offices`, {
      params: {
        district: district,
        province: province,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
    return
  }
}

const getAllOfficesAndDistrictsByProvince = async (province) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/offices-districts/by-province`, {
      params: {
        province: province,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices and districts:', error)
    return
  }
}

const getAllFarmersByDistrictsAndProvince = async (province, district) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `${API_BASE_URL}/report/users/farmer/count-by-district-and-province`,
      {
        params: {
          province: province,
          district: district,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmers details:', error)
    return
  }
}

const getFarmersCountByDistrict = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/farmer/total_count-by-district`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const searchCultivationInfoCountByYearly = async (year, crop_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/search/cultivation-info`,
      {
        crop_id: crop_id,
        year: year,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const searchCultivationInfoCountByMonthly = async (year, crop_id, month) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/search/cultivation-info/monthly`,
      {
        crop_id: crop_id,
        year: year,
        month: month,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const searchCultivationInfoCountByDistrictMonthly = async (year, crop_id, month, district) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/search/cultivation-info/monthly/district`,

      {
        crop_id: crop_id,
        year: year,
        month: month,
        district: district,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const searchCultivationInfoCountByDistrictMonthlyOffice = async (
  year,
  crop_id,
  month,
  district,
  office_id,
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/search/cultivation-info/monthly/district/office`,

      {
        crop_id: crop_id,
        year: year,
        month: month,
        district: district,
        office_id: office_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const searchCultivationMapInfoByDistrictMonthlyOffice = async (
  year,
  crop_id,
  month,
  district,
  office_id,
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${API_BASE_URL}/report/search/cultivation-map/monthly/district/office`,

      {
        crop_id: crop_id,
        year: year,
        month: month,
        district: district,
        office_id: office_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error('Failed to fetch farmer for districts:', error)
    return
  }
}

const getAllOfficesByDistrict = async (district) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/offices/by-district`, {
      params: {
        district: district,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
    return
  }
}

const getAllTaxPayersByDistrictByOffice = async (district, office_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/search_tax/acre_tax`, {
      params: {
        district: district,
        office_id: office_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
  }
}

const getAllTaxPayersDetailsByDistrictByOffice = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/get_info_tax/acre_tax`, {
      params: {
        district: formData.district,
        office_id: formData.office_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
  }
}

const getAllDistrictTaxData = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/search_tax/all_acre_tax`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
  }
}

const getOfficerDetailByOffice = async (office_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/officers-by-office`, {
      params: {
        office_id: office_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch offices:', error)
  }
}

const searchDisasterInfoByDistrictMonthlyOffice = async (formData, page, per_page) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/disaster/disaster-info/search`, {
      params: {
        year: formData.year,
        month: formData.month,
        crop_id: formData.crop_id,
        type: formData.type,
        district: formData.district,
        office_id: formData.office_id,
        page: page,
        per_page: per_page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch disaster info:', error)
  }
}

const getFarmerDetailByOffice = async (office_id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_BASE_URL}/report/farmer_mails_by_office_Id`, {
      params: {
        office_id: office_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Failed to fetch farmers:', error)
  }
}

export {
  searchDisasterInfoByDistrictMonthlyOffice,
  getAllOfficesByDistrict,
  getOfficerDetailByOffice,
  getAllDistrictTaxData,
  getAllTaxPayersByDistrictByOffice,
  getUserGroupByRole,
  getAidDistributionsTotal,
  getOfficesByDistrictAndProvince,
  getAllOfficesAndDistrictsByProvince,
  getFarmersCountByDistrict,
  getAllFarmersByDistrictsAndProvince,
  getAidDistributionsTotalByFund,
  searchCultivationInfoCountByYearly,
  searchCultivationInfoCountByMonthly,
  searchCultivationInfoCountByDistrictMonthly,
  searchCultivationInfoCountByDistrictMonthlyOffice,
  searchCultivationMapInfoByDistrictMonthlyOffice,
  getAllTaxPayersDetailsByDistrictByOffice,
  getFarmerDetailByOffice,
}
