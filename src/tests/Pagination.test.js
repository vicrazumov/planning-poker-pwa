import React from 'react'
import Pagination from '../Pagination/Pagination'
import Cards from '../CardList/Cards'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

describe('Pagination', () => {
  it('renders correctly when empty', () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} />)

    expect(component).toMatchSnapshot()
  })

  it('renders correctly with cards', () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} cards={Cards} />)

    expect(component).toMatchSnapshot()
  })

  it('renders correctly when hidden', () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} cards={Cards} hidden />)

    expect(component).toMatchSnapshot()
  })

  it('calls onIndexChange when clicked', () => {
    const handleIndexChange = jest.fn()
    const component = mount(<Pagination onIndexChange={handleIndexChange} activeIndex={0} cards={Cards} hidden />)

    component.find('button').last().simulate('click')
    expect(handleIndexChange).toBeCalled()
  })

  it('changes active button when clicked', () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} cards={Cards} hidden />)

    const currentActiveButton = component.find('button.active').first()

    component.find('button').last().simulate('click')

    const newActiveButton = component.find('button.active').first()

    chai.expect(currentActiveButton).to.be.not.equal(newActiveButton)
  })

  it('hides after 2 seconds', async () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} cards={Cards} />)
    component.setProps({ activeIndex: 1 })

    await new Promise(resolve => setTimeout(() => resolve(), 2010))

    chai.expect(component).to.have.className('hidden')
  })

  it('shows if activeIndex changes', async () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} cards={Cards} />)
    component.setProps({ activeIndex: 1 })

    await new Promise(resolve => setTimeout(() => resolve(), 2010))

    component.setProps({ activeIndex: 0 })

    chai.expect(component).to.not.have.className('hidden')
  })

  it('shows if data changes', async () => {
    const component = mount(<Pagination onIndexChange={() => {}} activeIndex={0} data={1} cards={Cards} />)
    component.setProps({ activeIndex: 1 })

    await new Promise(resolve => setTimeout(() => resolve(), 2010))

    component.setProps({ data: 0 })

    chai.expect(component).to.not.have.className('hidden')
  })
})