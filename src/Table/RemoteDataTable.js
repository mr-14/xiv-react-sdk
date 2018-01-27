import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, { TableBody } from 'material-ui/Table'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import TableRow from './TableRow'
import EmptyRow from './EmptyRow'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

function RemoteDataTable({ classes, columns, rows, rowActions, border, profile, onFetch }) {
  if (!border) {
    return (
      <div>
        {onFetch && <TableToolbar columns={columns} onFilter={onFetch} />}
        {renderTable(classes, columns, rows, rowActions, profile)}
      </div>
    )
  }

  return (
    <Paper>
      {onFetch && <TableToolbar columns={columns} onFilter={onFetch} />}
      {renderTable(classes, columns, rows, rowActions, profile)}
    </Paper>
  )
}

function renderRows(columns, rows, rowActions, profile) {
  if (!rows || rows.length === 0) {
    return <EmptyRow colSpan={columns.length} editable={!!rowActions} />
  }

  return rows.map((row, index) => (
    <TableRow key={`tr-${index}`} columns={columns} row={row} rowActions={rowActions} profile={profile} />
  ))
}

function renderTable(classes, columns, rows, rowActions, profile) {
  return (
    <Table className={classes.table}>
      <TableHead columns={columns} editable={!!rowActions} profile={profile} />
      <TableBody>
        {renderRows(columns, rows, rowActions, profile)}
      </TableBody>
    </Table>
  )
}

RemoteDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  rowActions: PropTypes.func,
  onFetch: PropTypes.func,
}

RemoteDataTable.defaultProps = {
  border: true,
  profile: 'show'
}

export default withStyles(styles, { withTheme: true })(RemoteDataTable)