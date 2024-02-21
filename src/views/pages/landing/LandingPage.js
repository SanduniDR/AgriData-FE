import React from 'react'
import Home from 'src/components/landingpage/Home'
import About from 'src/components/landingpage/About'
import Work from 'src/components/landingpage/OurServices'
import Contact from 'src/components/landingpage/Contact'
import Footer from 'src/components/landingpage/Footer'
import 'src/App.css'

import NavigationBar from 'src/components/landingpage/Navbar'
import UncontrolledSlider from 'src/components/landingpage/slider'
import LankaMap from 'src/views/maps/LankaMap'
import backgroundImageMapContainer from 'src/assets/landing_page/home-banner-background.png'
import img1 from 'src/assets/landing_page/Footer_Bar/img1.jpg'
import img2 from 'src/assets/landing_page/Footer_Bar/img2.jpg'
import img3 from 'src/assets/landing_page/Footer_Bar/img3.jpg'
import { Container, Row, Col, Card } from 'react-bootstrap'

import { Margin } from '@mui/icons-material'

function LandingPage() {
  return (
    <div>
      <div className="App-header">
        <NavigationBar />
      </div>
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
              Agricultural Data Collection & Analysis
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
              Welcome to our Agricultural Data Collection & Analysis platform,
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
              <Card.Title>Free Advertising</Card.Title>
              <Card.Text>We support our farmers to advertise their products for free.</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', margin: '30px' }}>
            <Card.Img variant="top" src={img2} />
            <Card.Body>
              <Card.Title>Agricultural Aid</Card.Title>
              <Card.Text>
                Supporting agricultural Aid distribution on time to the right place.
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
      <div className="footer">
        <Container fluid className="LandigFooter">
          <Card className="text-center">
            <Card.Body>
              <Row>
                <Col>
                  <h5>Contact Details:</h5>
                  <p>Email: sandunidlishika@gmail.com</p>
                  <p>Phone: (+94) 750323397</p>
                  <p>Address: No 234, Neboda Road, Kalutara South Sri Lanka</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default LandingPage
