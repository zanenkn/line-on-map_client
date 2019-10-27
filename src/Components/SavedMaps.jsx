import React from 'react'
import Map from './Map'

const SavedMaps = (props) => {
  return(
    <div id='saved-maps'>
      {props.saved.map(map => {
        return (
          <div key={map.id}>
            <div>
              <div style={{'width': '400px', 'height': '400px', 'zIndex': '400', 'position': 'absolute', 'left': '0', 'right': '0', 'marginLeft': '0', 'marginRight': '0', 'margin': 'auto'}}>
                <svg width='400px' height='400px'>
                <g transform="translate(0,400) scale(1,-1)">
                  <path d={map.svg} fill="transparent" stroke="black"/>
                </g>
                </svg>
              </div>
              <br></br>
            </div>
            <Map 
              defZoom={map.zoom}
              defCenter={{ lat: map.lat, lng: map.lng }}
              options={{ scrollwheel: false, zoomControl: false, gestureHandling: 'none', fullscreenControl: false}}
            />
          </div>
        )
      })}
    </div>
  ) 
}

export default SavedMaps