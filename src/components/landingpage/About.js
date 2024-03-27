import React from 'react'
import 'src/App.css'

import LankaMap from 'src/views/maps/LankaMap'
import backgroundImageMapContainer from 'src/assets/landing_page/home-banner-background.png'
import img1 from 'src/assets/landing_page/Footer_Bar/img1.jpg'
import img2 from 'src/assets/landing_page/Footer_Bar/img2.jpg'
import img3 from 'src/assets/landing_page/Footer_Bar/img3.jpg'
import { Card } from 'react-bootstrap'
import PageBanner from './PageBanner'
import AidOperations from 'src/views/management/aid/AidOperations'

const About = () => {
  return (
    <div className="main-content">
      <div>
        <PageBanner />
      </div>
      <div className="Report-home">
        <div className="text-container-map">
          <p
            style={{
              position: 'inherit',
              fontSize: '2em',
              fontFamily: 'Lora, serif',
              marginTop: '20px',
              padding: '20px',
            }}
          >
            Ceylon AgriData offers a comprehensive solution for Sri Lanka&apos;s agriculture sector,
            combining reliable mobile data collection, cloud-based storage, free advertising portal,
            and communication tools. By seamlessly integrating these features, Ceylon AgriData
            streamlines data management and decision-making processes for agricultural stakeholders.
            From field data collection to analysis and decision-making, Ceylon AgriData ensures
            efficiency and effectiveness every step of the way.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
