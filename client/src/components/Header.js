import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    if (this.props.auth._id) {
      return (
        <Fragment>
          <Link className="navbar-item" to="/profile">
            Profile
          </Link>
          <a className="navbar-item" href="/api/logout">
            logout
          </a>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <a className="navbar-item" href="/login">
            login
          </a>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <header className="header">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Home
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">{this.renderContent()}</div>
          </div>
        </nav>
      </header>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
