import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  toolbar: {
    color: '#fff',
  },
  leftToolbar: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 1,
  }
})

function AppBar({ classes, title, position, color, disableGutters, leftToolbar, rightToolbar }) {
  return (
    <MuiAppBar position={position} color={color}>
      <Toolbar className={classes.toolbar} disableGutters={disableGutters}>
        <div className={classes.leftToolbar}>{leftToolbar}</div>
        <Typography type="title" color="inherit" noWrap>{title}</Typography>
        <div className={classes.rightToolbar}>{rightToolbar}</div>
      </Toolbar>
    </MuiAppBar>
  )
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  leftToolbar: PropTypes.element,
  rightToolbar: PropTypes.element,
  position: PropTypes.string,
  color: PropTypes.string,
  disableGutters: PropTypes.bool,
}

AppBar.defaultProps = {
  position: 'static',
  color: 'primary',
  disableGutters: true,
}

export default withStyles(styles, { withTheme: true })(AppBar)
