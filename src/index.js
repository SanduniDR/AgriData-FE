import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [isValidUser, setIsValidUser] = useState(() => {
    const savedValidUser = sessionStorage.getItem('isValidUser')
    return savedValidUser !== null ? JSON.parse(savedValidUser) : false
  })

  useEffect(() => {
    sessionStorage.setItem('isValidUser', JSON.stringify(isValidUser))
  }, [isValidUser])

  return (
    <UserContext.Provider value={{ isValidUser, setIsValidUser }}>{children}</UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>,
)
