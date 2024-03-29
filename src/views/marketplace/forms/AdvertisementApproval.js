import { React, useState, useEffect } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilTrash,
  cilPlant,
  cilFork,
  cilBuilding,
  cilDescription,
  cilApplicationsSettings,
  cilPencil,
} from '@coreui/icons'
import {
  getMyAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
  approveAdvertisement,
  getAllofficerRegionalAdvertisement,
} from 'src/api/AdsService'
import { API_BASE_URL } from 'src/Config'

const AdvertisementApproval = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    category: '',
    description: '',
    unit_price: '',
    crop_id: '',
    amount: '',
    telephone_no: '',
    image_link: 'test',
  })

  const [Ads, setAds] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentRecord, setCurrentRecord] = useState({
    published_by: '',
    type: '',
    title: '',
    category: '',
    description: '',
    date: '',
    time: '',
    user_id: '',
    unit_price: '',
    crop_id: '',
    amount: '',
    telephone_no: '',
    verified_officer_id: '',
    image_link: '',
  })
  const [isApproveSuccess, setIsApproveSuccess] = useState(false)
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    console.log(formData)
    setAds([])
  }

  const handleUpdateInputChange = (event) => {
    setCurrentRecord({
      ...currentRecord,
      [event.target.name]: event.target.value,
    })
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    const response = await getAllofficerRegionalAdvertisement(newPage, 10)
    setAds(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (ad_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }
    const response = await deleteAdvertisement(ad_id)
    if (response.status === 200) {
      alert('Advertisement deleted successfully.')
      handleCleanForm()
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  useEffect(() => {
    handleSubmit()
  }, [isApproveSuccess])

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')

      return
    }

    const response = await getAllofficerRegionalAdvertisement(currentPage, 10)
    setAds(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const handleCleanForm = () => {
    setFormData({
      type: '',
      title: '',
      category: '',
      description: '',
      unit_price: '',
      crop_id: '',
      amount: '',
      telephone_no: '',
      image_link: 'test',
    })
    setAds([])
    setCurrentPage(1)
    setShowModal(false)
  }

  const handleAddAdvertisement = () => {
    setShowForm(!showForm)
    handleCleanForm()
  }

  const [isFormEmpty, setIsFormEmpty] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  if (!token) {
    alert('Please login first.')

    return
  }

  const handleNewItemAddButtonSubmit = (event) => {
    event.preventDefault()
    if (Object.values(formData).some((value) => value === '' || value === null)) {
      setIsFormEmpty(true)
      alert('Please fill in all the fields.')
      return
    }

    axios
      .post(`${API_BASE_URL}/market/advertisement`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        alert('New advertisement was added Successfully!')
      })
      .catch(function (error) {
        console.error(error)
        if (error.response && error.response.status === 409) {
          // alert('This aid already exists.')
          alert(error.response.data.message)
        } else {
          alert('An error occurred.')
        }
      })
  }

  const handleUpdate = async () => {
    const response = await updateAdvertisement(currentRecord)
    console.log(response)
    if (response.status === 200) {
      alert('Advertisement updated successfully.')
    } else {
      alert('Advertisement update failed.')
    }
  }

  const handlePenClick = async (currentRecord) => {
    setCurrentRecord(currentRecord)
    const response = await approveAdvertisement(currentRecord.ad_id)
    console.log(response)
    if (response.status === 200) {
      setIsApproveSuccess(true)
    } else {
      alert('Advertisement update failed.')
    }
  }

  const handleClose = () => {
    setShowModal(false)
    handleCleanForm()
  }

  return (
    <CContainer>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        {Ads.length !== 0 ? (
          <CRow className="justify-content-center mt-4">
            <CCol xs={12}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Advertisement ID</CTableHeaderCell>
                        <CTableHeaderCell>Type</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Unit Price</CTableHeaderCell>
                        <CTableHeaderCell>Amount</CTableHeaderCell>
                        <CTableHeaderCell>Telephone</CTableHeaderCell>
                        <CTableHeaderCell>Crop</CTableHeaderCell>
                        <CTableHeaderCell>Description</CTableHeaderCell>
                        <CTableHeaderCell>Approved</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {Ads.map((ad) => (
                        <CTableRow key={ad.ad_id}>
                          <CTableDataCell>{ad.ad_id}</CTableDataCell>
                          <CTableDataCell>{ad.type}</CTableDataCell>
                          <CTableDataCell>{ad.title}</CTableDataCell>
                          <CTableDataCell>{ad.category}</CTableDataCell>
                          <CTableDataCell>{ad.unit_price}</CTableDataCell>
                          <CTableDataCell>{ad.amount}</CTableDataCell>
                          <CTableDataCell>{ad.telephone_no}</CTableDataCell>
                          <CTableDataCell>{ad.crop_id}</CTableDataCell>
                          <CTableDataCell>{ad.description}</CTableDataCell>
                          <CTableDataCell>
                            {ad.verified_officer_id ? 'Yes' : 'Pending'}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="info" onClick={() => handlePenClick(ad)}>
                              Approve{' '}
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
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
                  <CModal visible={showModal} onClose={() => setShowModal(false)}>
                    <CModalHeader onClose={handleClose}>
                      <CModalTitle>Update Record</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <h1>Update Advertisement information</h1>
                        <p className="text-medium-emphasis">
                          Update Advertisement to deliver to the farmers
                        </p>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Type</CInputGroupText>
                          <CFormInput
                            placeholder="Type"
                            autoComplete="Type"
                            onChange={handleUpdateInputChange}
                            name="type"
                            value={formData.type}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>
                            <CIcon icon={cilFork} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Title"
                            autoComplete="Title"
                            onChange={handleUpdateInputChange}
                            name="title"
                            value={formData.title}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>
                            <CInputGroupText>Category</CInputGroupText>
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Category"
                            autoComplete="Category"
                            onChange={handleUpdateInputChange}
                            name="category"
                            value={formData.category}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>
                            <CInputGroupText>Description</CInputGroupText>
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Description"
                            autoComplete="Description"
                            onChange={handleUpdateInputChange}
                            name="description"
                            value={formData.description}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>
                            <CInputGroupText>Unit price</CInputGroupText>
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Unit price"
                            autoComplete="Unit price"
                            onChange={handleUpdateInputChange}
                            name="unit_price"
                            value={formData.unit_price}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Crop ID</CInputGroupText>
                          <CFormInput
                            placeholder="Crop ID"
                            autoComplete="Crop ID"
                            onChange={handleUpdateInputChange}
                            name="crop_id"
                            value={formData.crop_id}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Amount</CInputGroupText>
                          <CFormInput
                            placeholder="amount"
                            autoComplete="amount"
                            onChange={handleUpdateInputChange}
                            name="brand"
                            value={formData.brand}
                          />
                        </CInputGroup>
                        <CInputGroup
                          className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}
                        >
                          <CInputGroupText>Telephone No</CInputGroupText>
                          <CFormInput
                            placeholder="Telephone No"
                            autoComplete="Telephone No"
                            onChange={handleInputChange}
                            name="telephone_no"
                            value={formData.telephone_no}
                          />
                        </CInputGroup>
                        <div className="d-grid">
                          <CButton color="success" onClick={() => handleUpdate()}>
                            Update
                          </CButton>
                          <br />
                          <CButton color="secondary" onClick={handleCleanForm}>
                            Clear
                          </CButton>
                        </div>
                      </CForm>
                    </CModalBody>
                  </CModal>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <div>
            <h3>No Pending Ads were found</h3>
          </div>
        )}
      </div>
    </CContainer>
  )
}

export default AdvertisementApproval
