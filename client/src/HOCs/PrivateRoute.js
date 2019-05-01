import React, { Component } from 'react'

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    if (this.props.auth === null) {
      return <div>......loading</div>
    }

    if (this.props.auth === false) {
      return window.location.assign('/login')
    }

    return <Component {...rest} />
  }
}

export default PrivateRoute
