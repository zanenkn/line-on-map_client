import React from 'react'
import { shallow, mount } from 'enzyme'

import SavedMaps from '../Components/SavedMaps'

describe('Form', () => {
  it('renders correct amount of maps', () => {
    const component = mount(
      <SavedMaps
        saved = {[
          {id: 1, svg: 'M 200, 200 l 10.000000000000002, 17.32050807568877 l 0, 20', lat: 58, lng :12, zoom: 10},
          {id: 2, svg: 'M 200, 200 l 10.000000000000002, 17.32050807568877 l 0, 20', lat: 58, lng :12, zoom: 10},
          {id: 3, svg: 'M 200, 200 l 10.000000000000002, 17.32050807568877 l 0, 20', lat: 58, lng :12, zoom: 10}
        ]}
      />
    )
    expect(component.find('#saved-maps').children()).toHaveLength(3)
  })
})