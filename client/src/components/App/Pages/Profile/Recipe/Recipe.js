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
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>cooktime: {cookTime}</p>
        <p>preptime: {prepTime}</p>
        <p>foodType: {foodType}</p>
        <p>serves: {serves}</p>
        <p>{ingredients}</p>
        <p>{directions}</p>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <div className="column">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4">
              <div className="tile is-child box">{this.renderRecipe()}</div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Recipe
