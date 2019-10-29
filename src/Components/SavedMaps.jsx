import React from 'react'
import Map from './Map'

const SavedMaps = (props) => {
  let saved
  if (props.saved.length > 0){
    saved = (
      <div id='saved-maps'>
        <h1>
          Saved maps
        </h1>
        {props.saved.map(map => {
          return (
            <div key={map.id} className='center'>
              <div>
                <div className='svg'>
                  <svg width='400px' height='400px'>
                  <g transform='translate(0,400) scale(1,-1)'>
                    <path d={map.svg} fill='transparent' stroke='#38b2ac' stroke-width='3' stroke-linecap='round'/>
                  </g>
                  </svg>
                </div>
              </div>
              <div className='saved-map'>
                <Map 
                  defZoom={map.zoom}
                  defCenter={{ lat: map.lat, lng: map.lng }}
                  options={{ scrollwheel: false, zoomControl: false, gestureHandling: 'none', fullscreenControl: false}}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    saved = (
      <div id='saved-maps' className='center'>
        There are no maps saved at the moment.
      </div>
    )
  }
  return(
    <>
      {saved}
    </>
  )
}

export default SavedMaps