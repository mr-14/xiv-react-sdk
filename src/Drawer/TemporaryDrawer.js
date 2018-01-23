import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ClassNames from 'classnames'
import { withRouter } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Navbar from '../Navbar'
import Form from '../Form'
import { EditableTable, ViewTable } from '../Table'
import moment from 'moment'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  closeButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  drawer: {
    width: 'calc(100vw - 350px)',
    height: '100%',
  },
  drawerOverflow: {
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    overflowY: 'auto',
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
    padding: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
    },
  }
})

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)

    let form = {}
    for (const key of Object.keys(props.fields)) {
      const field = props.fields[key]

      if (props.data) {
        form[field.id] = props.data[field.id]
        continue
      }

      switch (field.type) {
        case 'date':
          form[field.id] = moment().format('YYYY-MM-DD')
          break
        default:
          form[field.id] = ''
      }

      if (field.dropdown) {
        form[field.id] = props.dropdowns[field.dropdown][0].id
      }
    }

    form.items = props.data ? props.data.items : []
    this.state = form
  }

  componentDidMount = () => {
    document.title = this.props.title
  }

  handleRequestClose = () => {
    this.props.history.goBack()
  }

  handleFieldChange = (fieldId, value) => {
    this.setState({
      [fieldId]: value,
    })
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

  handleSubmit = (data, history) => () => {
    if (!this.props.onSubmit) {
      return false
    }

    this.props.onSubmit(data, history)
  }

  render() {
    const { classes, history, title, columns, dropdowns, readonly } = this.props
    const fields = this.props.fields.map(field => {
      field.value = this.state[field.id]
      field.onChange = this.handleFieldChange
      return field
    })

    return (
      <Drawer anchor="right" open={true} classes={{paperAnchorRight: classes.drawerOverflow}}>
        <div className={classes.drawer}>
          <Form
            wrapperClass={ClassNames(classes.content, classes.fullScreen)}
            contentClass={classes.formContent}
            fullWidth={true}
            fields={fields}
            dropdowns={dropdowns}
            onSubmit={this.handleSubmit(this.state, history)}
            header={this.renderNavbar(classes, title)}
            readonly={readonly}
          >
            {this.renderTable(columns, dropdowns, readonly)}
          </Form>
        </div>
      </Drawer>
    )
  }

  renderNavbar = (classes, title) => (
    <Navbar
      position='absolute'
      title={title}
      leftToolbar={[
        <IconButton key="close" color="inherit"
          className={classes.closeButton}
          onClick={this.handleRequestClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      rightToolbar={this.renderToolbarActions()}
      disableGutters={true}
    />
  )

  renderToolbarActions = () => {
    if (!this.props.toolbarActions) {
      return null
    }

    return this.props.toolbarActions.map((action, index) => (
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
      buttonProps.onClick = () => action.onClick(this.props.history)
    }

    return (
      <Button {...buttonProps}>{action.label}</Button>
    )
  }

  renderTable = (columns, dropdowns, readonly) => {
    if (readonly) {
      return (
        <ViewTable
          columns={columns}
          dropdowns={dropdowns}
          rows={this.state.items}
        />
      )
    }

    return (
      <EditableTable
        columns={columns}
        dropdowns={dropdowns}
        rows={this.state.items}
        onRowAdd={this.handleRowAdd}
        onRowRemove={this.handleRowRemove}
      />
    )
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  withRouter(TemporaryDrawer)
)