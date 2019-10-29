import React from 'react'

const Form = (props) => {
  return(
    <>
    <div id='user-input' className='control-panel'>
      <form onSubmit={props.handleMove}>
        <label>
          Enter a number:
          <input
            onChange={props.handleChange} 
            required
            value={props.degrees}
            id='degrees-input' type='number' placeholder='degrees' min='-180' max='180' />
        </label>
        <button className='control-panel-button' id='move' type='submit'>Move</button>
      </form>
    </div>
    <div className='center'>
      <button className='secondary' onClick={props.handleReset}>Reset</button>
      <button onClick={props.handleSave}>Save</button>
    </div>
    
    </>
  )
}

export default Form