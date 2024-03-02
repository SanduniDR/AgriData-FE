import React, { useState } from 'react'
import 'src/App.css'
import banner from 'src/assets/landing_page/AdminOperations/banner.png'
import fm from 'src/assets/landing_page/AdminOperations/Fm.jpg'
import mail from 'src/assets/landing_page/AdminOperations/emial.jpg'
import um from 'src/assets/landing_page/AdminOperations/um.jpg'
import mf from 'src/assets/landing_page/AdminOperations/mainfund.jpg'
import crops from 'src/assets/landing_page/AdminOperations/crops.jpg'
import { Image, Card, Button, Container, Row, Col } from 'react-bootstrap'
import AidOperations from 'src/views/management/aid/AidOperations'
import CropOperations from 'src/views/management/crop/CropOperations'
import UserOperations from 'src/views/management/user/UserOperations'
import AidDistributionOperations from 'src/views/management/aid/distribution/AidDistributionOperations'
import FarmerOperations from 'src/views/management/farmer/FarmerOperations'

const DataAdminCollection = () => {
  const [isUserAccountClicked, setUserAccountClicked] = useState(false)
  const [isAddMainFundClick, setMainFundClicked] = useState(false)
  const [isAgriAidTypeClicked, setAgriAidTypeClicked] = useState(false)
  const [isSendEmailClicked, setSendEmailClicked] = useState(false)
  const [isCropInfoClicked, setCropInfoClicked] = useState(false)
  const tasks = [
    'Manage user accounts',
    'Add main fund details for agricultural aid',
    'Add agricultural aid types with details',
    'Send emails to officers',
    'Manage Crop information',
  ]

  const images = [um, mf, fm, mail, crops]

  const handleButtonClick = (index) => {
    console.log(`Button ${index + 1} was clicked`)
    ResetClicks()
    if (index === 0) {
      setUserAccountClicked(true)
    } else if (index === 1) {
      setMainFundClicked(true)
    } else if (index === 2) {
      setAgriAidTypeClicked(true)
    } else if (index === 3) {
      setSendEmailClicked(true)
    } else if (index === 4) {
      setCropInfoClicked(true)
    }
  }

  const ResetClicks = () => {
    setUserAccountClicked(false)
    setMainFundClicked(false)
    setAgriAidTypeClicked(false)
    setSendEmailClicked(false)
    setCropInfoClicked(false)
  }

  return (
    <div className="main-content" style={{ marginTop: '60px' }}>
      <div>
        <Image src={banner} fluid />
      </div>
      <div className="Report-home">
        <div>
          <Container>
            <Row>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[0]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[0]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(0)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[1]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[1]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(1)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[2]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[2]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(2)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[3]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[3]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(3)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[4]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text>{tasks[4]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(4)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        {isUserAccountClicked ? <UserOperations /> : null}
        {isAddMainFundClick ? <AidOperations /> : null}
        {isAgriAidTypeClicked ? <AidDistributionOperations /> : null}
        {isSendEmailClicked ? <UserOperations /> : null}
        {isCropInfoClicked ? <CropOperations /> : null}
      </div>
    </div>
  )
}

const DataGenericCollection = () => {
  const [isUserAccountClicked, setUserAccountClicked] = useState(false)

  const tasks = ['Manage user accounts']

  const images = [um]

  const handleButtonClick = (index) => {
    console.log(`Button ${index + 1} was clicked`)
    ResetClicks()
    if (index === 0) {
      setUserAccountClicked(true)
    }
  }

  const ResetClicks = () => {
    setUserAccountClicked(false)
  }

  return (
    <div className="main-content" style={{ marginTop: '60px' }}>
      <div>
        <Image src={banner} fluid />
      </div>
      <div className="Report-home">
        <div>
          <Container>
            <Row>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[0]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[0]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(0)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>{isUserAccountClicked ? null : null}</div>
    </div>
  )
}

const DataOfficerCollection = () => {
  const [isUserAccountClicked, setUserAccountClicked] = useState(false)
  const [isCultivationsClicked, setisCultivationsClicked] = useState(false)
  const [isAdiDistribution, setisAdiDistribution] = useState(false)
  const tasks = ['Manage Farmer accounts', 'Manage Cultivations', 'Manage Aid Distribution']

  const images = [um, mf, fm]

  const handleButtonClick = (index) => {
    console.log(`Button ${index + 1} was clicked`)
    ResetClicks()
    if (index === 0) {
      setUserAccountClicked(true)
    } else if (index === 1) {
      setisCultivationsClicked(true)
    } else if (index === 2) {
      setisAdiDistribution(true)
    }
  }

  const ResetClicks = () => {
    setUserAccountClicked(false)
    setisCultivationsClicked(false)
    setisAdiDistribution(false)
  }

  return (
    <div className="main-content" style={{ marginTop: '60px' }}>
      <div>
        <Image src={banner} fluid />
      </div>
      <div className="Report-home">
        <div>
          <Container>
            <Row>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[0]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text style={{ fontWeight: 'bold' }}>{tasks[0]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(0)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[1]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text>{tasks[1]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(1)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm className="card-container-adminops">
                <Card className="card">
                  <Card.Img variant="top" src={images[2]} />
                  <Card.Body className="card-body-adminops">
                    <Card.Text>{tasks[2]}</Card.Text>
                    <Button className="card-button-adminops" onClick={() => handleButtonClick(2)}>
                      Open
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>{isUserAccountClicked ? <FarmerOperations /> : null}</div>
      <div>{isCultivationsClicked ? <FarmerOperations /> : null}</div>
      <div>{isAdiDistribution ? <AidDistributionOperations /> : null}</div>
    </div>
  )
}

export { DataAdminCollection, DataGenericCollection, DataOfficerCollection }
