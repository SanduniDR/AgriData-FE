import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

const ShowMap = () => {
  const defaultLongitude = parseFloat(localStorage.getItem('longitude'))
  const defaultLatitude = parseFloat(localStorage.getItem('latitude'))
  const coordinates = [defaultLatitude, defaultLongitude]

  console.log('Longitude from local storage:', defaultLongitude)
  console.log('Latitude from local storage:', defaultLatitude)

  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/8326/8326599.png',
    iconSize: [38, 38],
  })

  return (
    <div>
      <h1>Select Map Area</h1>
      <MapContainer center={coordinates} zoom={30} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates} icon={customIcon} />
      </MapContainer>
    </div>
  )
}

export default ShowMap
