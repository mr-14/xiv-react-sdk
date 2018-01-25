import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

function Notification({ classes, message, handleReset, anchorOriginHorizontal, anchorOriginVertical }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleReset()
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: anchorOriginVertical,
        horizontal: anchorOriginHorizontal,
      }}
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  handleReset: PropTypes.func.isRequired,
  anchorOriginVertical: PropTypes.string,
  anchorOriginHorizontal: PropTypes.string,
}

Notification.defaultProps = {
  anchorOriginVertical: 'top',
  anchorOriginHorizontal: 'center',
}

export default withStyles(styles)(Notification)