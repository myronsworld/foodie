import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
  async componentDidUpdate() {
    try {
      const res = await axios.get('/api/profile/recipes')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  renderContent() {
    if (this.props.loading === true) {
      return <p />
    }
    if (this.props.loading === false) {
      return <p>This is your profile page, {this.props.user.name}</p>
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">{this.renderContent()}</div>
            <div className="column">
              <h2>MY RECIPES</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Profile
