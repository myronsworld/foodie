import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    if (this.props.auth === null) {
      return <div>......loading</div>
    }

    if (this.props.auth === false) {
      return window.location.assign('/login')
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />
  }
}

export default PrivateRoute
