import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  toolbar: {
    color: '#fff',
    // justifyContent: 'space-between',
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 1,
  }
})

class Navbar extends React.Component {
  render = () => {
    const { classes, title, position, color, disableGutters } = this.props

    return (
      <AppBar position={position} color={color}>
        <Toolbar className={classes.toolbar} disableGutters={disableGutters}>
          {this.props.leftToolbar}
          <Typography type="title" color="inherit" noWrap>{title}</Typography>
          <div className={classes.buttons}>{this.props.rightToolbar}</div>
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  leftToolbar: PropTypes.array,
  rightToolbar: PropTypes.array,
  position: PropTypes.string,
  color: PropTypes.string,
  disableGutters: PropTypes.bool,
}

Navbar.defaultProps = {
  position: 'static',
  color: 'primary',
  disableGutters: true,
}

export default withStyles(styles, { withTheme: true })(Navbar)