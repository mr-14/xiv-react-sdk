import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import EmptyRow from './EmptyRow'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

class RemoteDataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = { rows: [] }
    props.onLoad(data => { this.setState({ rows: data }) })
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.onLoad(data => { this.setState({ rows: data }) })
  }

  render = () => (
    <Paper>
      {this.renderToolbar()}
      {this.renderTable()}
    </Paper>
  )

  renderToolbar = () => {
    const { columns, onFilter } = this.props

    if (!onFilter) {
      return null
    }

    return (
      <TableToolbar
        columns={columns}
        onFilter={onFilter}
      />
    )
  }

  renderTable = () => {
    const { classes, columns, rowActions } = this.props

    return (
      <Table className={classes.table}>
        <TableHead
          columns={columns}
          editable={!!rowActions}
        />
        <TableBody>
          {this.renderRow(columns, this.state.rows)}
        </TableBody>
      </Table>
    )
  }

  renderRow = (columns, rows) => {
    if (!rows || rows.length === 0) {
      return <EmptyRow colSpan={columns.length} editable={!!this.props.rowActions} />
    }

    return rows.map((row, index) => {
      return (
        <TableRow key={index}>
          {this.renderRowCell(columns, row)}
          {this.renderRowAction(row)}
        </TableRow>
      )
    })
  }

  renderRowCell = (columns, row) => {
    return columns.map((column, index) => {
      const cellType = column.type ? column.type : 'text'
      let cellVal = row[column.id]
      
      if (column.parser) {
        cellVal = this.parseRowCell(column.parser, cellVal)
      }

      if (column.dropdown) {
        for (const option of this.props.dropdowns[column.dropdown]) {
          if (String(option.id) === String(cellVal)) {
            cellVal = option.label
            break
          }
        }
      }

      if (column.lookup) {
        cellVal = column.lookup[cellVal]
      }

      return (
        <TableCell key={index} numeric={cellType === 'number'}>{cellVal}</TableCell>
      )
    })
  }

  parseRowCell = (parser, value) => {
    if (typeof parser === "function") {
      return parser(value)
    }

    switch (parser) {
      case 'list':
        const json = JSON.parse(value)
        return Object.keys(json).map((key, index) => (
          <div key={index}>{json[key]}</div>
        ))
      case 'date':
        return value.substring(0, value.indexOf(' '))
      default:
        return value
    }
  }

  renderRowAction = (row) => {
    const { rowActions } = this.props

    if (!rowActions) {
      return null
    }

    return (
      <TableCell numeric>
        {rowActions(row)}
      </TableCell>
    )
  }
}

RemoteDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  dropdowns: PropTypes.object,
  rowActions: PropTypes.func,
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(RemoteDataTable)