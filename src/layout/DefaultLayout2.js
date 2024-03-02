import React from 'react'
import { useContext } from 'react'
import 'src/App.css'

import { Container, Row, Col, Card } from 'react-bootstrap'
import { UserContext } from 'src'
import PropTypes from 'prop-types'

function DefaultLayout2({ children }) {
  const { isValidUser, setIsValidUser } = useContext(UserContext)

  return (
    <div>
      <div className="header"></div>
      <div className="main-content">{children}</div>
      <div className="footer">
        <Container fluid className="LandigFooter">
          <Card className="text-center">
            <Card.Body>
              <Row>
                <Col>
                  <Container>
                    <Row>
                      <Col>
                        <h5 className="mb-3">Contact Details:</h5>
                        <p className="mb-1">Email: sandunidlishika@gmail.com</p>
                        <p className="mb-1">Phone: (+94) 750323397</p>
                        <p className="mb-0">
                          Address: No 234, Neboda Road, Kalutara South Sri Lanka
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

DefaultLayout2.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout2
