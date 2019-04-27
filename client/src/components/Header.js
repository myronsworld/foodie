import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    if (this.props.auth) {
      return (
        <ul>
          <li>
            <a href="/api/logout">logout</a>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      )
    } else {
      return (
        <li>
          <a href="/login">login</a>
        </li>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <h2>food1ed</h2>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
