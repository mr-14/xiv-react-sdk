import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody } from 'material-ui/Table'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

function ViewTable({ classes, columns, rows, border, profile }) {
  if (!border) {
    return renderTable(classes, columns, rows, 'show')
  }

  return <Paper>{renderTable(classes, columns, rows, 'show')}</Paper>
}

function renderTable(classes, columns, rows, profile) {
  return (
    <Table className={classes.table}>
      <TableHead columns={columns} editable={false} profile={profile} />
      <TableBody>
        {rows && rows.map((row, index) => (
          <TableRow key={`tr-${index}`} columns={columns} row={row} profile={profile} />
        ))}
      </TableBody>
    </Table>
  )
}

ViewTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

ViewTable.defaultProps = {
  border: true,
  profile: 'show',
}

export default withStyles(styles, { withTheme: true })(ViewTable)