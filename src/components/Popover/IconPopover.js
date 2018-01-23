import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'

const styles = theme => ({
  fgColor: {
    color: theme.palette.shades.dark.text.primary
  },
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

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render = () => {
    const {
      classes,
      className,
      icon,
      label,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
    } = this.props
    const { open, anchorEl } = this.state

    return (
      <div className={className}>
        {this.renderIcon(classes, icon, label)}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onRequestClose={this.handleRequestClose}
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

  renderIcon = (classes, icon, label) => {
    const btnProps = {
      className: classes.fgColor,
      ref: node => {
        this.button = node
      },
      onClick: this.handleClick
    }

    return <IconButton {...btnProps}>{icon}</IconButton>
  }
}

IconPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string,
  anchorOriginVertical: PropTypes.string,
  anchorOriginHorizontal: PropTypes.string,
  transformOriginVertical: PropTypes.string,
  transformOriginHorizontal: PropTypes.string,
}

IconPopover.defaultProps = {
  anchorOriginVertical: 'bottom',
  transformOriginVertical: 'top',
}

export default withStyles(styles, { withTheme: true })(IconPopover)