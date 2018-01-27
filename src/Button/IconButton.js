import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'
import MuiIconButton from 'material-ui/IconButton'

function IconButton({ tooltip, onClick, children }) {
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <MuiIconButton onClick={onClick}>{children}</MuiIconButton>
      </Tooltip>
    )
  }

  return <MuiIconButton onClick={onClick}>{children}</MuiIconButton>
}

IconButton.propTypes = {
  tooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default IconButton
