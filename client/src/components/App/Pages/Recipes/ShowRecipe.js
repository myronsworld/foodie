import React, { Component } from 'react'
import axios from 'axios'
import RecipeCard from '../RecipeCard'

class ShowRecipe extends Component {
  state = {
    recipe: []
  }

  getRecipeID() {
    const splitURL = window.location.href.split('/')
    const id = splitURL[splitURL.length - 1]

    return id
  }

  async getRecipe() {
    const id = this.getRecipeID()
    const res = await axios.get(`/api/recipes/${id}`)

    this.setState(() => ({ recipe: res.data }))
  }

  componentDidMount() {
    this.getRecipe()
  }

  render() {
    return <RecipeCard recipe={this.state.recipe} />
  }
}

export default ShowRecipe
