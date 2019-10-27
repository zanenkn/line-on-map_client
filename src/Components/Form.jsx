import React from 'react'

const Form = (props) => {
  return(
    <>
    <div id='user-input'>
      <form onSubmit={props.handleMove}>
        <label>
          Enter a number:
          <input
            onChange={props.handleChange} 
            required
            value={props.degrees}
            id='degrees-input' type='number' placeholder='degrees' min='-180' max='180' />
        </label>
        <input id='move' type='submit' value='Move'></input>
      </form>
    </div>
    <button onClick={props.handleSave}>Save</button>
    </>
  )
}

export default Form