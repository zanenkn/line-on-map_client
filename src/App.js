import React, { Component } from 'react'
import Form from './Components/Form'
import { getCoords, getPath } from  './Modules/Calculations'

class App extends Component {
  state = {
    degrees: '',
    coords: [],
    path: 'M 200, 200'
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
    let path = getPath(this.state.coords)
    return (
      <>
        <div id='line' style={{'width': '400px', 'height': '400px', 'margin': 'auto', 'backgroundColor': 'grey'}}>
          <svg width='400px' height='400px'>
            <g transform='translate(0,400) scale(1,-1)'>
              <path id='current-path' d={path} fill='transparent' stroke='black'/>
            </g>
          </svg>
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
