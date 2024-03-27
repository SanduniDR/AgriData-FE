import React, { useState } from 'react'
import { Image, Card, Button, Container, Row, Col } from 'react-bootstrap'

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
  CFormCheck,
} from '@coreui/react'
import { API_BASE_URL } from 'src/Config'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCalendar, cilCreditCard, cilTag, cilTrash, cilPencil } from '@coreui/icons'
import banner from 'src/assets/datarequest/requestdata.jpeg'
import { Height } from '@mui/icons-material'

export default function RequestDataTable() {
  const [requests, setRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [formData, setFormData] = useState({
    request_id: '',
    user_id: '',
    message: '',
    institute: '',
    date: '',
  })
  const [checkedStates, setCheckedStates] = useState({})

  const refreshList = (request_id) => {
    setFormData({
      request_id: '',
      user_id: '',
      message: '',
      institute: '',
      date: '',
    })
    setRequests([])
    setCurrentPage(1)
  }

  const handleCheckboxChange = (request_id, user_id) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [request_id]: !prevState[request_id],
    }))
    updateRecord(user_id)
  }

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

  const handleDelete = (requestId) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      return
    }

    // Call the backend API to delete the user
    axios
      .delete(`${API_BASE_URL}/communication/data-request/delete/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        alert('Request Record deleted successfully.')
        refreshList()
      })
      .catch(function (error) {
        console.error(error)
        if (error.response.status === 404) {
          alert('Data Request NOt Found.')
        } else {
          alert('An error occurred while deleting the request.')
        }
      })
  }

  const updateRecord = (user_id) => {
    const token = localStorage.getItem('token')

    axios
      .post(
        `${API_BASE_URL}/communication/sent-data`,
        { user_id: user_id, category: 'Sent Requested Data' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        console.log(response)
        alert('Successfully updated the sent data record !')
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred while fetching available data requests.')
      })
  }

  const handleAddResearcher = (user_id, institute) => {
    const token = localStorage.getItem('token')

    axios
      .post(
        `${API_BASE_URL}/user/add-researcher`,
        { user_id: user_id, institute: institute },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        console.log(response)
        alert('Successfully Added Researcher !')
      })
      .catch(function (error) {
        console.error(error)
        alert('An error occurred!\n May be a farmer or agriculture officer')
      })
  }

  return (
    <div>
      <CContainer fluid style={{ marginTop: '100px' }}>
        <div>
          <Image src={banner} fluid width={'10000w'} Height={'80px'} />
        </div>
        <CRow className="justify-content-center">
          <CCol xs={15}>
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
                                <CFormCheck
                                  id="flexCheckDefault"
                                  label="Data Issued"
                                  checked={!!checkedStates[request.request_id]}
                                  onChange={() =>
                                    handleCheckboxChange(request.request_id, request.user_id)
                                  }
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="info"
                                  onClick={() =>
                                    handleAddResearcher(request.user_id, request.institute)
                                  }
                                >
                                  Add as Researcher
                                </CButton>
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  className="me-2"
                                  color="danger"
                                  onClick={() => handleDelete(request.request_id)}
                                >
                                  Remove Record
                                </CButton>
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
