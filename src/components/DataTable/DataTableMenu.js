import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Menu from 'material-ui/Menu'
import { DataTableMenuItem } from '../../components/DataTable'
import IconButton from 'material-ui/IconButton'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

const styles = theme => ({
  menuIcon: {
    marginRight: theme.spacing.unit * 2,
  },
})

class DataTableMenu extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  }

  handleMenuClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render = () => {
    const { classes, row, menuItems } = this.props
    return (
      <div>
        <IconButton onClick={this.handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {menuItems && menuItems.map((item, index) => (
            <DataTableMenuItem
              key={index}
              row={row}
              handleRequestClose={this.handleRequestClose}
              handleClick={item.handleClick}
              link={item.link}
            >
              {item.icon && <item.icon className={classes.menuIcon} />}
              {item.label}
            </DataTableMenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

DataTableMenu.propTypes = {
  row: PropTypes.object.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.func,
      handleClick: PropTypes.func,
      link: PropTypes.string,
    }).isRequired
  ),
}

export default withStyles(styles, { withTheme: true })(
  withRouter(DataTableMenu)
)  