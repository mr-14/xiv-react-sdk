import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
  },
  content: {
    padding: theme.spacing.unit * 3,
  }
})

class SimplePage extends React.Component {
  componentDidMount = () => {
    document.title = this.props.title
  }

  render() {
    const { classes, title, actionPanel } = this.props

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

SimplePage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default withStyles(styles, { withTheme: true })(SimplePage)
