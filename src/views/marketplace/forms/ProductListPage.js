// ProductListPage.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductList from './ProductList'
import Pagination from './Pagination'
import './ProductListPage.css' // Import the CSS file for styling
import PropTypes from 'prop-types'
import { getAllAdvertisements } from 'src/api/AdsService'

const ProductListPage = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5 // Adjust as needed

  useEffect(() => {
    fetchProducts(currentPage)
  }, [])

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
    <div className="product-list-container">
      {' '}
      {/* Add a CSS class for styling */}
      <h1 className="title">AgriCloud - MarketPlace</h1> {/* Add a CSS class for styling */}
      <ProductList products={currentProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onNextPage={() => handlePageChange(currentPage + 1)}
        onPrevPage={() => handlePageChange(currentPage - 1)}
      />
    </div>
  )
}

export default ProductListPage
