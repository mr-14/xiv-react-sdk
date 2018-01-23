import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { hideNotification } from '../../actions/root'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class Notification extends React.Component {
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.props.hideNotification()
  }

  render() {
    const { t, classes, message } = this.props

    if (!message) {
      return null
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={6000}
        onRequestClose={this.handleRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{t(message)}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Notification)