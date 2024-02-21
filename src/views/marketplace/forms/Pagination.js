import React from 'react'
import { CPagination, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange, onNextPage, onPrevPage }) => {
  return (
    <div>
      <CButton color="primary" onClick={onPrevPage} disabled={currentPage === 1}>
        Back
      </CButton>
      <CPagination activePage={currentPage} pages={totalPages} onActivePageChange={onPageChange} />
      <CButton color="primary" onClick={onNextPage} disabled={currentPage === totalPages}>
        Next Page
      </CButton>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
}

export default Pagination
