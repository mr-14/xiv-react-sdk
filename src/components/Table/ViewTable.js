import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import TableHead from './TableHead'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  table: {
    overflow: 'auto',
  },
})

class ViewTable extends React.Component {
  render = () => {
    const { classes, columns, values, border, profile } = this.props

    if (!border) {
      return this.renderTable(classes, columns, values, profile)
    }

    return <Paper>{this.renderTable(classes, columns, values, profile)}</Paper>
  }

  renderTable = (classes, columns, values, profile) => (
    <Table className={classes.table}>
      <TableHead columns={columns} editable={false} profile={profile} />
      <TableBody>
        {values && this.renderRow(columns, values)}
      </TableBody>
    </Table>
  )

  renderRow = (columns, rows) => (
    rows.map((row, index) => {

      return (
        <TableRow key={index}>
          {this.renderRowCell(columns, row)}
        </TableRow>
      )
    })
  )

  renderRowCell = (columns, row) => {
    return columns.map((column, index) => {
      if (column.profile && !column.profile.includes(this.props.profile)) {
        return null
      }

      const isNumeric = column.type === 'number'
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
        <TableCell key={index} numeric={isNumeric}>{cellVal}</TableCell>
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
}

ViewTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  values: PropTypes.array,
  border: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

ViewTable.defaultProps = {
  border: true,
  profile: ['add', 'edit', 'show'],
}

export default withStyles(styles, { withTheme: true })(ViewTable)