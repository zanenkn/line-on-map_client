import React from 'react'
import { mount } from 'enzyme'

import App from '../App'

describe('App', () => {
  
  it('renders divs for line and user input form', () => {
    const component = mount(<App />)
    expect(component.find('#line').exists()).toEqual(true)
    expect(component.find('#user-input').exists()).toEqual(true)
  })
  it('receives degrees as a state from the input field', () => {
    const component = mount(<App />)
    component.find('#degrees-input').simulate('change', { target: { value: '55' } })
    expect(component.state('degrees')).toEqual('55')
  })

  it('receives coordinate pair as a state when move button is clicked', () => {
    const component = mount(<App />)
    component.find('#degrees-input').simulate('change', { target: { value: '90' } })
    component.find('#move').simulate('submit')
    expect(component.state('coords')).toEqual([{x: 0, y: 20}])
  })

  it('chains a new coordinate pair on the existing state', () => {
    const component = mount(<App />)
    component.setState({ coords: [{x: 0, y: 20}] })
    component.find('#degrees-input').simulate('change', { target: { value: '45' } })
    component.find('#move').simulate('submit')
    expect(component.state('coords')).toEqual([{x: 0, y: 20}, {x: 14.14214, y: 14.14214}])
  })

  it('receives a path string when move button is clicked', () => {
    const component = mount(<App />)
    component.find('#degrees-input').simulate('change', { target: { value: '90' } })
    component.find('#move').simulate('submit')
    expect(component.find('#current-path').prop('d')).toEqual('M 200, 200 l 0, 20')
  })

  it('successfully creates a path string from multiple inputs', () => {
    const component = mount(<App />)
    component.find('#degrees-input').simulate('change', { target: { value: '90' } })
    component.find('#move').simulate('submit')
    component.find('#degrees-input').simulate('change', { target: { value: '45' } })
    component.find('#move').simulate('submit')
    component.find('#degrees-input').simulate('change', { target: { value: '90' } })
    component.find('#move').simulate('submit')
    expect(component.find('#current-path').prop('d')).toEqual('M 200, 200 l 0, 20 l 14.14214, 14.14214 l 0, 20')
  })
})