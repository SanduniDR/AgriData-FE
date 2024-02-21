import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import AddFarmForm from './forms/AddFarm'
import UpdateFarmForm from './forms/UpdateFarm'
import RemoveFarmForm from './forms/RemoveFarm'
import SearchFarmForm from './forms/SearchFarm'

const FarmOperations = () => {
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
              Add Farm
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
              Update Farm
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
              Remove Farm
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 4}
              component="button"
              role="tab"
              aria-controls="disabled-tab-pane"
              aria-selected={activeKey === 4}
              onClick={() => setActiveKey(4)}
            >
              Search Farms
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <AddFarmForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <UpdateFarmForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          <RemoveFarmForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
          <SearchFarmForm />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

FarmOperations.propTypes = {
  // Add prop types if needed
}

export default FarmOperations
