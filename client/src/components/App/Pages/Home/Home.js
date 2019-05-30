import React, { Component, Fragment } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

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
        <div key={recipe._id} className={styles.cardStyle + ` card`}>
          <header className="card-header">
            <p className="card-header-title">{recipe.title}</p>
          </header>
          <div className="card-content">
            <p className={styles.paragraphs}>{recipe.description}</p>
          </div>
          <footer className="card-footer">
            <div className="card-footer-item">serves: {recipe.serves}</div>
            <div className="card-footer-item">preptime: {recipe.prepTime}</div>
            <div className="card-footer-item">cooktime: {recipe.cookTime}</div>
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
      <Fragment>
        <div className="content">
          <h1>Recent Recipes</h1>
        </div>
        <div className={styles['flex-container']}>{this.renderRecipes()}</div>
      </Fragment>
    )
  }
}

export default Home
