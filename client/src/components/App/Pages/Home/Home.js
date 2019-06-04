import React, { Component, Fragment } from 'react'
import axios from 'axios'
import RecipeCard from '../RecipeCard'
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
      return <RecipeCard recipe={recipe} />
    })
  }

  componentDidMount() {
    this.getRandomRecipes()
  }

  render() {
    return (
      <Fragment>
        <h1 className={styles['header-style'] + ` title`}>Recent Recipes</h1>
        <div className={styles['flex-container']}>{this.renderRecipes()}</div>
      </Fragment>
    )
  }
}

export default Home
