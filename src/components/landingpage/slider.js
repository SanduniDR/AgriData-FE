import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { SliderImage1, SliderImage2, SliderImage3, SliderImage4 } from './sliderImage'

function UncontrolledSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <SliderImage1 text="First slide" />
        <Carousel.Caption
          className="CarouselCaption"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '5em',
            fontFamily: 'Protest Revolution',
          }}
        >
          <h3>Agricultural Data Collection & Analysis</h3>
          <p>Empowering decision making with fast Information Service</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <SliderImage2 text="Second slide" />
        <Carousel.Caption
          className="CarouselCaption"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '5em',
            fontFamily: 'Protest Revolution',
          }}
        >
          <h3>Advertising Portal</h3>
          <p>Exposing our product to the world</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <SliderImage3 text="Third slide" />
        <Carousel.Caption
          className="CarouselCaption"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '5em',
            fontFamily: 'Protest Revolution',
            color: 'black',
          }}
        >
          <h3>Agricultural community & The Government Support</h3>
          <p>Trying to distribute aids where it needs and on time</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <SliderImage4 text="Fourth slide" />
        <Carousel.Caption
          className="CarouselCaption"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '4em',
            fontFamily: 'Protest Revolution',
            color: 'white',
          }}
        >
          <h3>Helps Agricultural Field officers</h3>
          <p>Support farmer and the Government to make the Agricultural development</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default UncontrolledSlider
