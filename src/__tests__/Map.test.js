import React from 'react'
import { shallow } from 'enzyme'

import Map from '../Components/Map'

describe('Form', () => {
  it('renders a div for a Map', () => {
    const component = shallow(<Map />);
    expect(component.find('div[id="current-map"]').exists()).toEqual(true)
  })
})