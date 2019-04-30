import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    console.log(this.props)

    return (
      <Route
        {...rest}
        render={(props) => (this.props.auth._id !== '""' ? <Component {...props} /> : props.history.push('/login'))}
      />
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(PrivateRoute)
