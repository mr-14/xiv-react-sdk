import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Tooltip from 'material-ui/Tooltip'
import MuiIconButton from 'material-ui/IconButton'

function IconButton(props) {
  const handleClick = link => () => {
    props.history.push(link)
  }

  return (
    <Tooltip title={props.tooltip}>
      <MuiIconButton color="inherit" onClick={handleClick(props.link)}>
        {props.children}
      </MuiIconButton>
    </Tooltip>
  )
}

IconButton.propTypes = {
  tooltip: PropTypes.string,
  link: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default withRouter(IconButton)