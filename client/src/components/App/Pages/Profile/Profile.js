import React, { Component, Fragment } from 'react'
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
      listRecipes = recipes.map((recipe) => (
        <li key={recipe._id}>
          <Link to={`/profile/recipe/` + recipe._id}>{recipe.title}</Link>
        </li>
      ))
    }

    return <ul>{listRecipes}</ul>
  }

  render() {
    return (
      <Fragment>
        <div className="column">
          <div className="content"> {this.renderContent()}</div>
        </div>
        <div className="column">
          <div className="content">
            <h2>MY RECIPES</h2>
            {this.renderRecipesList()}
            <Link className="button" to="/profile/recipe">
              Add New
            </Link>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Profile
