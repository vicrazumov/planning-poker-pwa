import React from 'react'
import Card from '../Card/Card'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('Card', () => {
  it('renders correctly', () => {
    const component = mount(
    <Card
      value="1"
      image='/static/images/1.jpg'
      color='red'
      tintColor='rgba(0,0,0,0.5)'
    />)

    expect(component).toMatchSnapshot()
  })

  it('renders correctly when hidden', () => {
    const component = mount(
    <Card
      value="1"
      image='/static/images/1.jpg'
      color='red'
      tintColor='rgba(0,0,0,0.5)'
      hidden
    />)

    expect(component).toMatchSnapshot()
  })

  it('renders correctly with hidden value', () => {
    const component = mount(
      <Card
      value="1"
      image='/static/images/1.jpg'
      color='red'
      tintColor='rgba(0,0,0,0.5)'
      hideValue
    />)

    expect(component).toMatchSnapshot()
  })
})
