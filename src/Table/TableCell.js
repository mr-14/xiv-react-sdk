import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../types'
import { TableCell as MuiTableCell } from 'material-ui/Table'

function TableCell({ column, value }) {
  const isNumeric = column.type === 'number'
  let cellVal = value

  if (column.parser) {
    cellVal = parseCell(column.parser, value)
  }

  if (column.dropdown) {
    for (const option of column.dropdown) {
      if (String(option.id) === String(cellVal)) {
        cellVal = option.label
        break
      }
    }
  }

  if (column.lookup) {
    cellVal = column.lookup[cellVal]
  }

  return <MuiTableCell numeric={isNumeric}>{cellVal}</MuiTableCell>
}

function parseCell(parser, value) {
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

TableCell.propTypes = {
  column: columnType.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default TableCell
