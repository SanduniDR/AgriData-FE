import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'src/Config'

const AdvertisementImage = ({ advertisementId }) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/advertisement/${advertisementId}/image`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob)
        setImageUrl(objectUrl)
      })
  }, [advertisementId])

  if (!imageUrl) {
    return <div>Loading...</div>
  }

  return <img src={imageUrl} alt="Advertisement" />
}

AdvertisementImage.propTypes = {
  advertisementId: PropTypes.number.isRequired,
}
export default AdvertisementImage
