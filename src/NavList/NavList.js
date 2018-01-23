import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

class NavList extends React.Component {
  handleClick = link => () => {
    this.props.history.push(link)
  }

  render = () => {
    const { items } = this.props
    
    return items.map((group, index) => (
      [
        <List key={`nav-group-${index}`}>{this.renderItem(group, index)}</List>,
        <Divider key={`nav-divider-${index}`} />
      ]
    ))
  }

  renderItem = (group, groupIndex) => {
    return group.map((item, index) => {
      const text = <Typography color="inherit" type="subheading" noWrap>{item.text}</Typography>
      return (
        <ListItem key={`nav-item-${groupIndex}-${index}`} button onClick={this.handleClick(item.to)}>
          {item.icon && <ListItemIcon style={{ color: 'inherit' }}>{<item.icon />}</ListItemIcon>}
          <ListItemText disableTypography primary={text}/>
        </ListItem>
      )
    })
  }
}

NavList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.func,
        to: PropTypes.string,
      })
    )
  ),
}

export default withRouter(NavList)