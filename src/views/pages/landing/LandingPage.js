import React from 'react'
import Home from 'src/components/landingpage/Home'
import About from 'src/components/landingpage/About'
import Work from 'src/components/landingpage/OurServices'
import Contact from 'src/components/landingpage/Contact'
import Footer from 'src/components/landingpage/Footer'
import 'src/App.css'

function LandingPage() {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
