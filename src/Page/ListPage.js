import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  actionPanel: {
    marginLeft: 'auto',
  },
  content: {
    padding: theme.spacing.unit * 3,
  }
})

class ListPage extends React.Component {
  componentDidMount = () => {
    document.title = this.props.title
  }

  render() {
    const { classes, title, actionPanel } = this.props

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography type="title">{title}</Typography>
          <div className={classes.actionPanel}>{actionPanel}</div>
        </Toolbar>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

ListPage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  actionPanel: PropTypes.node,
  children: PropTypes.node,
}

export default withStyles(styles, { withTheme: true })(ListPage)
