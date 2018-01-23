import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { columnType } from '../types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Navbar from '../Navbar'
import { SelectableTable } from '../Table'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  closeButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  dialog: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  dialogContent: {
    flex: '1 1 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
  content: {
    padding: theme.spacing.unit * 3,
  },
  spacer: {
    marginBottom: theme.spacing.unit * 3,
  },
  fullScreen: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
    },
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LookupDialog extends React.Component {
  constructor(props) {
    super(props)

    if (props.onLoad) {
      this.state = { value: props.value, rows: [] }
      props.onLoad(data => {
        this.setState({ rows: data })
      })
    } else {
      this.state = {
        value: props.value,
        rows: props.values
      }
    }
  }

  handleSelect = (value) => {
    this.setState({ value })
  }

  render() {
    const { classes, open, title, columns, onClose } = this.props
    
    return (
      <Dialog
        open={open}
        transition={Transition}
        onRequestClose={onClose}
        classes={{ paper: classes.dialog }}
        fullScreen={false}
        maxWidth='md'
        ignoreBackdropClick
      >
        {this.renderNavbar(classes, title, onClose)}
        <div className={ClassNames(classes.dialogContent, classes.fullScreen)}>
          <Paper>
            <SelectableTable
              columns={columns}
              rows={this.state.rows}
              value={this.state.value}
              onSelect={this.handleSelect}
            />
          </Paper>
        </div>
      </Dialog>
    )
  }

  renderNavbar = (classes, title, onClose) => (
    <Navbar
      position='absolute'
      title={title}
      leftToolbar={[
        <IconButton
          key="close"
          color="inherit"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      rightToolbar={[
        <Button
          key="select"
          color="inherit"
          onClick={() => this.props.onSelect(this.state.value)}
        >
          Save
        </Button>
      ]}
      disableGutters={true}
    />
  )
}

LookupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(columnType),
}

LookupDialog.defaultProps = {
  open: false,
}

export default withStyles(styles, { withTheme: true })(
  withRouter((LookupDialog))
)