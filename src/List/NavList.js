import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../types'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import NavItem from './NavItem'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

class NavList extends React.Component {
  state = {}

  handleClick = itemId => () => {
    const open = this.state.hasOwnProperty(itemId) ? !this.state[itemId] : true
    this.setState({ [itemId]: open })
  }

  render() {
    const { classes, items, depth, id } = this.props

    return (
      <List className={classes.root} disablePadding={depth > 0}>
        {items.map((item, itemIdx) => {
          const itemId = id ? `${id}-${itemIdx}` : `nav-item-${itemIdx}`
          const open = this.state.hasOwnProperty(itemId) ? this.state[itemId] : false
          const element = [
            <NavItem
              id={itemId}
              key={itemId}
              label={item.label}
              icon={item.icon}
              onClick={item.subItems ? this.handleClick(itemId) : item.onClick}
              subItems={item.subItems}
              depth={depth}
              open={open}
            />
          ]

          if (item.divider) {
            element.push(<Divider key={`nav-divier-${itemIdx}`} />)
          }

          return element
        })}
      </List>
    )
  }
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(navItemType).isRequired,
  depth: PropTypes.number,
  id: PropTypes.string,
}

NavList.defaultProps = {
  depth: 0
}

export default withStyles(styles)(NavList)
