import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CRow, CCol, CContainer } from '@coreui/react'
import PieChart from 'src/views/management/charts/PieChart'
import { getUserGroupByRole } from 'src/api/MisReportService'

const UsersGroupByRole = () => {
  const [data, setData] = useState({})
  const currentDate = new Date().toLocaleString()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserGroupByRole()
      console.log(response)
      setData(response.data)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-light d-flex flex-row" style={{ background: 'white' }}>
      <CContainer fluid>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CRow>
              <CCol>
                <h4 id="traffic" className="card-title mb-0">
                  Total Registered User Count by Role
                </h4>
                <div className="small text-medium-emphasis">{currentDate}</div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <PieChart data={data} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default UsersGroupByRole
