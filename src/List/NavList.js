import React from 'react'
import PropTypes from 'prop-types'
import { navItemType } from '../types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import NavItem from './NavItem'
import Divider from 'material-ui/Divider'
import Collapse from 'material-ui/transitions/Collapse'
import InboxIcon from 'material-ui-icons/MoveToInbox'
import DraftsIcon from 'material-ui-icons/Drafts'
import SendIcon from 'material-ui-icons/Send'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import StarBorder from 'material-ui-icons/StarBorder'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

class NavList extends React.Component {
  state = { open: true }

  handleClick = (onClick) => () => {
    onClick()
  }

  render() {
    const { classes, groups, depth } = this.props

    return (
      <List className={classes.root} disablePadding={depth > 1}>
        {groups.map((group, groupIdx) => (
          <div key={`nav-group-${groupIdx}`}>
            {group.map((item, itemIdx) => (
              <NavItem
                key={`nav-item-${itemIdx}`}
                label={item.label}
                icon={item.icon}
                onClick={this.handleClick(item.onClick)}
                subItems={item.subItems}
                depth={depth}
                open={true}
              />
            ))}
            {(groupIdx === groups.length - 1) && <Divider />}
          </div>
        ))}
      </List>
    )
  }
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.arrayOf(navItemType)
  ).isRequired,
  depth: PropTypes.number,
}

NavList.defaultProps = {
  depth: 1
}

export default withStyles(styles)(NavList)
