import React, { useState, useEffect, useContext } from 'react'
import { CCard, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import AddCultivationInfo from './forms/AddCultivationInfo'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src'
import UpdateInformation from './forms/UpdateInformation'
import SearchCultivationInfo from './forms/SearchCultivationInfo'

const CultivationOperations = () => {
  const navigate = useNavigate()
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  console.log(isValidUser)

  useEffect(() => {
    if (!isValidUser) {
      localStorage.clear()
      navigate('/login', { replace: true })
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
              Add Cultivation information
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
              Search information
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
              Update Cultivation information
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <AddCultivationInfo />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <SearchCultivationInfo />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
          <UpdateInformation />
        </CTabPane>
      </CTabContent>
    </CCard>
  )
}

CultivationOperations.propTypes = {
  // Add prop types if needed
}

export default CultivationOperations
