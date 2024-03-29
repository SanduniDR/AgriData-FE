import React from 'react'
import 'src/App.css'
import { Container, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { CFooter } from '@coreui/react'

function DefaultLayout({ children }) {
  return (
    <div>
      <div className="header"></div>
      <div className="main-content">{children}</div>
      <div className="footer">
        <Container fluid className="LandigFooter">
          <Card className="text-center">
            <Card.Body>
              <CFooter>
                <div>
                  <a href="https://cmb.ac.lk/" target="_blank" rel="noopener noreferrer">
                    UCSC - University of Colombo School of Computing
                  </a>
                  <span className="ms-1">&copy; 2020 MIT Final Project</span>
                </div>
                <div className="ms-auto">
                  <span className="me-1">Supervised By</span>
                  <a
                    href="https://scholar.google.com/citations?user=116_3ZIAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr Noel Fernando
                  </a>
                </div>
              </CFooter>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
