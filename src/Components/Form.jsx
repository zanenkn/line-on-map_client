import React from 'react'

const Form = () => {
  return(
    <div id='user-input'>
      <form>
        <label>
          Enter a number:
          <input id='degrees-input' type='number' placeholder='degrees' min='-180' max='180' />
        </label>
      </form>
    </div>
  )
}

export default Form