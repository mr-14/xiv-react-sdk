import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
})

class IconPopover extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  }

  handleClick = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const {
      classes,
      icon,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
    } = this.props
    const { open, anchorEl } = this.state

    return (
      <div>
        <IconButton
          ref={node => { this.button = node }}
          onClick={this.handleClick}
        >
          {icon}
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          {this.props.children}
        </Popover>
      </div>
    )
  }
}

IconPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  anchorOriginVertical: PropTypes.string,
  anchorOriginHorizontal: PropTypes.string,
  transformOriginVertical: PropTypes.string,
  transformOriginHorizontal: PropTypes.string,
  children: PropTypes.node.isRequired,
}

IconPopover.defaultProps = {
  anchorOriginVertical: 'bottom',
  transformOriginVertical: 'top',
}

export default withStyles(styles, { withTheme: true })(IconPopover)