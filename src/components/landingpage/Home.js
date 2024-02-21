import React from 'react'
import BannerBackground from 'src/assets/landing_page/home-banner-background.png'
import BannerImage from 'src/assets/landing_page/home-banner-image.png'
import NavigationBar from './Navbar'

const Home = () => {
  return (
    <div className="home-container" id="home">
      <NavigationBar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">Welcome to AgriCloud !</h1>
          <p className="primary-text">Revolutionizing Sri Lanka&apos;s Agricultural Sector</p>
          <p className="primary-text-text">
            AgriCloud is dedicated to modernizing Sri Lanka&apos;s agriculture sector through
            innovative technology. Our mission is to empower stakeholders with cutting-edge tools
            and insights for sustainable growth.
          </p>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
