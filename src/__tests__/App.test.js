import React from 'react'
import { mount } from 'enzyme'

import App from '../App'

describe('App', () => {
  it('renders divs for line and user input form', () => {
    const component = mount(<App />);
    expect(component.find('#line').exists()).toEqual(true)
    expect(component.find('#user-input').exists()).toEqual(true);
  })
})