import React from 'react'
import { Image } from 'react-bootstrap'
import image from 'src/assets/landing_page/reports/adminReports/or.png'
import { CContainer, CRow, CCol } from '@coreui/react'

import OfficerReportViewer from 'src/views/reports/ReportViewersPages/OfficerReportViewer'
const OfficerReport = () => {
  return (
    <div className="main-content" style={{ marginTop: '60px', justifyContent: 'left' }}>
      <div>
        <Image src={image} style={{ width: '100%' }} fluid />
      </div>
      <div className="admin-map-container">
        <CContainer fluid>
          <OfficerReportViewer />
        </CContainer>
      </div>
    </div>
  )
}

export default OfficerReport
