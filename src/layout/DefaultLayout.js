import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import backgroundImg from 'src/assets/images/barron.jpg'
import axios from 'axios'

const DefaultLayout = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({})
  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
    }
    axios
      .get('http://127.0.0.1:5000/user/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response)
        if (response.data.user) {
          setUser(response.data.user)
        } else {
          alert('User validation failed, please log in again or contact Admin')
          window.location.href = '/login'
        }
      })
      .catch(function (validateError) {
        console.log(validateError, 'validateError')
        alert('Error retrieving user info')
      })
  }, [])

  if (Object.keys(user).length === 0) {
    return null // Do not render anything if user object is empty
  }

  return (
    <div>
      <AppSidebar role={user.role} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader role={user.role} />
        <div className="body flex-grow-1 px-3" style={{ backgroundImage: `url(${backgroundImg})` }}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
