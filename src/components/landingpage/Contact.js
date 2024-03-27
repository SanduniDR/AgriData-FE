import React from 'react'
import { Image } from 'react-bootstrap'
import contact from 'src/assets/landing_page/contactUs/contact.png'
const Contact = () => {
  return (
    <div className="main-content">
      <div>
        <Image src={contact} fluid />
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
            Contact Details:
            <br />
            Name: L.R.S.D.Rathnayake & Email: sandunidlishika@gmail.com
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
