import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://cmb.ac.lk/" target="_blank" rel="noopener noreferrer">
          UCSC - University of Colombo School of Computing
        </a>
        <span className="ms-1">&copy; 2020 MIT Final Project</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Supervised By</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          Dr Noel Fernando
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
