import React, { Component } from 'react'
import Form from './Components/Form'

class App extends Component {
  state = {
    degrees: ''
  }

  handleChange = (e) => {
    this.setState({degrees: e.target.value});
  }

  handleMove = (e) => {
    e.preventDefault()
    console.log(this.state.degrees)
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
