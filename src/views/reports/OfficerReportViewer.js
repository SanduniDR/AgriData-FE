import React, { useState } from 'react'
import {
  CContainer,
  CListGroup,
  CListGroupItem,
  CCard,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCol,
  CRow,
} from '@coreui/react'
import AidDistributionOperations from 'src/views/reports/adminReports/AidDistributionOperations'
import HarvestEstimatedVsActual from 'src/views/reports/adminReports/HarverstEstimatedVsActual'

import UsersGroupByRoleByAdmin from 'src/views/reports/adminReports/UsersGroupByRoleByAdmin'
import FertilizersUsage from 'src/views/reports/adminReports/FertilizerUsage'
import AidsAdminTable from 'src/views/reports/adminReports/AidsAdminTable'
import AidFundingAdminTable from 'src/views/reports/adminReports/AidFundingAdminTable'
import AidDistributionByAidTypeAdmin from './adminReports/AidDistributionByAidTypeAdmin'
import LankaMapByCropYieldAdmin from './adminReports/LankaMapByCropYeildAdmin'

const AdminReportViewer = () => {
  const [activeKey, setActiveKey] = useState('')

  const handleItemClick = (key) => {
    setActiveKey(key)
  }

  return (
    <CCard>
      <CContainer>
        <CRow>
          <CCol>
            <CListGroup>
              <CListGroupItem className="blue-link" onClick={() => handleItemClick('User Reports')}>
                Total Registered Users
              </CListGroupItem>
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('Estimated Harvest vs Actual')}
              >
                Estimated Harvest vs Actual
              </CListGroupItem>
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('AidDistribution')}
              >
                Monthly Aid Distribution to Farmers
              </CListGroupItem>
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('New Aid distribution')}
              >
                Agricultural Aid Distribution Funding & Aids
              </CListGroupItem>
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('Crop Yield Reports')}
              >
                Crop Yield by Maps
              </CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol className="viewer">
            {activeKey === 'User Reports' && <UsersGroupByRoleByAdmin />}
            {activeKey === 'Estimated Harvest vs Actual' && <HarvestEstimatedVsActual />}
            {activeKey === 'AidDistribution' && <AidDistributionByAidTypeAdmin />}
            {activeKey === 'New Aid distribution' && <AidFundingAdminTable />}
            {activeKey === 'Crop Yield Reports' && <LankaMapByCropYieldAdmin />}
          </CCol>
        </CRow>
      </CContainer>
    </CCard>
  )
}

export default AdminReportViewer
