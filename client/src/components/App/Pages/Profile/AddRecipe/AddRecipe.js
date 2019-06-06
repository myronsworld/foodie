import React, { Component, Fragment } from 'react'
import RecipeForm from '../RecipeForm'
import './styles.css'

class AddRecipe extends Component {
  render() {
    return (
      <Fragment>
        <div className="column">
          <h2>Add a new recipe</h2>
          <RecipeForm />
        </div>
        <div className="column" />
      </Fragment>
    )
  }
}

export default AddRecipe
