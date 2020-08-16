import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Field } from './styles'

const Input = (props) => {
  const { type = 'text', onChange, value } = props
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return <Field value={value} onChange={handleChange} type={type} />
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default Input
