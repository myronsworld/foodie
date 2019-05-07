import React from 'react'
import Profile from './Profile'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Router>
      <Profile />
    </Router>
  )

  expect(tree).toMatchSnapshot()
})
