import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from 'src/assets/brand/logo_1.png'
import PropTypes from 'prop-types'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  AppHeader.propTypes = {
    role: PropTypes.number.isRequired,
  }

  return (
    <CHeader position="sticky">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={logo} alt="Logo" width="35px" height="35px" /> Agri Cloud
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {props.role === 1 ? (
              <CNavLink to="/dashboard" component={NavLink}>
                Admin Dashboard
              </CNavLink>
            ) : props.role === 2 ? (
              <CNavLink to="/genericDashboard" component={NavLink}>
                Home
              </CNavLink>
            ) : props.role === 4 ? (
              <CNavLink to="/officer-dashboard" component={NavLink}>
                Agricultural officer Dashboard
              </CNavLink>
            ) : (
              <CNavLink to="/genericDashboard" component={NavLink}>
                Dashboard
              </CNavLink>
            )}
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
