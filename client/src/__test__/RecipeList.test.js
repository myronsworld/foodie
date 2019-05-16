import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeList from '../components/App/Pages/Profile/RecipeList'

const recipes = [
  {
    foodType: ['fried', 'baked'],
    ingredients: ['chayote', 'burdock', 'alligator'],
    directions: ['coooook'],
    _id: '5cdbc134c9974e22d002fb48',
    title: 'lobster',
    description: 'lobster is the best',
    cookTime: 11,
    prepTime: 1,
    rating: 2,
    serves: 1,
    chef: '5cca91a942dfce42bc451f08',
    createdAt: '2019-05-15T07:35:16.433Z',
    updatedAt: '2019-05-15T07:35:16.433Z',
    __v: 0
  }
]

const myComponent = create(
  <Router>
    <RecipeList recipes={recipes} />
  </Router>
)

const componentInstance = myComponent.root

describe('Recipe List', () => {
  test('Renders list with correct props', () => {
    expect(componentInstance.findByType('li').children[0].props.children).toBe('lobster')
  })
})
