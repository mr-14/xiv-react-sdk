import React from 'react'
import PropTypes from 'prop-types'
import { defaultErrorMessages } from '../../constants/error'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import MenuItem from 'material-ui/Menu/MenuItem'
import Paper from 'material-ui/Paper'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.isDirty = false
    this.errorMessages = { ...defaultErrorMessages, ...props.errorMessages }
    this.dirty = {}
    this.error = {}

    if (props.fields) {
      for (const key of Object.keys(props.fields)) {
        const field = props.fields[key]
        this.dirty[field.id] = false
        this.error[field.id] = null
      }
    }
  }

  handleChange = field => event => {
    field.onChange(field.id, event.target.value)

    this.dirty[field.id] = true
    this.isDirty = true
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.isValid()) {
      this.props.onSubmit()
    }

    for (const key of Object.keys(this.error)) {
      const err = this.error[key]
      if (err) {
        const field = this.props.fields.find(field => String(field.id) === String(key))
        field.onChange(key, field.value)
      }
    }

  }

  hasError = field => {
    if (!this.dirty[field.id]) {
      return !!this.error[field.id]
    }

    if (!field.validators) {
      return false
    }

    for (const validator of field.validators) {
      switch (validator) {
        case 'required':
          if (this.isEmpty(field)) {
            return true
          }
          break
        default:
          console.log('Validation rule not supported:', validator)
      }
    }

    return false
  }

  // hasErrors = () => {
  //   for (const value of Object.values(this.error)) {
  //     if (value !== null) {
  //       return true
  //     }
  //   }

  //   return false
  // }

  isEmpty = field => {
    this.clearErrorMessage(field.id)

    const isEmpty = field.value === ''
    if (isEmpty) {
      this.setErrorMessage(field.id, 'required')
    }

    return isEmpty
  }

  isValid = () => {
    const { fields } = this.props

    if (!fields) {
      return true
    }

    for (const key of Object.keys(fields)) {
      const field = fields[key]
      this.dirty[field.id] = true

      if (this.hasError(field)) {
        return false
      }
    }

    return true
  }

  setErrorMessage = (fieldId, message) => {
    this.error[fieldId] = message
  }

  clearErrorMessage = (fieldId) => {
    this.error[fieldId] = null
  }

  getErrorMessage = fieldId => {
    if (this.error[fieldId] !== null) {
      const message = this.errorMessages[this.error[fieldId]]
      return this.props.t(message)
    }

    return ''
  }

  // render = () => {
  //   const { wrapperClass, fields, header, footer } = this.props

  //   return (
  //     <form onSubmit={this.handleSubmit} style={{ height: '100%' }}>
  //       {header}
  //       <div className={wrapperClass}>
  //         {fields && this.renderFields(fields)}
  //         {this.props.children}
  //       </div>
  //       {footer}
  //     </form>
  //   )
  // }

  render = () => {
    const { wrapperClass, fields, header, footer } = this.props

    return (
      <form onSubmit={this.handleSubmit} style={{ height: '100%', overflowY: 'auto' }}>
        {header}
        <div className={wrapperClass}>
          <Paper>
            {fields && this.renderFields(fields)}
          </Paper>
          {this.renderChildren()}
        </div>
        {footer}
      </form>
    )
  }

  renderFields = (fields) => {
    const { contentClass } = this.props

    return (
      <div className={contentClass}>
        <Grid container spacing={24}>
          {fields.map((field, index) => this.renderField(field, index))}
        </Grid>
      </div>
    )
  }

  renderField = (field, index) => {
    const { fullWidth, readonly, dropdowns } = this.props
    const fieldType = field.type || 'text'
    const disabled = readonly || field.disabled
    const inputProps = (fieldType === 'date' || disabled) ? { shrink: true } : null
    const dropdown = field.dropdown && dropdowns[field.dropdown]
    
    return (
      <Grid key={index} item xs={12} sm={fullWidth ? 6 : 12} md={fullWidth ? 4 : 12}>
        <TextField
          key={field.id}
          autoFocus={index === 0}
          fullWidth
          disabled={disabled}
          id={field.id}
          type={fieldType}
          select={!!dropdown}
          multiline={fieldType === 'textarea'}
          label={field.label}
          InputLabelProps={inputProps}
          value={field.value ? field.value: ''}
          placeholder={field.placeholder}
          onChange={this.handleChange(field)}
          error={field.validators && this.hasError(field)}
          helperText={field.validators && this.getErrorMessage(field.id)}
        >
          {dropdown && dropdown.map(option => (
            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
          ))}
        </TextField>
      </Grid>
    )
  }

  renderChildren = () => {
    if (!this.props.children) {
      return null
    }

    return (
      <Paper style={{ marginTop: 24 }}>
        {this.props.children}
      </Paper>
    )
  }
}

Form.PropTypes = {
  wrapperClass: PropTypes.string,
  contentClass: PropTypes.string,
  fullWidth: PropTypes.bool,
  header: PropTypes.element,
  footer: PropTypes.element,
  fields: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'date']),
    validators: PropTypes.oneOf(['required']),
    dropdown: PropTypes.string,
  }),
  dropdowns: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  errorMessages: PropTypes.object,
  readonly: PropTypes.bool,
}

Form.defaultProps = {
  fullWidth: false,
  readonly: false,
}

export default Form