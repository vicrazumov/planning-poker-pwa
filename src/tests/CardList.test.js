import React from 'react'
import CardList from '../CardList/CardList'
import { SCREEN_WIDTH, INDEX_CHANGE_THRESHOLD, FAST_SWIPE_THRESHOLD } from '../CardList/constants'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

describe('CardList', () => {
  it('renders correctly', () => {
    const component = mount(<CardList />)

    expect(component).toMatchSnapshot()
  })

  it('renders correctly when hidden', () => {
    const component = mount(<CardList />)
    component.find('.cardList').first().simulate('click')

    expect(component).toMatchSnapshot()
  })

  it('calls onIndexChange handler', () => {
    const handleIndexChangeMock = jest.fn()

    const component = mount(<CardList onIndexChange={handleIndexChangeMock}/>)

    component.find('div').first().simulate('touchStart', { touches: [{ clientX: 300, clientY: 0 }] })
    component.find('div').first().simulate('touchMove', { touches: [{ clientX: 100, clientY: 0 }] })
    component.find('div').first().simulate('touchEnd')

    expect(handleIndexChangeMock).toBeCalled();
  })

  it('swipes to the next slide if the move is bigger than the threshold', () => {
    const component = mount(<CardList />)

    component.find('div').first().simulate('touchStart', { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    component.find('div').first().simulate('touchMove', { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) - 10, clientY: 0 }] })
    component.find('div').first().simulate('touchEnd')

    chai.expect(component.find('.cardList').first()).to.have.style('transform', `translateX(-${SCREEN_WIDTH}px)`)
  })

  it('swipes to the next slide if the move is less but faster than the threshold', () => {
    const component = mount(<CardList />)

    component.find('div').first().simulate('touchStart', { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    component.find('div').first().simulate('touchMove', { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) + 10, clientY: 0 }] })
    component.find('div').first().simulate('touchEnd')

    chai.expect(component.find('.cardList').first()).to.have.style('transform', `translateX(-${SCREEN_WIDTH}px)`)
  })

  it('does not change the position if the move is less and slower than the threshold', async () => {
    const component = mount(<CardList />)

    component.find('div').first().simulate('touchStart', { touches: [{ clientX: SCREEN_WIDTH, clientY: 0 }] })
    component.find('div').first().simulate('touchMove', { touches: [{ clientX: SCREEN_WIDTH / (1 / INDEX_CHANGE_THRESHOLD) + 10, clientY: 0 }] })

    await new Promise(resolve => setTimeout(() => resolve(), FAST_SWIPE_THRESHOLD + 10))

    component.find('div').first().simulate('touchEnd')

    chai.expect(component.find('.cardList').first()).to.have.style('transform', `translateX(0px)`)
  })
})
