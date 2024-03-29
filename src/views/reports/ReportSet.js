import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import ReportMapCrops from './ReportMapCrops'
import axios from 'axios'
import { API_BASE_URL } from 'src/Config'
import { useEffect, useState } from 'react'
import HarvestChart from './HarvestChart'
import EstimatedHarvestByTime from './EstimatedHarvestByTime'
import FarmersByOffice from './FarmersByOffice'

//Public reports set
const DefaultReportSet = () => {
  // Separate data sets for the charts
  const [farmerData, setFarmerData] = useState([])

  //API call for get farmer count by district
  useEffect(() => {
    axios.get(`${API_BASE_URL}/report/users/farmer/count-by-district`).then((response) => {
      setFarmerData(response.data)
    })
  }, [])

  //Farmer Data by district Chart
  const chartFarmerData = {
    labels: farmerData.map((item) => item.district),
    datasets: [
      {
        label: 'Farmers by District',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: farmerData.map((item) => item.count),
      },
    ],
  }

  return (
    <div style={{ marginTop: '100px', marginBottom: '50px', paddingTop: '10px' }}>
      <CRow>
        <CCol xs="12" sm="6" lg="6">
          <CCard style={{ marginBottom: '10px' }}>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Paddy Cultivation In Districts 2024, Sri Lanka
            </CCardHeader>
            <CCardBody style={{ height: '800px' }}>
              {/* ReportMapCrops.js */}
              <ReportMapCrops />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CCard style={{ marginBottom: '10px' }}>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Total Registered Farmers in Districts, Sri Lanka
            </CCardHeader>
            <CCardBody style={{ height: '800px' }}>
              <CChart
                type="bar"
                data={chartFarmerData}
                labels="Districts"
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" lg="6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Total Harvest(tons) in Si Lanka (Filter By years)
            </CCardHeader>
            <CCardBody style={{ height: '700px' }}>
              <HarvestChart />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Estimated Monthly Crop Harvest(tons) in Sri Lanka, 2024
            </CCardHeader>
            <CCardBody style={{ height: '700px' }}>
              <EstimatedHarvestByTime />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

// Admin Report set
const AdminReportSet = () => {
  const [farmerData, setFarmerData] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/report/users/farmer/count-by-district`).then((response) => {
      setFarmerData(response.data)
    })
  }, [])

  const chartFarmerData = {
    labels: farmerData.map((item) => item.district),
    datasets: [
      {
        label: 'Farmers by District',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: farmerData.map((item) => item.count),
      },
    ],
  }

  return (
    <div style={{ marginTop: '100px', marginBottom: '50px', paddingTop: '10px' }}>
      <CRow>
        <CCol xs="12" sm="6" lg="6">
          <CCard style={{ marginBottom: '10px' }}>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Paddy Cultivation In District 2024
            </CCardHeader>
            <CCardBody style={{ height: '800px' }}>
              <FarmersByOffice />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CCard style={{ marginBottom: '10px' }}>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Paddy Cultivation In District 2024
            </CCardHeader>
            <CCardBody style={{ height: '800px' }}>
              <ReportMapCrops />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CCard style={{ marginBottom: '10px' }}>
            <CCardHeader style={{ fontWeight: 'bold' }}>Registered Farmers in District</CCardHeader>
            <CCardBody style={{ height: '800px' }}>
              <CChart
                type="bar"
                data={chartFarmerData}
                labels="Districts"
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6" lg="6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>Harvest(tons) By years</CCardHeader>
            <CCardBody style={{ height: '700px' }}>
              <HarvestChart />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CCard>
            <CCardHeader style={{ fontWeight: 'bold' }}>
              Estimated Crop Harvest(tons) By Months
            </CCardHeader>
            <CCardBody style={{ height: '700px' }}>
              <EstimatedHarvestByTime />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export { DefaultReportSet, AdminReportSet }
