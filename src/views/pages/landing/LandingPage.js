import React, { useContext, useEffect, useState } from 'react'
import 'src/App.css'

import { UserContext } from 'src'
import MainContent from './MainContent'
import DefaultLayout from 'src/layout/DefaultLayout'
import NavigationBar from 'src/components/landingpage/Navbar'
import About from 'src/components/landingpage/About'
import RequestData from 'src/components/landingpage/RequestData'
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

function LandingPage() {
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  const [selectedNavItem, setSelectedNavItem] = useState('Home')
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOfficer, setOIsOfficer] = useState(false)

  //UseEffect to check if the user is valid
  useEffect(() => {
    if (isValidUser) {
      const user = JSON.parse(localStorage.getItem('user')) //Get the user from the local storage
      if (!user) {
        setIsValidUser(false) //If the user is not valid, set the valid user to false
      }
      console.log('ValidUser: ', isValidUser)
      console.log('User: ', user)
      console.log('Role: ', user.role)
      setUser(user)
      setUserRole(user.role)
      if (user.role === 1) {
        setIsAdmin(true)
        setOIsOfficer(false)
      } else if (user.role === 4) {
        setOIsOfficer(true)
        setIsAdmin(false)
      } else {
        setIsAdmin(false)
        setOIsOfficer(false)
      }
    }
  }, [isValidUser, setIsValidUser]) //The useEffect will run when the isValidUser changes

  //Handle the navigation bar click
  const handleContent = (navItem) => {
    setSelectedNavItem(navItem)
  }

  useEffect(() => {
    if (selectedNavItem === 'SignOut') {
      handleSignOut()
      setSelectedNavItem('Home')
    }
  }, [selectedNavItem])

  const handleSignOut = () => {
    setIsValidUser(false)
    setIsAdmin(false)
    setOIsOfficer(false)
    localStorage.clear()
    return <MainContent />
  }

  // returns` the landing page view
  return (
    <div>
      <DefaultLayout>
        <div className="App-header">
          <NavigationBar handleNavClick={handleContent} />
        </div>
        {selectedNavItem === 'About' && <About />}
        {selectedNavItem === 'Home' && <MainContent />}
        {selectedNavItem === 'Request Data' && <RequestData />}
        {selectedNavItem === 'Latest_Reports' &&
          (isAdmin ? <AdminReport /> : isOfficer ? <OfficerReport /> : <DefaultReportSet />)}
        {selectedNavItem === 'Contact' && <Contact />}
        {selectedNavItem === 'DataCollection' && //Check the user role and display the relevant data collection page
          (isAdmin ? (
            <DataAdminCollection />
          ) : isOfficer ? (
            <DataOfficerCollection />
          ) : (
            <DataGenericCollection />
          ))}
        {selectedNavItem === 'DataOfficerCollection' && // Check the user role and display the relevant data collection page
          (isOfficer ? <DataOfficerCollection /> : <></>)}
        {selectedNavItem === 'Free Advertising Support' && <ProductListPage />}
      </DefaultLayout>
    </div>
  )
}

// Export the LandingPage component
export default LandingPage
