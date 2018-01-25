import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'

const styles = theme => ({
  drawer: {
    width: 240,
    height: '100%',
  }
})

function TemporaryDrawer({ classes, open, children }) {
  return (
    <Drawer anchor="left" open={open}>
      <div className={classes.drawer}>
        {children}
      </div>
    </Drawer>
  )
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

TemporaryDrawer.defaultProps = {
  open: false
}

export default withStyles(styles, { withTheme: true })(TemporaryDrawer)