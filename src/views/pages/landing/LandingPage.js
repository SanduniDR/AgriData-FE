import React, { useContext, useEffect, useState } from 'react'
import 'src/App.css'

import { UserContext } from 'src'
import MainContent from './MainContent'
import DefaultLayout2 from 'src/layout/DefaultLayout2'
import NavigationBar from 'src/components/landingpage/Navbar'
import About from 'src/components/landingpage/About'
import { DefaultReportSet, AdminReportSet } from 'src/views/reports/ReportSet'
import Contact from 'src/components/landingpage/Contact'
import {
  DataAdminCollection,
  DataGenericCollection,
  DataOfficerCollection,
} from 'src/views/pages/dataCollection/DataCollection'
import AdminReport from '../reports/AdminReport'
import OfficerReport from '../reports/OfficerReport'
import ProductListPage from 'src/views/marketplace/forms/ProductListPage'
import AdsOperations from 'src/views/marketplace/AdsOperations'
// import LatestReports from 'src/components/landingpage/LatestReports' // Import your LatestReports component

function LandingPage() {
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  const [selectedNavItem, setSelectedNavItem] = useState('Home')
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOfficer, setOIsOfficer] = useState(false)

  useEffect(() => {
    if (isValidUser) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        setIsValidUser(false)
      }
      setUser(user)
      setUserRole(user.role)
      if (user.role === 1) {
        setIsAdmin(true)
      } else if (user.role === 4) {
        setOIsOfficer(true)
      }
    }
  }, [isValidUser, setIsValidUser])

  const handleAboutContent = (navItem) => {
    setSelectedNavItem(navItem)
  }

  return (
    <div>
      <DefaultLayout2>
        <div className="App-header">
          <NavigationBar handleNavClick={handleAboutContent} />
        </div>
        {selectedNavItem === 'About' && <About />}
        {selectedNavItem === 'Home' && <MainContent />}
        {selectedNavItem === 'Latest_Reports' &&
          (isAdmin ? <AdminReport /> : isOfficer ? <OfficerReport /> : <DefaultReportSet />)}
        {selectedNavItem === 'Contact' && <Contact />}
        {selectedNavItem === 'DataCollection' &&
          (isAdmin ? (
            <DataAdminCollection />
          ) : isOfficer ? (
            <DataOfficerCollection />
          ) : (
            <DataGenericCollection />
          ))}
        {selectedNavItem === 'DataOfficerCollection' &&
          (isOfficer ? <DataOfficerCollection /> : <></>)}
        {selectedNavItem === 'Free Advertising Support' && <ProductListPage />}
      </DefaultLayout2>
    </div>
  )
}

export default LandingPage
