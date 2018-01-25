import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { MuiTableCell } from 'material-ui/Table'

class TableCell extends React.Component {

  parseRowCell = (parser, value) => {
    if (typeof parser === 'function') {
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

  render = () => {
    const { column, value } = this.props

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
      <MuiTableCell key={index} numeric={isNumeric}>{cellVal}</MuiTableCell>
    )
  }
}

TableCell.propTypes = {
  column: columnType.isRequired,
  value: PropTypes.object,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

export default TableCell
