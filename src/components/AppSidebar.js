// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import {} from 'src/assets/brand/logo'
// import { sygnet } from 'src/assets/brand/sygnet'

// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'
// import PropTypes from 'prop-types'

// // sidebar nav config
// import { _nav } from '../_nav'
// import { _nav_generic } from '../_nav'
// import { _nav_officer } from '../_nav'
// import logo from 'src/assets/brand/logo_1.png'

// const AppSidebar = (props) => {
//   const dispatch = useDispatch()
//   const unfoldable = useSelector((state) => state.sidebarUnfoldable)
//   const sidebarShow = useSelector((state) => state.sidebarShow)
//   const nav =
//     props.role === 1
//       ? _nav
//       : props.role === 2
//       ? _nav_generic
//       : props.role === 3
//       ? _nav
//       : props.role === 4
//       ? _nav_officer
//       : props.role === 5
//       ? _nav_generic
//       : _nav_generic
//   return (
//     <CSidebar
//       position="fixed"
//       unfoldable={unfoldable}
//       visible={sidebarShow}
//       onVisibleChange={(visible) => {
//         dispatch({ type: 'set', sidebarShow: visible })
//       }}
//     >
//       <CSidebarBrand className="d-none d-md-flex" to="/">
//         <img src={logo} alt="Logo" width="35px" height="35px" /> Agri Cloud
//       </CSidebarBrand>
//       <CSidebarNav>
//         <SimpleBar>
//           <AppSidebarNav items={nav} />
//         </SimpleBar>
//       </CSidebarNav>
//       <CSidebarToggler
//         className="d-none d-lg-flex"
//         onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
//       />
//     </CSidebar>
//   )
// }

// AppSidebar.propTypes = {
//   role: PropTypes.number.isRequired,
// }

// export default React.memo(AppSidebar)
