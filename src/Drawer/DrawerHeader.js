import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
})

function DrawerHeader({ classes, label }) {
  return (
    <Toolbar className={classes.drawer}>
      <Typography type="title">{label}</Typography>
    </Toolbar>
  )
}

DrawerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(DrawerHeader)