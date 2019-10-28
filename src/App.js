import React, { Component } from 'react'
import axios from 'axios'
import Form from './Components/Form'
import Map from './Components/Map'
import SavedMaps from './Components/SavedMaps'
import { getCoords, getPath } from  './Modules/Calculations'
import './style.css'

class App extends Component {
  state = {
    degrees: '',
    coords: [],
    lat: 57.7089,
    lng: 11.974599999999981,
    zoom: 11,
    savedPaths: [],
    successMsg: false
  }

  getSavedPaths() {
    axios.get('https://line-on-map-backend.herokuapp.com/paths').then(response => {
      this.setState({
        savedPaths: response.data
      })
    })
  }

  componentDidMount() {
    this.getSavedPaths()
  }

  handleChange = (e) => {
    this.setState({degrees: e.target.value})
  }

  handleMove = (e) => {
    e.preventDefault()
    this.setState(state => {
      const coords = state.coords.concat(getCoords(parseFloat(state.degrees)))
      return {
        coords,
        successMsg: false
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
    .then(() => {
      this.getSavedPaths()
      this.setState({
        successMsg: true,
        degrees: '',
        coords: [],
        lat: 57.7089,
        lng: 11.974599999999981,
        zoom: 11
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  scrollToBottom() {
    
  }

  render() {
    let path = getPath(this.state.coords)
    let display = (this.state.coords.length === 0) ? 'none' : 'block'
    let successMsg

    if (this.state.successMsg) {
      successMsg = (
        <>
          <div>
            Successfully saved!
          </div>
          <button onClick={() => {
            this.bottom.scrollIntoView({ behavior: "smooth" })
            this.setState({successMsg: false})
          }}>
            View
          </button>
        </>
      )
    }

    return (
      <div className='app-wrapper'>
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.top = el }}>
        </div>
        <div id='line' className='svg' style={{'display': display}}>
          <svg width='400px' height='400px'>
            <g transform='translate(0,400) scale(1,-1)'>
              <path id='current-path' d={path} fill='transparent' stroke='#38b2ac' stroke-width='3'/>
            </g>
          </svg>
        </div>
        <div id='current-map'>
          <Map 
            defCenter={{lat: 57.7089, lng: 11.9746}}
            defZoom={11}
            center={{lat: this.state.lat, lng: this.state.lng}}
            zoom={this.state.zoom}
            handleMapChange={this.handleMapChange.bind(this)}
          />
        </div>
        <Form 
          handleChange={this.handleChange.bind(this)}
          handleMove={this.handleMove.bind(this)}
          handleSave={this.handleSave.bind(this)}
          degrees={this.state.degrees}
        />
        {successMsg}
        <SavedMaps 
          saved={this.state.savedPaths}
        />
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.bottom = el }}>
        </div>
        <button onClick={() => {this.top.scrollIntoView({ behavior: "smooth" })}}>
          Scroll to top
        </button>
      </div>
    )
  }
}

export default App
