import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src'
import UserBYRole from '../reports/common/UserBYRole'

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

import HarvestChart from '../reports/HarvestChart'

const Dashboard = () => {
  const navigate = useNavigate()
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  console.log(isValidUser)

  if (!isValidUser) {
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard>
        <CCardBody>
          <CRow className="d-flex align-items-start">
            <CCol sm={6}>
              <h4 id="traffic" className="card-title mb-0">
                <HarvestChart />
              </h4>
            </CCol>
            <CCol sm={6} style={{ padding: '30px' }}>
              <h4 id="traffic" className="card-title mb-0">
                <UserBYRole />
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
