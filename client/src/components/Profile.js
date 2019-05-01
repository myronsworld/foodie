import React, { Component } from 'react'

class Profile extends Component {
  render() {
    if (this.props.loading === true) {
      return <p />
    }
    if (this.props.loading === false) {
      return <p>This is your profile page, {this.props.user.name}</p>
    }
  }
}

export default Profile
