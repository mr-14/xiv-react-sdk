import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { fieldType, columnType } from '../types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import { AppBar } from '../Bar'
import { HorizontalStepper } from '../Stepper'
import validate from '../validations'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  closeButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  dialog: {
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  stepper: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  content: {
    padding: theme.spacing.unit * 3,
    overflowY: 'auto',
  },
  fullScreen: {
    boxSizing: 'border-box',
    height: 'calc(100% - 128px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 136px)',
    },
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class StepperDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initState(props.values)
    if (props.onLoad) {
      props.onLoad(values => { this.setState(this.initState(values)) })
    }
  }

  componentDidMount = () => {
    document.title = this.props.title
  }

  initState = (dataSet) => {
    this.fields = {}
    return this.props.steps.reduce((steps, step) => {
      this.fields[step.id] = {}
      let data = dataSet ? dataSet[step.id] : null

      if (step.props.fields) {
        let values = {}, dirty = {}, error = {}

        for (const field of step.props.fields) {
          this.fields[step.id][field.id] = field
          values[field.id] = data ? data[field.id] : this.getDefaultValue(field)
          dirty[field.id] = false
          error[field.id] = (data && data.errors) ? data.errors[field.id] : ''
        }

        steps[step.id] = {
          ...values,
          dirty: { ...dirty },
          error: { ...error },
        }

        // Update refComponents after fields have been initialized
        for (const field of step.props.fields) {
          if (field.refComponents) {
            this.updateRefComponents(steps, step.id, values[field.id], field.refComponents)
          }
        }
      }

      if (step.props.columns) {
        steps[step.id] = data ? data : []
      }

      return steps
    }, {})
  }

  getDefaultValue = field => {
    if (typeof field.default === 'function') {
      return field.default(field.props)
    }

    return field.default || ''
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  handleFieldChange = stepId => (fieldId, value) => {
    const field = this.fields[stepId][fieldId]
    let state = {
      [stepId]: {
        ...this.state[stepId],
        [fieldId]: value,
      }
    }

    if (field.refComponents) {
      this.updateRefComponents(state, stepId, value, field.refComponents)
    }

    this.setState(state)
  }

  updateRefComponents = (state, stepId, value, refComponents) => {
    if (!value) {
      return
    }

    refComponents.forEach(refComponent => {
      for (const key of Object.keys(refComponent.props)) {
        const val = refComponent.props[key](value)
        this.fields[stepId][refComponent.id].props[key] = val
      }
      state[stepId][refComponent.id] = this.getDefaultValue(this.fields[stepId][refComponent.id])
    })
  }

  handleRowAdd = stepId => row => {
    const items = this.state[stepId] ? [...this.state[stepId], row] : [row]
    this.setState({ [stepId]: items })
  }

  handleRowRemove = stepId => row => {
    const items = [...this.state[stepId]]
    const rowToRemove = items.indexOf(row)
    items.splice(rowToRemove, 1)
    this.setState({ [stepId]: items })
  }

  handleStepValidation = stepId => {
    if (this.validateFields(stepId)) {
      return true
    }

    let dirty = {}
    for (const fieldId of Object.keys(this.state[stepId].dirty)) {
      dirty[fieldId] = true
    }

    this.setState({ [stepId]: { ...this.state[stepId], dirty } })

    return false
  }

  validateFields = stepId => {
    const step = this.props.steps.find(step => step.id === stepId)

    for (const field of step.props.fields) {
      const { hasError } = validate(this.state[stepId][field.id], field.props.validators, true)
      if (hasError) {
        return false
      }
    }
    return true
  }

  handleSubmit = (data, history) => () => {
    if (!this.props.onSubmit) {
      return false
    }

    this.props.onSubmit(data, history)
  }

  renderNavBar = (classes, title) => (actions) => (
    <AppBar
      position='absolute'
      title={title}
      leftToolbar={[
        <IconButton
          key="close"
          color="inherit"
          className={classes.closeButton}
          onClick={this.handleRequestClose}>
          <CloseIcon />
        </IconButton>
      ]}
      rightToolbar={actions && this.renderActions(actions)}
      disableGutters
    />
  )

  renderActions = (actions) => (
    actions.map((action, index) => {
      const buttonProps = {
        key: index,
        color: 'inherit',
        type: action.type || 'button',
        disabled: action.disabled,
      }

      if (action.onClick) {
        buttonProps.onClick = () => action.onClick(this.props.history)
      }

      return <Button {...buttonProps}>{action.label}</Button>
    })
  )

  render() {
    const { classes, history, title, profile } = this.props
    const steps = this.props.steps.map(step => {
      const props = step.props
      props.onFieldChange = this.handleFieldChange(step.id)
      props.onRowAdd = this.handleRowAdd(step.id)
      props.onRowRemove = this.handleRowRemove(step.id)
      props.values = this.state[step.id]
      props.profile = profile
      return step
    })

    return (
      <Dialog
        open={true}
        transition={Transition}
        onRequestClose={this.handleRequestClose}
        classes={{ paper: classes.dialog }}
        fullScreen={false}
        maxWidth='md'
        ignoreBackdropClick
      >
        <HorizontalStepper
          wrapperClass={ClassNames(classes.stepper)}
          contentClass={ClassNames(classes.content, classes.fullScreen)}
          header={this.renderNavBar(classes, title)}
          onSubmit={this.handleSubmit(this.state, history)}
          steps={steps}
          values={this.state}
          onStepValidation={this.handleStepValidation}
        />
      </Dialog>
    )
  }
}

StepperDialog.propTypes = {
  title: PropTypes.string.isRequired,
  toolbarActions: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func,
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(fieldType),
  columns: PropTypes.arrayOf(columnType),
  dropdowns: PropTypes.object,
  readonly: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

export default withStyles(styles, { withTheme: true })(
  withRouter(StepperDialog)
)