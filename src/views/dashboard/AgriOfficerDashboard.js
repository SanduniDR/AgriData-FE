import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src'

import { CCard, CCardBody } from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import DistributionChart from '../reports/DistributionChart'
import UserBYRole from '../reports/UserBYRole'

const AgriOfficerDashboard = () => {
  const navigate = useNavigate()
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  console.log(isValidUser)

  useEffect(() => {
    if (!isValidUser) {
      localStorage.clear()
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <>
      <WidgetsDropdown user={4} />
      <CCard className="mb-4">
        <CCardBody>
          <UserBYRole />
          <DistributionChart />
        </CCardBody>
      </CCard>
    </>
  )
}

export default AgriOfficerDashboard
