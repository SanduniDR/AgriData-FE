import React from 'react'
import Image from 'react-bootstrap/Image'
import PropTypes from 'prop-types'
import Image1 from 'src/assets/landing_page/slideshow/image1.jpg'
import Image2 from 'src/assets/landing_page/slideshow/image2.jpg'
import Image3 from 'src/assets/landing_page/slideshow/image3.jpg'

function SliderImage1({ text }) {
  return (
    <div>
      <Image src={Image1} alt={text} width="100%" height="100%" />
    </div>
  )
}

function SliderImage2({ text }) {
  return (
    <div>
      <Image src={Image2} alt={text} width="100%" height="100%" />
    </div>
  )
}

function SliderImage3({ text }) {
  return (
    <div>
      <Image src={Image3} alt={text} width="100%" height="100%" />
    </div>
  )
}

SliderImage1.propTypes = {
  text: PropTypes.string.isRequired,
}

SliderImage2.propTypes = {
  text: PropTypes.string.isRequired,
}

SliderImage3.propTypes = {
  text: PropTypes.string.isRequired,
}
export { SliderImage1, SliderImage2, SliderImage3 }
