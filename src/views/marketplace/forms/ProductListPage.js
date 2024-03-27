// ProductListPage.js
import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import Pagination from './Pagination'
import './ProductListPage.css' // Import the CSS file for styling
import { getAllAdvertisements } from 'src/api/AdsService'
import { CContainer } from '@coreui/react'
import pl from 'src/assets/landing_page/AdminOperations/adds.png'
import { Image, Card, Button, Container, Row, Col } from 'react-bootstrap'

const ProductListPage = () => {
  // products
  const [products, setProducts] = useState([])
  //  current page
  const [currentPage, setCurrentPage] = useState(1)
  // products per page
  const productsPerPage = 5

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts(currentPage)
  }, [])

  // Fetch products --> API call
  const fetchProducts = async (currentPage) => {
    try {
      const response = await getAllAdvertisements(currentPage, 10)
      console.log(response.data.data)
      setProducts(response.data.data)
    } catch (error) {
      console.error(`Failed to fetch products: ${error.message}`)
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    fetchProducts(pageNumber)
  }

  const totalPages = Math.ceil(products.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <div className="main-content" style={{ marginTop: '60px' }}>
      <div>
        <Image src={pl} style={{ width: '100%' }} fluid />
      </div>
      <CContainer fluid>
        <div className="product-list-container">
          <h1 className="title">Ceylon AgriData - Free Advertisement Service</h1>{' '}
          <ProductList products={currentProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNextPage={() => handlePageChange(currentPage + 1)}
            onPrevPage={() => handlePageChange(currentPage - 1)}
          />
        </div>
      </CContainer>
    </div>
  )
}

export default ProductListPage
