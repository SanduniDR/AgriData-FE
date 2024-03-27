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
import { getMyAdvertisements, updateAdvertisement, deleteAdvertisement } from 'src/api/AdsService'
import { API_BASE_URL } from 'src/Config'

const Advertisement = () => {
  const navigate = useNavigate()
  const [productImage, setProductImage] = useState(null)
  const [ad_id, setAd_id] = useState('')
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
      navigate('/login', { replace: true })
      return
    }

    const response = await getMyAdvertisements(formData, newPage, 10)
    setAds(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
  }

  const handleDelete = async (ad_id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }
    const response = await deleteAdvertisement(ad_id)
    if (response.status === 200) {
      alert('Advertisement deleted successfully.')
      handleCleanForm()
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first.')
      navigate('/login', { replace: true })
      return
    }

    const response = await getMyAdvertisements(formData, currentPage, 10)
    setAds(response.data.data)
    console.log(response.data.data)
    setTotalPages(response.data.total_pages)
    console.log(response.data.total_pages, 'totalPages')
    setShowModal(false)
  }

  const uploadProductImage = async () => {
    // Create a FormData instance
    const data = new FormData()

    // Append the productImage data
    // Note: 'productImage' should match the name expected by the server
    data.append('file', new Blob([new Uint8Array(productImage)]), 'image.jpg')

    // Send the POST request
    try {
      let url = `${API_BASE_URL}/file/upload/product/` + ad_id
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      console.log(response.data)
    } catch (error) {
      console.error(error)
      alert('Failed to upload the product image')
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      const arrayBuffer = event.target.result
      const uint8Array = new Uint8Array(arrayBuffer)
      const byteArray = Array.from(uint8Array)
      setProductImage(byteArray)
    }

    reader.readAsArrayBuffer(file)
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
    if (ad_id !== '') {
      uploadProductImage()
    }
  }, [ad_id])

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== '' || value !== null)) {
      setIsFormEmpty(false)
    }
  }, [formData])

  if (!token) {
    alert('Please login first.')
    navigate('/login', { replace: true })
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
        console.log(response.data.ad_id)
        setAd_id(response.data.ad_id)
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

  const handlePenClick = (currentRecord) => {
    setCurrentRecord(currentRecord)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    handleCleanForm()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {showForm ? (
        <CContainer>
          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton color="danger" onClick={handleAddAdvertisement}>
                Close
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {isFormEmpty && (
                    <div className="alert alert-danger" role="alert">
                      Please fill in all the fields.
                    </div>
                  )}
                  <CForm>
                    <h1>Add Advertisement information</h1>
                    <p className="text-medium-emphasis">
                      Add Advertisement to display at marketplace
                    </p>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Type</CInputGroupText>
                      <CFormInput
                        placeholder="Type"
                        autoComplete="Type"
                        onChange={handleInputChange}
                        name="type"
                        value={formData.type}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Title </CInputGroupText>
                      <CFormInput
                        placeholder="Title"
                        autoComplete="Title"
                        onChange={handleInputChange}
                        name="title"
                        value={formData.title}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CInputGroupText>Category</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Category"
                        autoComplete="Category"
                        onChange={handleInputChange}
                        name="category"
                        value={formData.category}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CInputGroupText>Description</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Description"
                        autoComplete="Description"
                        onChange={handleInputChange}
                        name="description"
                        value={formData.description}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>
                        <CInputGroupText>Unit price</CInputGroupText>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Unit price"
                        autoComplete="Unit price"
                        onChange={handleInputChange}
                        name="unit_price"
                        value={formData.unit_price}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Crop ID</CInputGroupText>
                      <CFormInput
                        placeholder="Crop ID"
                        autoComplete="Crop ID"
                        onChange={handleInputChange}
                        name="crop_id"
                        value={formData.crop_id}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Amount</CInputGroupText>
                      <CFormInput
                        placeholder="amount"
                        autoComplete="amount"
                        onChange={handleInputChange}
                        name="amount"
                        value={formData.amount}
                      />
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${isFormEmpty ? 'border border-danger' : ''}`}>
                      <CInputGroupText>Telephone No</CInputGroupText>
                      <CFormInput
                        placeholder="Telephone No"
                        autoComplete="Telephone No"
                        onChange={handleInputChange}
                        name="telephone_no"
                        value={formData.telephone_no}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>Upload Product Image</CInputGroupText>
                      <CFormInput
                        type="file"
                        id="fileInput"
                        name="fileInput"
                        accept=".png, .jpg, .bmp"
                        onChange={handleFileChange}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton
                        color="success"
                        onClick={handleNewItemAddButtonSubmit}
                        disabled={isFormEmpty}
                      >
                        Submit
                      </CButton>{' '}
                      <br />
                      <CButton color="secondary" onClick={handleCleanForm}>
                        Clear
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <CContainer>
          {/* Button for add new advertisements by officer */}
          <CRow className="justify-content-center">
            <CCol xs="auto" className={'mb-3'}>
              <CButton color="success" onClick={handleAddAdvertisement}>
                + Add New Advertisement
              </CButton>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Your Advertisement info</h1>
                    <div className="d-grid">
                      <CButton color="primary" onClick={handleSubmit}>
                        View
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
                              <CButton
                                className="me-2"
                                color="danger"
                                onClick={() => handleDelete(ad.ad_id)}
                              >
                                Delete{' '}
                              </CButton>
                              {/* <CButton color="info" onClick={() => handlePenClick(ad)}>
                                <CIcon icon={cilPencil} />
                              </CButton> */}
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
            <></>
          )}
        </CContainer>
      )}
    </div>
  )
}

export default Advertisement
