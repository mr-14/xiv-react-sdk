import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { TableCell, TableHead as MuiTableHead, TableRow } from 'material-ui/Table'

const styles = theme => ({
  tableRow: {
    backgroundColor: '#eee'
  },
  hidden: {
    display: 'none'
  },
})

const TableHead = ({ classes, columns, editable, profile }) => {
  return (
    <MuiTableHead>
      <TableRow className={classes.tableRow}>
        {columns.map(column => {
          if (column.profile && !column.profile.includes(profile)) {
            return null
          }

          const alignRight = (column.align || 'left') === 'right'
          return <TableCell key={column.id} numeric={!editable && alignRight}>{column.label}</TableCell>
        })}
        {editable && <TableCell styles={{ width: '1%' }}></TableCell>}
      </TableRow>
    </MuiTableHead>
  )
}

TableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

TableHead.defaultProps = {
  editable: true,
}

export default withStyles(styles, { withTheme: true })(TableHead)