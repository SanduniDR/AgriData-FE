import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import PropTypes from 'prop-types'
import { getFarmers } from 'src/api/UserService'

const WidgetsDropdown = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      let users = []
      let page = 1
      let totalPages = 1

      while (page <= totalPages) {
        const response = await getFarmers(page)
        users = users.concat(response.data)
        totalPages = response.totalPages
        page++
      }

      setUsers(users)
      console.log(users.length)
    }

    fetchAllUsers()
  }, [])

  return props.user === 4 ? (
    <>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={users.length}
            title="Registered Farmers of the Area"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem to="/user/userOperations">User Management</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
          />
        </CCol>
      </CRow>
    </>
  ) : props.user === 3 ? (
    <>
      <CRow>{/*  user 3 goes here */}</CRow>
    </>
  ) : props.user === 2 ? (
    <>
      <CRow>{/*  user 2 goes here */}</CRow>
    </>
  ) : (
    props.user === 1 && (
      <>
        <CRow>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  26K{' '}
                  <span className="fs-6 fw-normal">
                    (-12.4% <CIcon icon={cilArrowBottom} />)
                  </span>
                </>
              }
            />
          </CCol>
          {/* Rest of  columns */}
        </CRow>
      </>
    )
  )
}

WidgetsDropdown.propTypes = {
  user: PropTypes.number.isRequired,
}

export default WidgetsDropdown
