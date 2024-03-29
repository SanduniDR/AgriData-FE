import React, { useState, useEffect, useContext } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import AddFarmerForm from './forms/AddFarmer'
import UpdateFarmerForm from './forms/UpdateFarmer'
import SearchFarmerForm from './forms/SearchFarmer'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src'

const FarmerOperations = () => {
  const navigate = useNavigate()
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  console.log(isValidUser)

  useEffect(() => {
    if (!isValidUser) {
      localStorage.clear()
    }
  }, [])

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
              Register new Farmers
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
              Update Farmers
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
              Search Farmers & Actions
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <AddFarmerForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <UpdateFarmerForm />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
          <SearchFarmerForm />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

FarmerOperations.propTypes = {}

export default FarmerOperations
