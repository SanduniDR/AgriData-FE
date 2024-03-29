import React from 'react'
import 'src/App.css'

import UncontrolledSlider from 'src/components/landingpageComponents/slider'
import LankaMap from 'src/views/maps/LankaMap'
import backgroundImageMapContainer from 'src/assets/landing_page/home-banner-background.png'
import img1 from 'src/assets/landing_page/Footer_Bar/img1.jpg'
import img2 from 'src/assets/landing_page/Footer_Bar/img2.jpg'
import img3 from 'src/assets/landing_page/Footer_Bar/img3.jpg'
import img5 from 'src/assets/landing_page/Footer_Bar/img5.jpg'
import { Card } from 'react-bootstrap'

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="App-slideshow">
        <UncontrolledSlider />
      </div>
      <div className="Report-home">
        <div
          className="text-container-map"
          style={{
            backgroundImage: `url(${backgroundImageMapContainer})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        >
          <h3
            style={{
              position: 'inherit',
              fontSize: '4em',
              fontFamily: 'Lora, serif',
              color: 'white',
            }}
          >
            Agricultural Data Collection & Representation
          </h3>
          <p
            style={{
              position: 'inherit',
              fontSize: '2em',
              fontFamily: 'Lora, serif',
              marginTop: '20px',
              padding: '20px',
            }}
          >
            Welcome to Ceylon AgriData, the cloud-based system for reliable Agri Data collecting and
            Representation platform.
            <br /> where fast information services empower decision-making. Our intuitive tools
            streamline data collection and analysis,
            <br />
            providing actionable insights in real-time. Harness the power of data to drive
            innovation, increase productivity, and achieve sustainable growth in agriculture.
          </p>
        </div>
        <div className="map-container">
          <LankaMap />
        </div>
      </div>
      <div className="Report-home-advertising">
        <Card style={{ width: '18rem', margin: '30px' }}>
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title>Free Advertising Service</Card.Title>
            <Card.Text>We support our farmers to advertise their products for free.</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', margin: '30px' }}>
          <Card.Img variant="top" src={img5} />
          <Card.Body>
            <Card.Title>Agricultural Data Solution</Card.Title>
            <Card.Text>We offer a centralized data storage solution.</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', margin: '30px' }}>
          <Card.Img variant="top" src={img2} />
          <Card.Body>
            <Card.Title>Agricultural Aid</Card.Title>
            <Card.Text>
              Supporting agricultural Aid distribution on timely manner to the right place.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', margin: '30px' }}>
          <Card.Img variant="top" src={img3} />
          <Card.Body>
            <Card.Title>Our Farmer Community</Card.Title>
            <Card.Text>
              We connect farmer community with the government by easier communication methods.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default MainContent
