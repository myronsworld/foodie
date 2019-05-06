import React, { Component, Fragment } from 'react'
import axios from 'axios'

class Recipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipe: {}
    }
  }

  async componentDidMount() {
    const splitURL = window.location.href.split('/')
    const id = splitURL[splitURL.length - 1]

    try {
      const res = await axios.get(`/api/recipes/${id}`)

      if (res) {
        console.log(res.data)
        this.setState(() => ({ recipe: res.data }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  renderRecipe() {
    const { title, cookTime, description, directions, foodType, ingredients, prepTime, serves } = this.state.recipe

    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <h3>cooktime: {cookTime}</h3>
        <h3>preptime: {prepTime}</h3>
        <h3>foodType: {foodType}</h3>
        <h3>serves: {serves}</h3>
        <p>{ingredients}</p>
        <p>{directions}</p>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <div className="column">{this.renderRecipe()}</div>
      </Fragment>
    )
  }
}

export default Recipe
