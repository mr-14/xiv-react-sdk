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

function EmptyRow({ classes, t, colSpan, editable }) {
  let length = colSpan + (editable ? 1 : 0)

  return (
    <TableRow>
      <TableCell className={classes.empty} colSpan={length}>{t('dataTable.empty')}</TableCell>
    </TableRow>
  )
}

EmptyRow.propTypes = {
  classes: PropTypes.object.isRequired,
  colSpan: PropTypes.number.isRequired,
  editable: PropTypes.bool,
}

EmptyRow.defaultProps = {
  editable: false
}

export default withStyles(styles)(EmptyRow)