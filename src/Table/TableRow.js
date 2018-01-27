import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { TableRow as MuiTableRow, TableCell as MuiTableCell } from 'material-ui/Table'
import TableCell from './TableCell'

function TableRow({ columns, row, rowActions, profile }) {
  return (
    <MuiTableRow>
      {columns.map((column, index) => {
        if (column.profile && !column.profile.includes(profile)) {
          return null
        }
        return <TableCell key={`td-${index}`} column={column} value={row[column.id]} />
      })}
      {rowActions && <MuiTableCell numeric>{rowActions(row)}</MuiTableCell>}
    </MuiTableRow>
  )
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(columnType).isRequired,
  row: PropTypes.object,
  rowActions: PropTypes.func,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

TableRow.defaultProps = {
  border: true,
  profile: 'show',
}

export default TableRow
