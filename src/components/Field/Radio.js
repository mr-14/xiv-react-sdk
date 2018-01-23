import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiRadio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

const Radio = ({ id, label, value, options, onFieldChange, classes }) => (
  <FormControl component="fieldset" className={classes.formControl}>
    {label && <FormLabel component="legend">{label}</FormLabel>}
    <RadioGroup
      aria-label={label}
      name={label}
      className={classes.group}
      value={value}
      onChange={event => onFieldChange(id, event.target.value)}
    >
      {options.map(option => (
        <FormControlLabel key={option.id} value={option.id} control={<MuiRadio />} label={option.label} />
      ))}
    </RadioGroup>
  </FormControl>
)

Radio.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default withStyles(styles)(Radio)