import React from 'react'
import PropTypes from 'prop-types'

const ProfileHeader = (props) => {
  return <p>This is your profile page, {props.name}</p>
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired
}

export default ProfileHeader
