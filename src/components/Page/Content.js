import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  content: {
    width: '100%',
    flexGrow: 1,
    overflowY: 'auto',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  }
})

function Content(props) {
  const { classes, padding } = props

  return (
    <main key="main" className={classes.content} style={{ padding }}>
      {props.children}
    </main>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  padding: PropTypes.string,
}

export default withStyles(styles, { withTheme: true })(Content)