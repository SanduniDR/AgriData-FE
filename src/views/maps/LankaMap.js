import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import statesData from '../../defaultData/LankaMapData/District_geo.json' // replace with the path to your statesData file
import PropTypes from 'prop-types'
import { API_BASE_URL } from 'src/Config'

let geojson

function StatesDataLayer() {
  const map = useMap()
  const info = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/report/cultivation-info/cropByDistrict`, {
        agri_year: 2023,
        quarter: '1',
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          const apiData = response.data
          console.log(apiData, 'apidata')
          // putting json object in to key value map
          const apiDataByDistrict = apiData.reduce((dataMap, item) => {
            if (item.crop_name === 'Tea') {
              dataMap[item.district] = item //map:key:val pair
            }
            return dataMap
          }, {})

          console.log('converted map', apiDataByDistrict)
          //set data to feature
          statesData.features.forEach((feature) => {
            const properties = feature.properties
            const itemFromBE = apiDataByDistrict[properties.ADM2_EN] // replace ADM1_EN with the property that matches the keys in apiData
            if (itemFromBE) {
              feature.properties = { ...properties, ...itemFromBE }
            }
            console.log(feature.properties)
          })
          setData(statesData)
        } else {
          setData(statesData)
        }
      })
      .catch((error) => {
        setData(statesData)
      })
  }, [])

  useEffect(() => {
    //banner changes
    if (!info.current) {
      // only create a new info control if it doesn't already exist
      info.current = L.control()

      info.current.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info')
        this.update()
        return this._div
      }

      info.current.update = function (props) {
        this._div.innerHTML =
          '<h4 class="mapBanner" style="z-index: 500;"> District Overall Cultivation Info 2023 </h4>' +
          (props ? '<b>Tea(Kg):' + props.total_cultivated : '')
      }

      info.current.addTo(map)
    }
    //pop up feature
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
            fillColor: getColor(feature.properties.total_cultivated),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.9,
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
  if (d > 1000) {
    return '#00441b' // dark green
  } else if (d > 500) {
    return '#006d2c'
  } else if (d > 200) {
    return '#238b45'
  } else if (d > 100) {
    return '#41ae76'
  } else if (d > 50) {
    return '#66c2a4'
  } else if (d > 30) {
    return '#99d8c9'
  } else if (d > 10) {
    return '#ccece6'
  } else {
    return '#edf8fb' // light green
  }
}

StatesDataLayer.propTypes = {
  ADM2_EN: PropTypes.string.isRequired,
  total_cultivated: PropTypes.number.isRequired,
}

export default LankaMap
