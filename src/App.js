import React, { Component } from 'react'
import Form from './Components/Form'
import { getCoords } from  './Modules/Calculations'

class App extends Component {
  state = {
    degrees: '',
    coords: []
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

  render() {
    return (
      <>
        <div id='line' style={{'width': '400px', 'height': '400px', 'margin': 'auto', 'backgroundColor': 'grey'}}>
        </div>
        <Form 
          handleChange={this.handleChange.bind(this)}
          handleMove={this.handleMove.bind(this)}
        />
      </>
    )
  }
}

export default App
