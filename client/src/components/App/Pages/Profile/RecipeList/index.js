import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RecipeList = (props) => {
  console.log(props)
  const recipes = props.recipes

  let listRecipes = []
  if (recipes) {
    listRecipes = recipes.map((recipe) => (
      <li key={recipe._id}>
        <Link to={`/profile/recipe/` + recipe._id}>{recipe.title}</Link>
      </li>
    ))
  }

  return <ul>{listRecipes}</ul>
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
}

export default RecipeList
