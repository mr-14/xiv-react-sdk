import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { fieldType, columnType, errorType } from '../../types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Navbar from '../Navbar'
import { EditableTable, ViewTable } from '../Table'
import validate from '../../validations'
import { FormContainer } from '../../components/Container'

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

class ComboDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initState(props, props.values)
    if (props.onLoad) {
      props.onLoad(data => {
        this.setState(this.initState(props, data))
      })
    }
  }

  componentDidMount = () => {
    document.title = this.props.title
  }

  initState = (props, data) => {
    let values = {}, dirty = {}, error = {}

    for (const field of props.fields) {
      values[field.id] = data ? data[field.id] : ''
      dirty[field.id] = false
      error[field.id] = props.errors ? props.errors[field.id] : ''
    }
    
    return {
      ...values,
      items: data ? data.items : [],
      dirty: { ...dirty },
      error: { ...error },
    }
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  handleFieldChange = (fieldId, value) => {
    this.setState({ [fieldId]: value, dirty: { ...this.state.dirty, [fieldId]: true } })
  }

  handleRowAdd = (row) => {
    const items = this.state.items ? [...this.state.items, row] : [row]
    this.setState({ items })
  }

  handleRowRemove = (row) => {
    const items = [...this.state.items]
    const rowToRemove = items.indexOf(row)
    items.splice(rowToRemove, 1)
    this.setState({ items })
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

  render() {
    const { classes, title, fields, columns, readonly, profile } = this.props

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
        {this.renderNavbar(classes, title)}
        <div className={ClassNames(classes.dialogContent, classes.fullScreen)}>
          <FormContainer 
            className={classes.spacer}
            fields={fields}
            values={this.state}
            onFieldChange={this.handleFieldChange}
            readonly={readonly}
            profile={profile}
          />
          {this.renderTable(columns, readonly, profile)}
        </div>
      </Dialog>
    )
  }

  renderNavbar = (classes, title) => (
    <Navbar
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
      rightToolbar={this.renderToolbarActions()}
      disableGutters={true}
    />
  )

  renderToolbarActions = () => {
    if (!this.props.actions) {
      return null
    }

    return this.props.actions.map((action, index) => (
      this.renderActionButton(action, index, 'inherit')
    ))
  }

  renderActionButton = (action, index, color) => {
    const buttonProps = {
      key: index,
      color: color || 'primary',
      type: action.type || 'button',
    }

    if (action.onClick) {
      buttonProps.onClick = () => action.onClick({
        history: this.props.history,
        data: this.state
      })
    }

    return (
      <Button {...buttonProps}>{action.label}</Button>
    )
  }

  renderTable = (columns, readonly, profile) => {
    if (readonly) {
      return (
        <ViewTable
          columns={columns}
          values={this.state.items}
          profile={profile}
        />
      )
    }

    return (
      <EditableTable
        columns={columns}
        values={this.state.items}
        onRowAdd={this.handleRowAdd}
        onRowRemove={this.handleRowRemove}
        profile={profile}
      />
    )
  }
}

ComboDialog.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func,
  fields: PropTypes.arrayOf(fieldType),
  errors: PropTypes.arrayOf(errorType),
  columns: PropTypes.arrayOf(columnType),
  values: PropTypes.object,
  readonly: PropTypes.bool,
  profile: PropTypes.oneOf(['add', 'edit', 'show']),
}

export default withStyles(styles, { withTheme: true })(
  withRouter(ComboDialog)
)