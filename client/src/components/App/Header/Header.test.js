import React from 'react'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

console.log(Header)
