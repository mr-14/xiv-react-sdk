import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../types'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import NavList from './NavList'

function NavItem({ theme, label, icon, onClick, subItems, depth, open }) {
  const item = (
    <ListItem button onClick={onClick} style={{ paddingLeft: theme.spacing.unit * 4 * depth }}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={label} />
    </ListItem >
  )

  if (subItems) {
    return (
      <div>
        {item}
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <NavList groups={subItems} depth={depth + 1} />
        </Collapse>
      </div>
    )
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
}

NavItem.defaultProps = {
  open: false,
}

export default withStyles(null, { withTheme: true })(NavItem)
