import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { cilUser } from '@coreui/icons'
import { searchAidInfo, deleteAid } from 'src/api/AidService'

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

      return
    }

    const response = await searchAidInfo(formData, newPage, 10)
    //const { data, total_pages } = response
    setAids(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (aid_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    // Call the backend API to delete the cultivation
    console.log(aid_id)
    // axios
    //   .delete(`${API_BASE_URL}/aid/${aid_id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     alert('Aid deleted successfully.')
    //     // Refresh the farm list
    //     handleCleanForm()
    //   })
    //   .catch(function (error) {
    //     console.error(error)
    //     if (error.response.status === 404) {
    //       handleCleanForm()
    //     } else {
    //       alert('An error occurred while deleting the Aid.')
    //     }
    //   })
    const response = await deleteAid(aid_id)
    if (response.status === 200) {
      alert('Aid deleted successfully.')
      handleCleanForm()
    }
  }

  // const handleUpdate = (farmID) => {
  //   // Navigate to the update farm page with the selected farm ID
  //   // setActiveTabKey('2'); // Set the activeKey to the key of TabPane 2
  // }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Search Aid info</h1>
                  <p className="text-medium-emphasis">Filter Aid records</p>
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
                        <CTableHeaderCell>Actions</CTableHeaderCell>
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
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(aid.aid_id)}
                                >
                                  Delete
                                </CButton>
                                {/* <CButton color="info" onClick={() => handleUpdate(user.user_id)}>
                                  Update
                                </CButton> */}
                              </CTableDataCell>
                            </CTableRow>
                          )
                        ),
                      )}
                    </CTableBody>
                  </CTable>
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
