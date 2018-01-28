import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, { TableBody } from 'material-ui/Table'
import TableHead from './TableHead'
import TableRow from './TableRow'
import EmptyRow from './EmptyRow'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

class DataTable extends React.Component {
  state = {
    filter: null,
    pagination: null,
  }

  handleFilter = filter => {
    this.setState({ filter })
    this.props.onFetch(filter, this.state.pagination)
  }

  handlePagination = pagination => {
    this.setState({ pagination })
    this.props.onFetch(this.state.filter, pagination)
  }

  renderRows = (columns, rows, rowActions, profile) => {
    if (!rows || rows.length === 0) {
      return <EmptyRow colSpan={columns.length} editable={!!rowActions} />
    }

    return rows.map((row, index) => (
      <TableRow key={`tr-${index}`} columns={columns} row={row} rowActions={rowActions} profile={profile} />
    ))
  }

  renderTable = (classes, columns, rows, rowActions, profile) => {
    return (
      <Table className={classes.table}>
        <TableHead columns={columns} editable={!!rowActions} profile={profile} />
        <TableBody>
          {this.renderRows(columns, rows, rowActions, profile)}
        </TableBody>
      </Table>
    )
  }

  render() {
    const { classes, columns, rows, rowActions, border, profile, Filter, onFetch } = this.props

    if (!border) {
      return (
        <div>
          {Filter && onFetch && <Filter onFilter={onFetch} />}
          {this.renderTable(classes, columns, rows, rowActions, profile)}
        </div>
      )
    }
    
    return (
      <Paper>
        {Filter && onFetch && <Filter onFilter={onFetch} />}
        {this.renderTable(classes, columns, rows, rowActions, profile)}
      </Paper>
    )
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  rows: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
  rowActions: PropTypes.func,
  Filter: PropTypes.func,
  onFetch: PropTypes.func,
}

DataTable.defaultProps = {
  border: true,
  profile: 'show'
}

export default withStyles(styles, { withTheme: true })(DataTable)