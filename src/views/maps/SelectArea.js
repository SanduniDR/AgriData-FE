import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { CButton } from '@coreui/react'

const SelectArea = () => {
  const [coordinates, setCoordinates] = useState([7.505, 80.35])
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/8326/8326599.png',
    iconSize: [38, 38],
  })
  const MapClickHandler = () => {
    const map = useMap()

    useMapEvents({
      click: (e) => {
        setCoordinates([e.latlng.lat, e.latlng.lng])
        console.log('resize', coordinates)
        map.invalidateSize()
      },
    })
    return null
  }

  const handleConfirm = () => {
    localStorage.setItem('coordinates', JSON.stringify(coordinates))
  }

  return (
    <div>
      <h1>Select Map Area</h1>
      <MapContainer center={coordinates} zoom={30} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <Marker position={coordinates} icon={customIcon} />
      </MapContainer>
      <CButton className="m-2" onClick={handleConfirm}>
        Save Coordinates
      </CButton>
    </div>
  )
}

export default SelectArea
