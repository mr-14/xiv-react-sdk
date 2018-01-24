import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContentText } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { withStyles } from 'material-ui/styles'
import Navbar from '../Navbar'
// import Form from '../Form'

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
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmDialog extends React.Component {
  componentDidMount = () => {
    document.title = this.props.t(this.props.title)
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  handleSubmit = () => {
    this.props.onSubmit(this.props.history)
  }

  renderNavbar = (title) => (
    <Navbar
      position='absolute'
      title={title}
      color='accent'
      leftToolbar={[
        <IconButton key="close" color="inherit" onClick={this.handleRequestClose}>
          <CloseIcon />
        </IconButton>
      ]}
      disableGutters={true}
    />
  )

  renderDialogActions = () => {
    const { t } = this.props

    return (
      <DialogActions>
        <Button onClick={this.handleRequestClose}>
          {t('btn.cancel')}
        </Button>
        <Button type='submit'>
          {t('btn.confirm')}
        </Button>
      </DialogActions>
    )
  }

  render() {
    const { classes, title, message } = this.props

    return (
      <Dialog
        open
        transition={Transition}
        keepMounted
        onRequestClose={this.handleRequestClose}
        classes={{ paper: classes.dialog }}
        maxWidth="xs"
        fullScreen={false}
      >
        <div className={classes.dialogContent}>
          <div className={classes.formContent}>
            <DialogContentText>{message}</DialogContentText>
          </div>
        </div>
        {/* <Form
          onSubmit={this.handleSubmit}
          header={this.renderNavbar(title)}
          footer={this.renderDialogActions()}
        >
        </Form> */}
      </Dialog>
    )
  }
}

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dialogActions: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  withRouter(ConfirmDialog)
)