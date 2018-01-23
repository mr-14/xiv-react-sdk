import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { withStyles } from 'material-ui/styles'
import Navbar from '../Navbar'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  dialog: {
    width: '100%'
  },
  dialogContent: {
    boxSizing: 'border-box',
    padding: 0,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
  formContent: {
    padding: theme.spacing.unit * 3,
  },
  fullScreen: {
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
    },
  }
})

class FormDialog extends React.Component {
  componentDidMount = () => {
    document.title = this.props.title
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  render() {
    const { history, classes, title, color, onSubmit, fullScreen } = this.props

    return (
      <Dialog
        open={true}
        transition={<Slide direction="up" />}
        keepMounted
        onRequestClose={this.handleRequestClose}
        classes={{ paper: classes.dialog }}
        maxWidth="xs"
        fullScreen={fullScreen}
      >
        <form onSubmit={onSubmit(history)} style={{ height: '100%' }}>
          <Navbar
            position='absolute'
            title={title}
            color={color}
            leftToolbar={[
              <IconButton key="close" color="inherit" onClick={this.handleRequestClose}>
                <CloseIcon />
              </IconButton>
            ]}
            rightToolbar={this.renderToolbarActions()}
            disableGutters={!fullScreen}
          />
          <DialogContent className={ClassNames(classes.dialogContent, fullScreen && classes.fullScreen)}>
            <div className={classes.formContent}>
              {this.props.children}
            </div>
            {this.props.dataTable}
          </DialogContent>
          {this.renderDialogActions()}
        </form>
      </Dialog>
    )
  }

  renderToolbarActions = () => {
    if (!this.props.toolbarActions) {
      return null
    }

    return this.props.toolbarActions.map((action, index) => {
      return this.renderActionButton(action, index, 'inherit')
    })
  }

  renderDialogActions = () => {
    if (!this.props.dialogActions) {
      return null
    }

    return (
      <DialogActions>
        {this.props.dialogActions.map((action, index) => {
          return this.renderActionButton(action, index, 'primary')
        })}
      </DialogActions>
    )
  }

  renderActionButton = (action, index, color) => {
    const buttonProps = {
      key: index,
      color: color || 'primary',
      type: action.type || 'button',
    }

    if (action.onClick) {
      buttonProps.onClick = () => action.onClick(this.props.history)
    }

    return (
      <Button {...buttonProps}>{action.label}</Button>
    )
  }
}

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  toolbarActions: PropTypes.arrayOf(PropTypes.object),
  dialogActions: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  closeAfterSuccess: PropTypes.bool,
  fullScreen: PropTypes.bool,
}

FormDialog.defaultProps = {
  closeAfterSuccess: true
}

export default withStyles(styles, { withTheme: true })(
  withRouter(FormDialog)
)