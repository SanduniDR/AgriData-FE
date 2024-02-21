import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import statesData from '../../defaultData/LankaMapData/District_geo.json' // replace with the path to your statesData file
import PropTypes from 'prop-types'

let geojson

function StatesDataLayer() {
  const map = useMap()
  const info = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    // Make a POST request
    axios
      .post('YOUR_URL', {
        // Your request body
      })
      .then((response) => {
        // If the status code is 200, set the data to the response data
        if (response.status === 200) {
          const apiData = response.data
          statesData.features.forEach((feature) => {
            const properties = feature.properties
            const apiDataForFeature = apiData[properties.DISTRICT] // replace DISTRICT with the property that matches the keys in apiData
            if (apiDataForFeature) {
              // Merge the API data with the existing properties
              feature.properties = { ...properties, ...apiDataForFeature }
            }
          })
          setData(statesData)
        } else {
          // If the status code is not 200, set the data to statesData
          setData(statesData)
        }
      })
      .catch((error) => {
        // If the request is not successful, set the data to statesData
        setData(statesData)
      })
  }, [])

  useEffect(() => {
    if (!info.current) {
      // only create a new info control if it doesn't already exist
      info.current = L.control()

      info.current.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info')
        this.update()
        return this._div
      }

      info.current.update = function (props) {
        // this._div.innerHTML =
        //   '<h4>District Overall Cultivation Info 2024/h1</h4>' +
        //   (props ? '<b>' + props.ADM2_EN : 'Hover over a district')
      }

      info.current.addTo(map)
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: function (e) {
          const layer = e.target

          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9,
          })

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront()
          }

          info.current.update(layer.feature.properties)
        },
        mouseout: function (e) {
          geojson.resetStyle(e.target)
          info.current.update()
        },
      })
    }

    if (data) {
      geojson = L.geoJSON(statesData, {
        style: function (feature) {
          return {
            fillColor: getColor(feature.properties.Shape_Leng),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.1,
          }
        },
        onEachFeature: onEachFeature,
      }).addTo(map)
    }
  }, [map, data])

  return null
}

const LankaMap = () => {
  const center = [7.8731, 80.7718] // coordinates for Sri Lanka

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <MapContainer
          center={center}
          zoom={8}
          style={{ height: '100%', width: '500px' }}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          keyboard={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
          <StatesDataLayer />
        </MapContainer>
      </div>
    </div>
  )
}

function getColor(d) {
  if (d > 10) {
    return '#00441b' // dark green
  } else if (d > 5) {
    return '#006d2c'
  } else if (d > 2) {
    return '#238b45'
  } else if (d > 1) {
    return '#41ae76'
  } else if (d > 0.5) {
    return '#66c2a4'
  } else if (d > 0.2) {
    return '#99d8c9'
  } else if (d > 0.1) {
    return '#ccece6'
  } else {
    return '#edf8fb' // light green
  }
}

StatesDataLayer.propTypes = {
  ADM2_EN: PropTypes.string.isRequired,
}

export default LankaMap
