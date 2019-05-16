import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../components/App/Header/Header'

/* 
  Test header when user is logged in 
*/
const myComponent = create(
  <Router>
    <Header auth={'sdd'} />
  </Router>
)

const componentInstance = myComponent.root

describe('Header Component', () => {
  test('Render header component with appropriate options for logged in user', () => {
    expect(componentInstance.findByProps({ to: '/profile' }).children[0].children).toEqual(['Profile'])
  })
})

/*
  Test header when user is logged out
*/
const myComponentWithoutAuth = create(
  <Router>
    <Header />
  </Router>
)

const componentInstanceWithoutAuth = myComponentWithoutAuth.root

describe('Header Component', () => {
  test('Render header with login options when user is logged out', () => {
    expect(componentInstanceWithoutAuth.findByProps({ href: '/login' }).children).toEqual(['Login'])
  })
})
