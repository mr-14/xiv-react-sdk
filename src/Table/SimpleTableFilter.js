import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input from 'material-ui/Input'
import Typography from 'material-ui/Typography'
import { MenuItem } from 'material-ui/Menu'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  filterInput: {
    flex: 1,
  },
  filterSearch: {
    flex: '0 0 auto',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

class SimpleTableFilter extends React.Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.state.value) {
      return
    }

    this.props.onFilter(this.state.value)
  }

  renderFilter = () => {
    const { classes, placeholder } = this.props
    return (
      <FormControl className={classNames(classes.formControl, classes.filterInput)}>
        <Input
          type='text'
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </FormControl>
    )
  }

  render = () => {
    const { classes } = this.props

    return (
      <form>
        <Toolbar className={classes.root} disableGutters>
          {this.renderFilter()}
          <div className={classNames(classes.formControl, classes.filterSearch)}>
            <IconButton type="submit" onClick={this.handleSubmit}>
              <SearchIcon />
            </IconButton>
          </div>
        </Toolbar>
      </form>
    )
  }
}

SimpleTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default withStyles(styles, { withTheme: true })(SimpleTableFilter)
