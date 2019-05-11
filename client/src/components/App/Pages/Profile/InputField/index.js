import React from 'react'
import PropTypes from 'prop-types'

const InputField = (props) => {
  const { value, onChange, name } = props

  let title = ''
  let type = ''

  switch (name) {
    case 'recipeTitle':
      title = 'Title'
      break
    case 'description':
      title = 'Description'
      break
    case 'cookTime':
      title = 'Cook Time'
      type = 'number'
      break
    case 'prepTime':
      title = 'Prep Time'
      type = 'number'
      break
    case 'serves':
      title = 'Serves'
      type = 'number'
      break
    case 'directions':
      title = 'Directions'
      break
    default:
      title = ''
      type = 'text'
  }

  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <input className="input" name={name} type={type} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default InputField
