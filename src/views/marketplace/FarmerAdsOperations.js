import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import Advertisement from './forms/Advertisement'
import ProductListPage from './forms/ProductListPage'
const FarmerAdsOperations = () => {
  const [activeKey, setActiveKey] = useState(1)

  return (
    <CCard>
      <CCardHeader>
        <CNav variant="tabs" role="tablist">
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 1}
              component="button"
              role="tab"
              aria-controls="ads-tab-pane"
              aria-selected={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Advertisements
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 3}
              component="button"
              role="tab"
              aria-controls="all-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              All Advertisements
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="ads-tab-pane" visible={activeKey === 1}>
          <Advertisement />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="ads-tab-pane" visible={activeKey === 2}>
          <ProductListPage />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

FarmerAdsOperations.propTypes = {
  // Add prop types if needed
}

export default FarmerAdsOperations
