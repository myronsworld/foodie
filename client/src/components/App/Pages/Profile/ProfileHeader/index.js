import React from 'react'
import PropTypes from 'prop-types'

const ProfileHeader = (props) => {
  console.log(props)
  return <p className="user-greeting">This is your profile page, {props.name}</p>
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired
}

export default ProfileHeader
