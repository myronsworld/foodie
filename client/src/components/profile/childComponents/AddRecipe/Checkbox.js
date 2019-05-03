import React from 'react'

const Checkbox = ({ type = 'checkbox', className = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} className={className} name={name} checked={checked} onChange={onChange} />
)

export default Checkbox
