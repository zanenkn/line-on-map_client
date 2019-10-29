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
    successMsg: false,
    errorMsg: false,
    error: ''
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

  handleReset = () => {
    this.setState({
      degrees: '',
      coords: [],
      lat: 57.7089,
      lng: 11.974599999999981,
      zoom: 11,
      errorMsg: false,
      error: ''
    })
  }

  handleSave = () => {
    if(this.state.coords.length > 0) {
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
          errorMsg: false,
          error: '',
          coords: [],
          lat: 57.7089,
          lng: 11.974599999999981,
          zoom: 11
        })
      })
      .catch((error) => {
        this.setState({
          errorMsg: true, 
          error: error
        })
      })
    } else {
      this.setState({
        error: "There's nothing to save, you gotta draw first!",
        errorMsg: true 
      })
    }
  }

  render() {
    let path = getPath(this.state.coords)
    let display = (this.state.coords.length === 0) ? 'none' : 'block'
    let successMsg, errorMsg

    if (this.state.successMsg) {
      successMsg = (
        <div className='center' style={{'display': 'inlineBox'}}>
            Successfully saved!
          <button className='as-link' onClick={() => {
            this.bottom.scrollIntoView({ behavior: "smooth" })
            this.setState({successMsg: false})
          }}>
            View
          </button>
        </div>
      )
    }

    if (this.state.errorMsg) {
      errorMsg = (
        <div className='center'>
          {this.state.error}
        </div>
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
              <path id='current-path' d={path} fill='transparent' stroke='#38b2ac' stroke-width='3' stroke-linecap='round'/>
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
          handleReset={this.handleReset.bind(this)}
          degrees={this.state.degrees}
        />
        {successMsg}
        {errorMsg}
        <SavedMaps 
          saved={this.state.savedPaths}
        />
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.bottom = el }}>
        </div>
        <div className='center'>
          <button onClick={() => {this.top.scrollIntoView({ behavior: "smooth" })}}>
            Scroll to top
          </button>
        </div>
      </div>
    )
  }
}

export default App
