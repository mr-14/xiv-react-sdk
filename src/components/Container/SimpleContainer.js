import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { fieldType } from '../../types'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
  },
})

const SimpleContainer = ({ fields, values, readonly, profile, onFieldChange, classes, border }) => {
  if (!border) {
    return renderFields(fields, values, readonly, profile, onFieldChange, border)
  }

  return (
    <Paper className={classes.content}>
      {renderFields(fields, values, readonly, profile, onFieldChange, border)}
    </Paper>
  )
}

function renderFields(fields, values, readonly, profile, onFieldChange) {
  return fields.map(field => {
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

    return <field.component { ...props} />
  })
}

SimpleContainer.propTypes = {
  fields: PropTypes.arrayOf(fieldType).isRequired,
  values: PropTypes.object,
  readonly: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  onFieldChange: PropTypes.func.isRequired,
  border: PropTypes.bool,
}

SimpleContainer.defaultProps = {
  border: true,
}

export default withStyles(styles, { withTheme: true })(SimpleContainer)