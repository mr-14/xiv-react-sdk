import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { TableCell, TableRow } from 'material-ui/Table'

const styles = {
  empty: {
    textAlign: 'center',
    opacity: 0.25
  }
}

function EmptyRow({ classes, colSpan, editable, message }) {
  let length = colSpan + (editable ? 1 : 0)

  return (
    <TableRow>
      <TableCell className={classes.empty} colSpan={length}>{message}</TableCell>
    </TableRow>
  )
}

EmptyRow.propTypes = {
  classes: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  message: PropTypes.string,
}

EmptyRow.defaultProps = {
  editable: false,
  message: 'NO DATA'
}

export default withStyles(styles)(EmptyRow)