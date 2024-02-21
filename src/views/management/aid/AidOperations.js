import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import AddAidForm from './forms/AddAid'
import UpdateAidForm from './forms/UpdateAid'
import SearchAIds from './forms/SearchAids'

const AidOperations = () => {
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
              aria-controls="home-tab-pane"
              aria-selected={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Add Aid Distribution
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 2}
              component="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Update Aid
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 3}
              component="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected={activeKey === 3}
              onClick={() => setActiveKey(3)}
            >
              Search & Remove Aids
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <AddAidForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <UpdateAidForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          <SearchAIds />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

AidOperations.propTypes = {
  // Add prop types if needed
}

export default AidOperations
