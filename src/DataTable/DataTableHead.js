import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableHead, TableRow } from 'material-ui/Table'

const styles = theme => ({
  tableRow: {
    backgroundColor: '#eee'
  },
  hidden: {
    display: 'none'
  },
})

class DataTableHead extends React.Component {

  render = () => {
    const { classes, columns, editable } = this.props

    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          {columns.map((cell, index) => this.renderCell(cell, index))}
          {editable && <TableCell styles={{width: '1%'}}></TableCell>}
        </TableRow>
      </TableHead>
    )
  }

  renderCell = (cell, index) => {
    const type = cell.type ? cell.type : 'text'
    const isNumeric = (type === 'number')

    return (
      <TableCell key={index} numeric={isNumeric}>{cell.label}</TableCell>
    )
  }
}

DataTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  editable: PropTypes.bool,
}

export default withStyles(styles, { withTheme: true })(DataTableHead)