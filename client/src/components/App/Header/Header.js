import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    if (this.props.auth) {
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
    }
    if (!this.props.auth) {
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
        <div className="container is-fluid">
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
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.string
}

export default Header
