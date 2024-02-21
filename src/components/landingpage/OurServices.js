import React from 'react'
import AgriOfficer from 'src/assets/landing_page/agriOfficer.png'
import Farmer from 'src/assets/landing_page/farmer.png'
import FieldRelated from 'src/assets/landing_page/fieldRelated.png'
import AgriAids from 'src/assets/landing_page/agriAids.png'
import AcreTax from 'src/assets/landing_page/acreTax.png'
import BroadcastMsg from 'src/assets/landing_page/broadcastMsg.png'
import MarketPlace from 'src/assets/landing_page/marcketPlace.png'

import ReportGenerating from 'src/assets/landing_page/reportGenerating.png'
import DeliveryMeals from 'src/assets/landing_page/reportGenerating.png'

const Work = () => {
  const workInfoData = [
    {
      image: AgriOfficer,
      title: 'Agricultural Officer Data Management',
      text: 'Efficiently manage and organize data collected by agricultural officers in the field.',
    },
    {
      image: Farmer,
      title: 'Farmer Data Management',
      text: 'Streamline the storage and retrieval of farmer information for improved communication and support.',
    },
    {
      image: ReportGenerating,
      title: 'Report Generation Facility',
      text: 'Generate detailed reports on agricultural activities, performance metrics, and more.',
    },
    {
      image: FieldRelated,
      title: 'Field Related Data Collection',
      text: 'Collect and manage field related data:fields,crops,harvest efficiently, enabling informed decision-making and resource allocation.',
    },
    {
      image: AgriAids,
      title: 'Aids Data Tracking',
      text: 'Monitor and track aid distribution:fertilizer,pesticides,fuel,financial assistance, ensuring timely and effective support for farmers.',
    },
    {
      image: AcreTax,
      title: 'Acre Tax Tracking',
      text: 'Collect and manage Acre Tax data efficiently, enabling informed decision-making and resource allocation.',
    },
    {
      image: BroadcastMsg,
      title: 'Broadcast Messaging',
      text: 'Facilitate seamless communication with stakeholders through broadcast messages and updates.',
    },
    {
      image: MarketPlace,
      title: 'Marketplace Integration',
      text: 'Connect farmers with local and foreign markets to enhance opportunities for product sales.',
    },
  ]
  return (
    <div className="work-section-wrapper" id="ourservices">
      <div className="work-section-top">
        <p className="primary-subheading">Our Services</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text-text">
          AgriCloud operates through a simple yet powerful process. Agricultural officers employ the
          mobile application to gather field data swiftly and accurately. This data is then securely
          stored in AgriCloud&apos;s centralized database, enabling seamless access and retrieval.
          Users leverage the platform to analyze the data, identifying key insights to inform their
          decisions. With seamless integration between the mobile app and cloud platform, users
          enjoy real-time access to information, ensuring efficient and effective agricultural
          management.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Work
