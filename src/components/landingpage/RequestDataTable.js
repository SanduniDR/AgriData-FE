import React, { useState } from 'react'
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
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CTableBody,
} from '@coreui/react'
import { API_BASE_URL } from 'src/Config'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCalendar, cilCreditCard, cilTag, cilTrash, cilPencil } from '@coreui/icons'

export default function RequestDataTable() {
  const [requests, setRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSubmit = () => {
    const token = localStorage.getItem('token')

    axios
      .post(
        `${API_BASE_URL}/communication/get-data-requests`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        console.log(response)
        setRequests(response.data.requests)
        setTotalPages(response.data.total_pages)
        // console.log(response.data.total_pages)
        // console.log(totalPages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching available data requests.')
      })

    //2. save response
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    axios
      .post(
        `${API_BASE_URL}/communication/get-data-requests`,
        {
          page: newPage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        console.log(response)
        setRequests(response.data.requests)
        setTotalPages(response.data.total_pages)
        console.log(response.data.total_pages)
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching available data requests.')
      })
  }

  return (
    <div>
      <CContainer fluid style={{ marginTop: '100px' }}>
        <CRow className="justify-content-center">
          <CCol xs={6}>
            <CButton color="primary" onClick={handleSubmit}>
              View Data Requests
            </CButton>
          </CCol>
        </CRow>
        {requests.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Request Id</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>User Id</CTableHeaderCell>
                        <CTableHeaderCell>Institute</CTableHeaderCell>
                        <CTableHeaderCell>Message</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {requests.map(
                        (request) => (
                          console.log(request),
                          (
                            <CTableRow>
                              <CTableDataCell>{request.request_id}</CTableDataCell>
                              <CTableDataCell>{request.date}</CTableDataCell>
                              <CTableDataCell>{request.user_id}</CTableDataCell>
                              <CTableDataCell>{request.institute}</CTableDataCell>
                              <CTableDataCell>{request.message}</CTableDataCell>
                              <CTableDataCell>
                                <CButton className="me-2" color="danger">
                                  Remove
                                </CButton>
                                {/* <CButton color="info" onClick={() => handleUpdate(user.user_id)}>
                                  <CIcon icon={cilPencil} />
                                </CButton> */}
                                {/* onClick={() => handleDelete(requests.request_id)} */}
                              </CTableDataCell>
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
