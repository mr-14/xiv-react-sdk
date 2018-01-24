import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ClassNames from 'classnames'
import Drawer from 'material-ui/Drawer'

const styles = theme => ({
  drawer: {
    width: 0,
    height: '100%',
  },
  drawerOverflow: {
    overflow: 'hidden',
  },
  open: {
    width: 250,
  }
})

function TemporaryDrawer({ classes, open }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      classes={{ paperAnchorRight: classes.drawerOverflow }}
    >
      <div className={ClassNames(classes.drawer, open && classes.open)}>
        Hello World
      </div>
    </Drawer>
  )
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(TemporaryDrawer)