import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapStyles from '../Modules/MapStyles.js'

const Map = (props) => {
  return(
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
        defaultCenter={props.defCenter}
        defaultZoom={props.defZoom}
        center={props.center}
        zoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onChange={props.handleMapChange}
        options={props.options != null ? Object.assign(props.options, {styles: MapStyles}) : {styles: MapStyles}}
      />    
    </div>
  )
}

export default Map