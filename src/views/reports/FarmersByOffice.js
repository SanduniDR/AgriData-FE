import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'
import PieChart from '../management/charts/PieChart'
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
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 id="traffic" className="card-title mb-0">
              User Count by Role
            </h4>
            <div className="small text-medium-emphasis">{currentDate}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <PieChart data={data} />
          </CCol>
          <CCol sm={6}>{/* <PieChart data={data} /> */}</CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default UsersGroupByRole
