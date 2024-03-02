import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilTrash } from '@coreui/icons'
import { searchAidInfo, deleteAid } from 'src/api/AidService'
import ShowMap from 'src/views/maps/ShowMap'
import { API_BASE_URL } from 'src/Config'

const SearchAIds = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    aid_name: '',
    in_charged_office_id: '',
    description: '',
    year: '',
    aid_id: '',
    aid_batch: '',
  })

  const [aids, setAids] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setAids([])
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchAidInfo(formData, newPage, 10)
    //const { data, total_pages } = response
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDownload = async (aid_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await searchAidInfo(formData, currentPage, 10)
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleCleanForm = () => {
    setFormData({
      aid_name: '',
      in_charged_office_id: '',
      description: '',
      year: '',
      aid_id: '',
      aid_batch: '',
    })
    setAids([])
    setCurrentPage(1)
  }

  return (
    <div className="bg-light d-flex flex-row">
      <CContainer fluid>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <CForm>
                  <h4>Search Aid info</h4>
                  <p className="text-medium-emphasis">Filter Fund with Aid types</p>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid ID"
                      autoComplete="Aid ID"
                      onChange={handleInputChange}
                      name="aid_id"
                      value={formData.aid_id}
                      disabled={formData.year || formData.aid_batch || formData.aid_name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Year"
                      autoComplete="year"
                      onChange={handleInputChange}
                      name="year"
                      value={formData.year}
                      disabled={formData.aid_id || formData.aid_batch || formData.name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid Batch"
                      autoComplete="Aid Batch"
                      onChange={handleInputChange}
                      name="aid_batch"
                      value={formData.aid_batch}
                      disabled={formData.aid_id || formData.year || formData.name}
                    />
                  </CInputGroup>
                  <CInputGroup className={`mb-3`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Aid Name"
                      autoComplete="Aid Name"
                      onChange={handleInputChange}
                      name="aid_name"
                      value={formData.aid_name}
                      disabled={formData.aid_id || formData.year || formData.aid_batch}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleSubmit}>
                      Search
                    </CButton>
                    <br />
                    <CButton color="danger" onClick={handleCleanForm}>
                      Clear
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {aids.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>AID ID</CTableHeaderCell>
                        <CTableHeaderCell>Aid Name</CTableHeaderCell>
                        <CTableHeaderCell>Year</CTableHeaderCell>
                        <CTableHeaderCell>Aid Batch</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {aids.map(
                        (aid) => (
                          console.log(aid),
                          (
                            <CTableRow>
                              <CTableDataCell>{aid.aid_id}</CTableDataCell>
                              <CTableDataCell>{aid.aid_name}</CTableDataCell>
                              <CTableDataCell>{aid.year}</CTableDataCell>
                              <CTableDataCell>{aid.aid_batch}</CTableDataCell>
                            </CTableRow>
                          )
                        ),
                      )}
                    </CTableBody>
                    <CPagination
                      size="sm"
                      activePage={currentPage}
                      pages={totalPages}
                      onActivePageChange={(i) => handlePageChange(i)}
                    >
                      {Array.from({ length: totalPages }, (_, index) => (
                        <CPaginationItem
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </CPaginationItem>
                      ))}
                    </CPagination>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CContainer>
    </div>
  )
}

export default SearchAIds
