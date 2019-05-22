import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  state = {
    recipes: []
  }

  randomizeArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  getRandomRecipes = async () => {
    try {
      const res = await axios.get('/api/recipes')
      if (res) {
        this.randomizeArray(res.data)
        this.setState(() => ({ recipes: res.data }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  renderRecipes(recipes) {
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          {this.state.recipes.map((recipe) => {
            return (
              <div key={recipe._id} className="tile is-child">
                <h3 className="title">{recipe.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getRandomRecipes()
  }

  render() {
    return (
      <div className="column">
        <div className="content">
          <p>Recent Recipes</p>
          {this.renderRecipes()}
        </div>
      </div>
    )
  }
}

export default Home
