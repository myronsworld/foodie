import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    console.log(this.props)

    if (this.props.auth === false || this.props.auth === null) {
      return <Redirect to="/login" />
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />
  }
}

export default PrivateRoute
