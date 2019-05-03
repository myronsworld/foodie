import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: {}
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile/recipes')

      this.setState(() => ({ recipes: res }))
    } catch (e) {
      console.log(e)
    }
  }

  renderContent() {
    if (this.props.loading === false) {
      return <p>This is your profile page, {this.props.user.name}</p>
    }
  }

  renderRecipesList() {
    const recipes = this.state.recipes.data

    let listRecipes = []
    if (recipes) {
      listRecipes = recipes.map((recipe) => <li key={recipe._id}>{recipe.title}</li>)
    }

    return <ul>{listRecipes}</ul>
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">{this.renderContent()}</div>
            <div className="column">
              <h2>MY RECIPES</h2>
              {this.renderRecipesList()}
              <Link to="/profile/recipe">Add New</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Profile
