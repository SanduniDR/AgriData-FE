import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

const GenericDashboard = () => {
  const navigate = useNavigate()
  const { isValidUser, setIsValidUser } = useContext(UserContext)
  console.log(isValidUser)

  if (!isValidUser) {
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Sri Lanka Agriculture Department Services
              </h4>
              <div className="small text-medium-emphasis">Since 1978</div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default GenericDashboard
