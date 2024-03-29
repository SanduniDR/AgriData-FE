import React from 'react'
import 'src/App.css'

import PageBanner from './PageBanner'

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
