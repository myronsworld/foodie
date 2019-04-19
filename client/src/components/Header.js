import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  renderContent() {
    if (this.props.auth) {
      return (
        <li>
          <a href="/api/logout">logout</a>
        </li>
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
