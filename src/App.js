import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const LandingPage = React.lazy(() => import('./views/pages/landing/LandingPage'))
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="default" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
