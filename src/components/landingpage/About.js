import React from 'react'
import AboutBackground from 'src/assets/landing_page/about-background.png'
import AboutBackgroundImage from 'src/assets/landing_page/about-background-image.png'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { Link, animateScroll as scroll } from 'react-scroll'

const About = () => {
  return (
    <div className="about-section-container" id="about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-text">
          &quot;AgriCloud: Empowering Agriculture Through Seamless Data Management&quot;
        </h1>
        <p className="primary-text-text">
          AgriCloud offers a comprehensive solution for Sri Lanka&apos;s agriculture sector,
          combining mobile data collection, cloud-based storage, market connections, and
          communication tools. By seamlessly integrating these features, AgriCloud streamlines data
          management and decision-making processes for agricultural stakeholders. From field data
          collection to analysis and decision-making, AgriCloud ensures efficiency and effectiveness
          every step of the way.
        </p>

        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default About
