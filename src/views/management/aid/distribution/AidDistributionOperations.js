import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import Pesticides from './form/Pesticides'
import Fertilizers from './form/Fertilizers'
import Monetary from './form/Monetary'
import Distribution from './form/Distribution'
import Fuel from './form/Fuel'

const AidDistributionOperations = () => {
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
              aria-controls="pesticide-tab-pane"
              aria-selected={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Pesticides
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 2}
              component="button"
              role="tab"
              aria-controls="fertilizer-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Fertilizers
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 3}
              component="button"
              role="tab"
              aria-controls="monetary-tab-pane"
              aria-selected={activeKey === 3}
              onClick={() => setActiveKey(3)}
            >
              Monetary Aids
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 4}
              component="button"
              role="tab"
              aria-controls="fuel-tab-pane"
              aria-selected={activeKey === 4}
              onClick={() => setActiveKey(4)}
            >
              Fuel Aids
            </CNavLink>
          </CNavItem>
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 5}
              component="button"
              role="tab"
              aria-controls="distribution-tab-pane"
              aria-selected={activeKey === 5}
              onClick={() => setActiveKey(5)}
            >
              Aids Distribution
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="pesticide-tab-pane" visible={activeKey === 1}>
          <Pesticides />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="fertilizer-tab-pane" visible={activeKey === 2}>
          <Fertilizers />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="monetary-tab-pane" visible={activeKey === 3}>
          <Monetary />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="fuel-tab-pane" visible={activeKey === 4}>
          <Fuel />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="distribution-tab-pane" visible={activeKey === 5}>
          <Distribution />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

AidDistributionOperations.propTypes = {
  // Add prop types if needed
}

export default AidDistributionOperations
