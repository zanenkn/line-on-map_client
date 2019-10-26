import React, { Component } from 'react'
import axios from 'axios'
import Form from './Components/Form'
import Map from './Components/Map'
import { getCoords, getPath } from  './Modules/Calculations'

class App extends Component {
  state = {
    degrees: '',
    coords: [],
    lat: '',
    lng: '',
    zoom: ''
  }

  handleChange = (e) => {
    this.setState({degrees: e.target.value});
  }

  handleMove = (e) => {
    e.preventDefault()
    this.setState(state => {
      const coords = state.coords.concat(getCoords(parseFloat(state.degrees)))
      return {
        coords
      }
    })
  }

  handleMapChange = ({center, zoom}) => {
    this.setState({
      zoom: zoom, 
      lat: center.lat,
      lng: center.lng
    })
  }

  handleSave = () => {
    axios({
      method: 'post',
      url: 'https://line-on-map-backend.herokuapp.com/add-path',
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        'svg': getPath(this.state.coords),
        'lat': this.state.lat,
        'lng': this.state.lng,
        'zoom': this.state.zoom
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    let path = getPath(this.state.coords)
    let display = (this.state.coords.length === 0) ? 'none' : 'block'

    return (
      <>
        <div id='line' style={{'width': '400px', 'height': '400px', 'zIndex': '400', 'position': 'absolute', 'left': '0', 'right': '0', 'marginLeft': '0', 'marginRight': '0', 'margin': 'auto', 'display': display}}>
          <svg width='400px' height='400px'>
            <g transform='translate(0,400) scale(1,-1)'>
              <path id='current-path' d={path} fill='transparent' stroke='black'/>
            </g>
          </svg>
        </div>
        <Map 
          defCenter={{lat: 57.7089, lng: 11.9746}}
          defZoom={11}
          handleMapChange={this.handleMapChange.bind(this)}
        />
        <Form 
          handleChange={this.handleChange.bind(this)}
          handleMove={this.handleMove.bind(this)}
          handleSave={this.handleSave.bind(this)}
        />
      </>
    )
  }
}

export default App
