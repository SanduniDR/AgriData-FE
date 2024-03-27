import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://cmb.ac.lk/" target="_blank" rel="noopener noreferrer">
          UCSC - University of Colombo School of Computing
        </a>
        <span className="ms-1">&copy; 2024 MIT Final Project</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Supervised By</span>
        <a
          href="https://scholar.google.com/citations?user=116_3ZIAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prof. M G Noel A S Fernando
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
