import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { TableCell, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import { getItems } from '../../actions/dataTable'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => ({
  table: {
    marginBottom: theme.spacing.unit * 8,
  },
  empty: {
    textAlign: 'center',
    opacity: 0.25
  }
})

class DataTableAddRow extends React.Component {
  constructor(props) {
    super(props)

    let row = {}
    for (const column of props.columns) {
      row[column.id] = ''
    }

    this.state = { ...this.getEmptyRows(props) }
  }

  getEmptyRows = (props) => {
    let row = {}
    for (const column of props.columns) {
      row[column.id] = ''
    }
    return row
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
    this.setState({ ...this.getEmptyRows(this.props) })
  }

  handleChange = field => value => {
    this.setState({ [field]: value })
  }

  render = () => {
    const { t, columns } = this.props

    return (
      <TableRow>
        {this.renderRowCell(t, columns)}
        {this.renderRowAction()}
      </TableRow>
    )
  }

  renderRowCell = (t, columns) => {
    return columns.map((column, index) => {
      let cellVal
      if (!!column.dropdown) {
        const dropdownId = this.state[column.id]
        let dropdownLabel = ''
        if (dropdownId) {
          for (const dropdown of column.dropdown) {
            if (String(dropdown.id) === String(dropdownId)) {
              dropdownLabel = dropdown.label
              break
            }
          }
        }
        console.log('dropdownLabel', dropdownLabel)
        // cellVal = (
        //   <Select
        //     options={column.dropdown}
        //     value={dropdownLabel}
        //     onChange={this.handleChange(column.id)} />
        // )
      } else {
        cellVal = ''
      }

      return (
        <TableCell key={index}>{cellVal}</TableCell>
      )
    })
  }

  renderRowAction = () => {
    return (
      <TableCell numeric>
        <IconButton color="inherit" onClick={this.handleAdd} ><AddIcon /></IconButton>
      </TableCell>
    )
  }
}

DataTableAddRow.propTypes = {
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
  onAdd: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(DataTableAddRow)