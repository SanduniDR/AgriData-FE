import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilPlant,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilFactory,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const _nav_generic = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/genericDashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'MarketPlace',
    to: '/marketplace',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
]

export const _nav_officer = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/officer-dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Farmer Management',
    to: '/farmer/farmerOperations',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Crop Management',
    to: '/crop/cropOperations',
    icon: <CIcon icon={cilPlant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Farm Management',
    to: '/farm/farmOperations',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cultivation Management',
    to: '/cultivation/cultivationOperations',
    icon: <CIcon icon={cilPlant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Aid Management',
    to: '/aid/distribution/AidDistributionOperations',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
]

export const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/user/userOperations',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Crop Management',
    to: '/crop/cropOperations',
    icon: <CIcon icon={cilPlant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Farm Management',
    to: '/farm/farmOperations',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Aid Management',
    to: '/aid/AidOperations',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
]
