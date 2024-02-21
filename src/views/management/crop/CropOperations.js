import React, { useState } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import AddCropForm from './forms/AddCrop'
import UpdateCropForm from './forms/UpdateCrop'
import RemoveCropForm from './forms/RemoveCrop'
import SearchCropForm from './forms/SearchCrop'

const CropOperations = () => {
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
              Add Crop
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
              Update Crop
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
              Remove Crop
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
              Search Crops
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <AddCropForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <UpdateCropForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          <RemoveCropForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
          <SearchCropForm />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

CropOperations.propTypes = {
  // Add prop types if needed
}

export default CropOperations
