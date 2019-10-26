import React from 'react'
import { mount, shallow } from 'enzyme'

import Form from '../Components/Form'

describe('Form', () => {
  it('renders an input field for degrees', () => {
    const component = shallow(<Form />);
    expect(component.find('input[id="degrees-input"]').exists()).toEqual(true)
  })
  
})

describe('Input field', () => {
  const component = shallow(<Form />)

  it('only accepts numbers', () => {
    expect(component.find('input[id="degrees-input"]').prop('type')).toEqual('number')
  })
  
  it('accepts numbers between a range of -180 and 180', () => {
    expect(component.find('input[id="degrees-input"]').prop('min')).toEqual('-180')
    expect(component.find('input[id="degrees-input"]').prop('max')).toEqual('180')
  })

  it('has a placeholder "degrees"', () => {
    expect(component.find('input[id="degrees-input"]').prop('placeholder')).toEqual('degrees')
  })
})