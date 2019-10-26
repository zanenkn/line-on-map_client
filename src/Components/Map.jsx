import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = (props) => {
  return(
    <div id='current-map' style={{'width': '400px', 'height': '400px', 'margin': 'auto'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
        defaultCenter={props.defCenter}
        defaultZoom={props.defZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onChange={props.handleMapChange}
      />    
    </div>
  )
}

export default Map