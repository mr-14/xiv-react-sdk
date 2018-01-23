import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ClassNames from 'classnames'
import { fieldType } from '../types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
  },
})

const FormContainer = ({ fields, values, readonly, profile, onFieldChange, classes, border, className }) => {
  if (!border) {
    return renderFields(fields, values, readonly, profile, onFieldChange, classes, border)
  }
  
  return (
    <Paper className={ClassNames(classes.content, className)}>
      {renderFields(fields, values, readonly, profile, onFieldChange, classes, border)}
    </Paper>
  )
}

function renderFields(fields, values, readonly, profile, onFieldChange) {
  return (
    <Grid container spacing={24}>
      {fields.map(field => {
        if (field.profile && !field.profile.includes(profile)) {
          return null
        }

        const props = field.props
        props.id = field.id
        props.key = field.id
        props.disabled = readonly || props.disabled
        props.onFieldChange = onFieldChange
        props.value = values ? values[field.id] : ''
        props.dirty = (values && values.dirty) ? values.dirty[field.id] : ''
        props.errorText = (values && values.error) ? values.error[field.id] : ''
        
        return (
          <Grid key={field.id} item xs={12} sm={6} md={4}>
            <field.component { ...props} />
          </Grid>
        )
      })}
    </Grid>
  )
}

FormContainer.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.arrayOf(fieldType).isRequired,
  values: PropTypes.object,
  readonly: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  onFieldChange: PropTypes.func.isRequired,
  border: PropTypes.bool,
}

FormContainer.defaultProps = {
  border: true,
}

export default withStyles(styles, { withTheme: true })(FormContainer)