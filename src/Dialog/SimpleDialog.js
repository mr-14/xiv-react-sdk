import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { fieldType, errorType } from '../types'
import Dialog, { DialogActions } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Navbar from '../Navbar'
import validate from '../validations'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  dialog: {
    overflow: 'hidden',
    width: '100%',
  },
  dialogContent: {
    flex: '1 1 auto',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: 0,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
  content: {
    padding: theme.spacing.unit * 3,
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props)

    let values = {}, dirty = {}, error = {}

    for (const field of props.fields) {
      values[field.id] = props.values ? props.values[field.id] : ''
      dirty[field.id] = false
      error[field.id] = props.errors ? props.errors[field.id] : ''
    }

    this.state = { ...values, dirty: { ...dirty }, error: { ...error } }
  }

  componentDidMount = () => {
    document.title = this.props.title
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  handleFieldChange = (fieldId, value) => {
    this.setState({ [fieldId]: value, dirty: { ...this.state.dirty, [fieldId]: true } })
  }

  handleSubmit = onSubmit => () => {
    if (this.validateFields()) {
      onSubmit({ data: this.state, history: this.props.history })
    } else {
      let dirty = {}
      for (const fieldId of Object.keys(this.state.dirty)) {
        dirty[fieldId] = true
      }
      this.setState({ dirty })
    }
  }

  validateFields = () => {
    for (const field of this.props.fields) {
      const { hasError } = validate(this.state[field.id], field.props.validators, true)
      if (hasError) {
        return false
      }
    }
    return true
  }

  renderNavBar = (classes, title) => (
    <Navbar
      position='absolute'
      title={title}
      leftToolbar={[
        <IconButton
          key="close"
          color="inherit"
          className={classes.closeButton}
          onClick={this.handleRequestClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      disableGutters={true}
    />
  )

  renderFields = (fields, readonly) => (
    fields.map(field => {
      const props = field.props
      props.id = field.id
      props.key = field.id
      props.disabled = readonly || props.disabled
      props.onFieldChange = this.handleFieldChange
      props.value = this.state[field.id]
      props.dirty = this.state.dirty[field.id]
      props.errorText = this.state.error[field.id]

      return (
        <field.component { ...props} />
      )
    })
  )

  renderActions = () => (
    <DialogActions>
      {this.props.actions.map((action, index) => {
        const buttonProps = {
          key: index,
          color: 'primary',
          type: action.type || 'button',
        }

        if (action.onClick) {
          buttonProps.onClick = () => action.onClick({
            data: this.state,
            history: this.props.history
          })
        }

        if (action.onSubmit) {
          buttonProps.onClick = this.handleSubmit(action.onSubmit)
        }

        return <Button {...buttonProps}>{action.label}</Button>
      })}
    </DialogActions>
  )

  render() {
    const { classes, title, fields, readonly, actions } = this.props

    return (
      <Dialog
        open
        transition={Transition}
        onRequestClose={this.handleRequestClose}
        classes={{ paper: classes.dialog }}
        fullScreen={false}
        maxWidth='xs'
        ignoreBackdropClick
      >
        {this.renderNavBar(classes, title)}
        <div className={ClassNames(classes.dialogContent, classes.content)}>
          {this.renderFields(fields, readonly)}
        </div>
        {actions && this.renderActions(actions)}
      </Dialog>
    )
  }
}

SimpleDialog.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(fieldType).isRequired,
  errors: PropTypes.arrayOf(errorType),
  values: PropTypes.object,
  readonly: PropTypes.bool,
}

SimpleDialog.defaultProps = {
  readonly: false
}

export default withStyles(styles, { withTheme: true })(
  withRouter(SimpleDialog)
)