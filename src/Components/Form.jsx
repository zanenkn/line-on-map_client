import React from 'react'

const Form = (props) => {
  return(
    <div id='user-input'>
      <form>
        <label>
          Enter a number:
          <input
            onChange={props.handleChange} 
            id='degrees-input' type='number' placeholder='degrees' min='-180' max='180' />
        </label>
      </form>
    </div>
  )
}

export default Form