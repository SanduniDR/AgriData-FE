import React from 'react'

// Agri app
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GenericDashboard = React.lazy(() => import('./views/dashboard/GenericUserDashboard.js'))
const AgriOfficerDashboard = React.lazy(() => import('./views/dashboard/AgriOfficerDashboard.js'))

//Agri App
//User Management -Admin/Officer
const UserOperations = React.lazy(() => import('./views/management/user/UserOperations'))
const CropOperations = React.lazy(() => import('./views/management/crop/CropOperations'))
const FarmOperations = React.lazy(() => import('./views/management/farm/FarmOperations'))
const FarmerOperations = React.lazy(() => import('./views/management/farmer/FarmerOperations'))
const CultivationOperations = React.lazy(() =>
  import('./views/management/cultivation/CultivationOperations'),
)
const AidOperations = React.lazy(() => import('./views/management/aid/AidOperations'))
const AidDistributionOperations = React.lazy(() =>
  import('./views/management/aid/distribution/AidDistributionOperations'),
)

const Market = React.lazy(() => import('./views/marketplace/AdsOperations'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/genericDashboard', name: 'Generic Dashboard', element: GenericDashboard },
  {
    path: '/officer-dashboard',
    name: 'Agricultural Officer Dashboard',
    element: AgriOfficerDashboard,
  },

  // Agri app
  { path: '/user/userOperations', name: 'User Operations', element: UserOperations },
  { path: '/crop/cropOperations', name: 'Crop Operations', element: CropOperations },
  { path: '/farm/farmOperations', name: 'Farm Operations', element: FarmOperations },
  { path: '/farmer/farmerOperations', name: 'Farmer Operations', element: FarmerOperations },
  {
    path: '/cultivation/cultivationOperations',
    name: 'Cultivation Operations',
    element: CultivationOperations,
  },
  { path: '/aid/aidOperations', name: 'Aid Operations', element: AidOperations },
  {
    path: '/aid/distribution/AidDistributionOperations',
    name: 'Aid Distribution Operations',
    element: AidDistributionOperations,
  },

  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/marketplace', name: 'Market', element: Market },
]

export default routes
