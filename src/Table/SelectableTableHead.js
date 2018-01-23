import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { TableCell, TableHead as MuiTableHead, TableRow } from 'material-ui/Table'

const styles = theme => ({
  tableRow: {
    backgroundColor: '#eee'
  },
  hidden: {
    display: 'none'
  },
})

const SelectableTableHead = ({ classes, columns }) => (
  <MuiTableHead>
    <TableRow className={classes.tableRow}>
      <TableCell styles={{ width: '1%' }}></TableCell>
      {columns.map((cell, index) => (
        <TableCell key={index}>{cell.label}</TableCell>
      ))}
    </TableRow>
  </MuiTableHead>
)

SelectableTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
}

export default withStyles(styles, { withTheme: true })(SelectableTableHead)