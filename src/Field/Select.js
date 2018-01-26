import React from 'react'
import PropTypes from 'prop-types'
import { optionsType } from '../types'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import validate from '../validations'

const Select = ({ id, label, value, options, helperText, errorText, validators, dirty, focused, disabled, onFieldChange, margin }) => {
  const { hasError, message } = validate(value, validators, dirty)
  if (hasError) {
    errorText = message
  }
  
  return (
    <TextField
      id={id}
      select={true}
      fullWidth
      margin={margin}
      autoFocus={focused}
      disabled={disabled}
      label={label}
      InputLabelProps={{ shrink: disabled && value }}
      value={value || ''}
      onChange={event => onFieldChange(id, event.target.value)}
      error={!!errorText}
      helperText={errorText ? errorText : helperText}
    >
      {options ? options.map(option => (
        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
      )) :
        [<MenuItem key="empty" value="">NO DATA</MenuItem>]
      }
    </TextField>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: optionsType,
  error: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

Select.defaultProps = {
  margin: 'none'
}

export default Select