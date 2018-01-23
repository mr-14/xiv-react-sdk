import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { MenuItem } from 'material-ui/Menu'

class DataTableMenuItem extends React.Component {
  handleItemClick = () => {
    const { link, handleClick } = this.props

    if (handleClick) {
      handleClick()
    }

    if (link) {
      this.props.history.push(link)
    }

    this.props.handleRequestClose()
  }

  render = () => {
    return (
      <MenuItem onClick={this.handleItemClick}>
        {this.props.children}
      </MenuItem>
    )
  }
}

DataTableMenuItem.propTypes = {
  link: PropTypes.string,
  handleClick: PropTypes.func,
  handleRequestClose: PropTypes.func,
}

export default withRouter(DataTableMenuItem)