import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import Advertisement from './forms/Advertisement'
import AdvertisementApproval from './forms/AdvertisementApproval'
import ProductListPage from './forms/ProductListPage'

const AdsOperations = () => {
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
              Manage Advertisements
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 2}
              component="button"
              role="tab"
              aria-controls="all-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Advertisements Approvals
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="ads-tab-pane" visible={activeKey === 1}>
          <Advertisement />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="ads-tab-pane" visible={activeKey === 2}>
          <AdvertisementApproval />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

export default AdsOperations
