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
    return this.state.recipes.map((recipe) => {
      return (
        <div key={recipe._id} className="card">
          <header className="card-header">
            <p class="card-header-title">{recipe.title}</p>
          </header>
          <div className="card-content">
            <p>{recipe.description}</p>
          </div>
          <footer className="card-footer">
            <div class="card-footer-item">serves: {recipe.serves}</div>
            <div class="card-footer-item">preptime: {recipe.prepTime}</div>
            <div class="card-footer-item">cooktime: {recipe.cookTime}</div>
          </footer>
        </div>
      )
    })
  }

  componentDidMount() {
    this.getRandomRecipes()
  }

  render() {
    return (
      <div className="column">
        <div className="content">
          <h1>Recent Recipes</h1>
          {this.renderRecipes()}
        </div>
      </div>
    )
  }
}

export default Home
