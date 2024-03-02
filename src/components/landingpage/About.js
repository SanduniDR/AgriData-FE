// import React from 'react'
// import { CCard, CCardBody, CCardHeader, CVideo } from '@coreui/react'
// import PageB
// import AboutBackground from 'src/assets/landing_page/about-background.png'
// import AboutBackgroundImage from 'src/assets/landing_page/about-background-image.png'

// const About = () => {
//   return (
//     <CCard className="about-section-container">
//       <CCardHeader className="about-section-header">
//         <p className="primary-subheading">About</p>
//       </CCardHeader>
//       <CCardBody className="about-section-text-container">
//         <h1 className="primary-text">
//           &quot;AgriCloud: Empowering Agriculture Through Seamless Data Management&quot;
//         </h1>
//         <p className="primary-text-text">
//           AgriCloud offers a comprehensive solution for Sri Lanka&apos;s agriculture sector,
//           combining mobile data collection, cloud-based storage, market connections, and
//           communication tools. By seamlessly integrating these features, AgriCloud streamlines data
//           management and decision-making processes for agricultural stakeholders. From field data
//           collection to analysis and decision-making, AgriCloud ensures efficiency and effectiveness
//           every step of the way.
//         </p>
//         <div className="row">
//           <div className="col-lg-12">
//             <div
//               className="play-one_content-box bg_cover wow fadeInDown"
//               style={{
//                 backgroundImage: 'url(assets/images/bg/intro-bg-1.jpg)',
//               }}
//             >
//               <a href="https://www.youtube.com/watch?v=gOZ26jO6iXE" className="video-popup">
//                 <i className="fas fa-play" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </CCardBody>
//     </CCard>
//   )
// }

// export default About

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
            combining mobile data collection, cloud-based storage, market connections, and
            communication tools. By seamlessly integrating these features, AgriCloud streamlines
            data management and decision-making processes for agricultural stakeholders. From field
            data collection to analysis and decision-making, AgriCloud ensures efficiency and
            effectiveness every step of the way.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
