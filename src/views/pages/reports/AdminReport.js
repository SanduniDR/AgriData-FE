import React from 'react'
import { Image } from 'react-bootstrap'
import image from 'src/assets/landing_page/reports/adminReports/adr.png'
import { CContainer, CRow, CCol } from '@coreui/react'

import AdminReportViewer from 'src/views/reports/AdminReportViewer'
const AdminReport = () => {
  return (
    <div className="main-content" style={{ marginTop: '60px', justifyContent: 'left' }}>
      <div>
        <Image src={image} fluid />
      </div>
      <div className="admin-map-container">
        <CContainer fluid>
          <AdminReportViewer />
        </CContainer>
      </div>
    </div>
  )
}

export default AdminReport
