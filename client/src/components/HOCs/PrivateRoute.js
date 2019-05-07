import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PrivateRoute extends Component {
  render() {
    console.log(this.props)
    const { component: Component, ...rest } = this.props

    if (this.props.auth === false) {
      return window.location.assign('/login')
    }

    return <Component {...rest} />
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.string
}

export default PrivateRoute
