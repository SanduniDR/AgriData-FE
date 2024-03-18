import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CButton, CRow, CCol } from '@coreui/react'
import PropTypes from 'prop-types'
import testImage from './testImages/product1.jpg'
import paddy from './testImages/paddy.jpg'
import tea from './testImages/tea.jpg'
import veg from './testImages/product3.jpg'

// Import test images and this will be removed - test purpose only
const images = [paddy]

const ProductList = ({ products }) => {
  const cardWidth = 150
  const imageHeight = 80

  return (
    <CRow noGutters className="justify-content-center">
      {products.map((product) => (
        <CCol key={product.ad_id} xs={6} sm={4} md={3} lg={2} className="mb-3">
          <CCard className="product-card" style={{ width: `${cardWidth}px`, margin: '5px' }}>
            <CCardHeader>
              <img
                src={images[Math.floor(Math.random() * images.length)]}
                className="card-img-top product-image"
                alt={product.title}
                style={{ height: `${imageHeight}px`, objectFit: 'cover' }} // Controlled image height and fit
              />
            </CCardHeader>
            <CCardBody>
              <CCardText className="product-name">{product.title}</CCardText>
              <CCardText className="product-price">
                <strong>Description: </strong>
                {product.description}
              </CCardText>
              <CCardText className="product-price">
                <strong>Price: </strong>
                {product.unit_price}
              </CCardText>
              <CCardText className="product-price">
                <strong>Amount: </strong>
                {product.amount}
              </CCardText>
              <CCardText className="product-price">
                <strong>Telephone: </strong>
                {product.telephone_no}
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

// In ProductList.js
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the shape of the product object here
      // For example:
      // id: PropTypes.number,
      // name: PropTypes.string,
      // price: PropTypes.number,
      // etc.
    }),
  ).isRequired,
}

export default ProductList
