import React from 'react'
import { withStyles } from 'material-ui/styles'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
// import { toggleSidebar } from '../../actions/app'

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing.unit
  }
})

class MenuButton extends React.Component {
  handleClick = () => {
    // this.props.open()
  }

  render() {
    const { classes } = this.props

    return (
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={this.handleClick}
      >
        <MenuIcon />
      </IconButton>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MenuButton)