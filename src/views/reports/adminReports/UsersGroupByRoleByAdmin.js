import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CIcon,
  CFormSelect,
  CButton,
} from '@coreui/react'
import PieChart from 'src/views/management/charts/PieChart'
import axios from 'axios'
import { saveAs } from 'file-saver'
import {
  getFarmersCountByDistrict,
  getAllOfficesAndDistrictsByProvince,
  getAllFarmersByDistrictsAndProvince,
} from 'src/api/MisReportService'
import { getAllFarmersByOfficeID } from 'src/api/UserService'

const UsersGroupByRoleByAdmin = () => {
  const [data, setData] = useState({})
  const currentDate = new Date().toLocaleString() //current date
  const [district, setDistrict] = useState([])
  const [offices, setOffices] = useState([])
  const [isOfficeSelected, setOfficeSelected] = useState(false)
  const [filteredOffices, setFilteredOffices] = useState([])
  const [formData, setFormData] = useState({
    office_id: '',
    district: '',
    province: '',
  })

  const sri_lanka_provinces = [
    'Central',
    'Eastern',
    'Northern',
    'Southern',
    'Western',
    'North Western',
    'North Central',
    'Uva Province',
    'Sabaragamuwa',
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // when select province
    if (formData.province !== '') {
      handleInputProvinceChange()
    }
    //when select province and district
    if (formData.province !== '' && formData.district !== '') {
      handleInputProvinceAndDistrictChange()
    }
  }, [formData.province, formData.district])

  //when select all 3 options
  useEffect(() => {
    if (formData.province !== '' && formData.district !== '' && formData.office_id !== '') {
      setOfficeSelected(true)
    }
  }, [formData.district, formData.office_id])

  const fetchData = async () => {
    const response = await getFarmersCountByDistrict()
    console.log(response)
    setData(response.data)
  }
  const resetFormData = () => {
    setFormData({
      office_id: '',
      district: '',
      province: '',
    })
    setOfficeSelected(false)
    setDistrict([])
    setOffices([])
    setData({})
    fetchData()
  }

  const handleInputProvinceChange = async (event) => {
    console.log('form data', formData)
    const response = await getAllOfficesAndDistrictsByProvince(formData.province)
    setData(transformData(response.data))
    setOffices(response.data.offices)
    setDistrict(response.data.districts)
  }

  const handleInputProvinceAndDistrictChange = async (event) => {
    console.log('form data', formData)
    const response = await getAllFarmersByDistrictsAndProvince(formData.province, formData.district)
    setData(response.data)
  }

  //get farmer count by district
  const handleInputChange = async (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    const response = await getFarmersCountByDistrict()
    console.log(response)
    setData(response.data)
  }

  const handleInputDistrictChange = async (event) => {
    const { value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: value,
    }))
    const filteredOffices = filterOfficesByDistrict(offices, value)
    console.log('filtered offices', filteredOffices)
    setFilteredOffices(filteredOffices)
  }

  const transformData = (data) => {
    const result = {}

    data.offices.forEach((office) => {
      if (result[office.district]) {
        result[office.district] += 1
      } else {
        result[office.district] = 1
      }
    })

    return result
  }

  const handleDownload = async () => {
    const response = getAllFarmersByOfficeID(formData.office_id)
  }

  const filterOfficesByDistrict = (offices, district) => {
    return offices.filter((office) => office.district === district)
  }

  return (
    <div className="bg-light d-flex flex-row" style={{ background: 'white' }}>
      <CContainer fluid>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CRow>
              <CCol>
                <h4 id="traffic" className="card-title mb-0">
                  Total Registered Farmer Information
                </h4>
                <div className="small text-medium-emphasis">{currentDate}</div>
                <CInputGroup className={`mb-3`}>
                  <CInputGroupText>Select Province</CInputGroupText>
                  <CFormSelect
                    onChange={handleInputChange}
                    name="province"
                    value={formData.province}
                  >
                    <option value="">Select Province</option>
                    {sri_lanka_provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className={`mb-3`}>
                  <CInputGroupText>Select District</CInputGroupText>
                  <CFormSelect
                    onChange={handleInputDistrictChange}
                    name="district"
                    value={formData.district}
                  >
                    <option value="">Select District</option>
                    {district.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup className={`mb-3`}>
                  <CInputGroupText>Office</CInputGroupText>
                  <CFormSelect
                    onChange={handleInputChange}
                    name="office_id"
                    value={formData.office_id}
                  >
                    <option value="">Select Office</option>
                    {filteredOffices.map((office) => (
                      <option key={office.agri_office_id} value={office.agri_office_id}>
                        {office.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
                <Button variant="danger" onClick={resetFormData}>
                  Reset
                </Button>
              </CCol>
            </CRow>
            <CRow className="m-3">
              <CCol>
                {isOfficeSelected ? (
                  <>
                    <CButton onClick={handleDownload}>
                      Download Farmer Data of Office ID (.csv): {formData.office_id}
                    </CButton>
                  </>
                ) : (
                  <PieChart data={data} />
                )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default UsersGroupByRoleByAdmin
