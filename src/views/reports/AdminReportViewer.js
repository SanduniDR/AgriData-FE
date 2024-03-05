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
import LankaMapByFieldMapping from './adminReports/LankaMapByFieldMapping'
import LankaMapByCropYieldAdmin from './adminReports/LankaMapByCropYeildAdmin'
import TotalTaxPayerReport from './adminReports/TotalTaxPayerReport'

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
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('Field Mapping')}
              >
                Field Mapping
              </CListGroupItem>
              <CListGroupItem
                className="blue-link"
                onClick={() => handleItemClick('Tax Payer Report')}
              >
                Tax Prayer Report
              </CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol className="viewer">
            {activeKey === 'User Reports' && <UsersGroupByRoleByAdmin />}
            {activeKey === 'Estimated Harvest vs Actual' && <HarvestEstimatedVsActual />}
            {activeKey === 'AidDistribution' && <AidDistributionByAidTypeAdmin />}
            {activeKey === 'New Aid distribution' && <AidFundingAdminTable />}
            {activeKey === 'Crop Yield Reports' && <LankaMapByCropYieldAdmin />}
            {activeKey === 'Field Mapping' && <LankaMapByFieldMapping />}
            {activeKey === 'Tax Payer Report' && <TotalTaxPayerReport />}
          </CCol>
        </CRow>
      </CContainer>
    </CCard>
  )
}

export default AdminReportViewer
