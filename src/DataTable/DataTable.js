import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ClassNames from 'classnames'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import RemoveIcon from 'material-ui-icons/Remove'
import DataTableHead from './DataTableHead'
import DataTableToolbar from './DataTableToolbar'
// import DataTableAddRow from './DataTableAddRow'
// import { getItems } from '../../actions/dataTable'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
  editableSpace: {
    marginBottom: '300px',
  },
  empty: {
    textAlign: 'center',
    opacity: 0.25
  }
})

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    if (props.remoteUrl) {
      this.fetchData(props.remoteUrl)()
    } else {
      this.state = { rows: props.rows }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.rows) {
      this.setState({ rows: nextProps.rows })
    }
    // if (this.props.rows && this.props.rows.length !== nextProps.rows.length) {
    //   this.setState({ rows: nextProps.rows })
    // }
  }

  fetchData = url => params => {
    const headers = { merchantId: this.props.merchantId }
    this.props.fetchData({ url, headers, params })
  }

  filterData = filter => {
    const rows = this.props.rows
    this.setState({ rows: filter(rows) })
  }

  addRow = row => {
    const rows = this.state.rows ? [...this.state.rows, row] : [row]
    this.setState({ rows })
  }

  removeRow = row => {
    const rows = [...this.state.rows]
    const rowToRemove = rows.indexOf(row)
    rows.splice(rowToRemove, 1)
    this.setState({ rows })
  }

  render = () => {
    const { disableBorder } = this.props

    if (disableBorder) {
      return (
        <div>
          {this.renderToolbar()}
          {this.renderTable()}
        </div>
      )
    }

    return (
      <Paper>
        {this.renderToolbar()}
        {this.renderTable()}
      </Paper>
    )
  }

  renderToolbar = () => {
    const { columns, disableToolbar, remoteUrl } = this.props

    if (disableToolbar) {
      return null
    }

    return (
      <DataTableToolbar
        columns={columns}
        fetchData={remoteUrl ? this.fetchData(remoteUrl) : null}
        filterData={remoteUrl ? null : this.filterData}
      />
    )
  }

  renderTable = () => {
    const { classes, columns, editable, rowActions } = this.props

    return (
      <Table className={ClassNames(classes.table, editable && classes.editableSpace)}>
        <DataTableHead
          columns={columns}
          editable={!!rowActions}
        />
        <TableBody>
          {this.renderRow(columns)}
        </TableBody>
      </Table>
    )
  }

  renderRow = (columns) => {
    const rows = this.props.remoteUrl ? this.props.remoteRows : this.state.rows

    if (!rows || rows.length === 0) {
      return this.props.editable ? null : this.renderEmptyRow()
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

  renderEmptyRow = () => {
    const { classes, t, columns, rowActions } = this.props
    let colspan = columns.length
    if (!!rowActions) {
      colspan++
    }

    return (
      <TableRow>
        <TableCell className={classes.empty} colSpan={colspan}>{t('dataTable.empty')}</TableCell>
      </TableRow>
    )
  }

  renderRowCell = (columns, row) => {
    return columns.map((column, index) => {
      let cellVal = row[column.id]

      if (column.parser) {
        cellVal = this.parseRowCell(column.parser, cellVal)
      }

      if (column.dropdown) {
        for (const dropdown of column.dropdown) {
          if (String(dropdown.id) === String(cellVal)) {
            cellVal = dropdown.label
            break
          }
        }
      }

      if (column.lookup) {
        cellVal = column.lookup[cellVal]
      }

      return (
        <TableCell key={index}>{cellVal}</TableCell>
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
    const { rowActions, editable } = this.props

    if (editable) {
      return (
        <TableCell numeric>
          <IconButton color="inherit" onClick={this.removeRow} ><RemoveIcon /></IconButton>
        </TableCell>
      )
    }

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

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.oneOf(['text', 'number', 'date']),
      lookup: PropTypes.object,
      parser: PropTypes.oneOfType([
        PropTypes.oneOf(['list', 'date', 'datetime']),
        PropTypes.func
      ]),
    })
  ).isRequired,
  rowActions: PropTypes.func,
  rows: PropTypes.array,
  remoteUrl: PropTypes.string,
  disableToolbar: PropTypes.bool,
  disableBorder: PropTypes.bool,
  editable: PropTypes.bool,
}

export default withStyles(styles, { withTheme: true })(DataTable)