import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../types'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import NavList from './NavList'

function NavItem({ theme, label, icon, onClick, subItems, depth, id, open }) {
  const item = (
    <ListItem
      key={`${id}-link`}
      button
      onClick={onClick}
      style={{ paddingLeft: theme.spacing.unit * 4 * depth }}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={label} />
      {subItems && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem >
  )

  if (subItems) {
    return [
      item,
      <Collapse key={`${id}-subitem`} component="li" in={open} timeout="auto" unmountOnExit>
        <NavList items={subItems} depth={depth + 1} id={`${id}-subitem`} />
      </Collapse>
    ]
  }

  return item
}

NavItem.propTypes = {
  theme: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  subItems: PropTypes.arrayOf(
    PropTypes.arrayOf(navItemType)
  ),
  depth: PropTypes.number,
  id: PropTypes.string,
}

NavItem.defaultProps = {
  open: false,
}

export default withStyles(null, { withTheme: true })(NavItem)
