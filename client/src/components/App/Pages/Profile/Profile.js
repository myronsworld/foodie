import React, { Component, Fragment } from 'react'
import ProfileHeader from './ProfileHeader'
import RecipeList from './RecipeList'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile/recipes')

      this.setState(() => ({ recipes: res.data }))
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { name } = this.props.user
    const { recipes } = this.state
    const loading = recipes.length === 0

    return (
      <Fragment>
        <div className="column">
          <div className="content">{name ? <ProfileHeader name={name} /> : <div />}</div>
        </div>
        <div className="column">
          <div className="content">
            <h2>MY RECIPES</h2>
            {!loading ? <RecipeList recipes={recipes} /> : <div />}
            <Link className="button is-link" to="/profile/recipe">
              Add New
            </Link>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Profile
