import React from 'react'
import { mount } from 'enzyme'

import App from '../App'

describe('App', () => {
  it('renders divs for line and user input form', () => {
    const component = mount(<App />);
    expect(component.find('#line').exists()).toEqual(true)
    expect(component.find('#user-input').exists()).toEqual(true)
  })
  it('receives degrees as a prop from the input field', () => {
    const component = mount(<App />);
    component.find('#degrees-input').simulate('change', { target: { value: '55' } })
    expect(component.state('degrees')).toEqual('55')
  })
})