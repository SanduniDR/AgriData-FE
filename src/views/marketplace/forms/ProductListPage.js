// ProductListPage.js
import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import Pagination from './Pagination'
import './ProductListPage.css' // Import the CSS file for styling
import { getAllAdvertisements } from 'src/api/AdsService'
import { CContainer } from '@coreui/react'

const ProductListPage = () => {
  // Add state to store the products
  const [products, setProducts] = useState([])
  // Add state to store the current page
  const [currentPage, setCurrentPage] = useState(1)
  // Add state to store the number of products per page
  const productsPerPage = 5

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts(currentPage)
  }, [])

  // Fetch products from the API
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
    <CContainer fluid>
      <div className="product-list-container">
        {' '}
        {/* Add a CSS class for styling */}
        <h1 className="title">AgriData - Free Advertisement Service</h1>{' '}
        {/* Add a CSS class for styling */}
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
  )
}

export default ProductListPage
