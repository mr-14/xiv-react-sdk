import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../types'
import TextField from 'material-ui/TextField'
import validate from '../validations'

const Text = ({ className, id, label, value, placeholder, helperText, errorText, validators, dirty, focused, disabled, onFieldChange }) => {
  const { hasError, message } = validate(value, validators, dirty)
  if (hasError) {
    errorText = message
  }
  
  return (
    <TextField
      className={className}
      id={id}
      type="password"
      fullWidth
      autoFocus={focused}
      disabled={disabled}
      label={label}
      InputLabelProps={{ shrink: disabled && placeholder }}
      placeholder={placeholder}
      value={value}
      autoComplete="current-password"
      onChange={event => onFieldChange(id, event.target.value)}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    />
  )
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  validators: validatorsType,
  onFieldChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Text