import React from 'react'

const Checkbox = ({ label, name, checked = false, onChange }) => (
  <label className="checkbox" key={name}>
    {name}
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
  </label>
)

export default Checkbox
