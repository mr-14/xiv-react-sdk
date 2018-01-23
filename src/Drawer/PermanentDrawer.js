import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import NavList from '../NavList'

const drawerWidth = 120

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
    color: theme.palette.shades.dark.text.primary,
    backgroundColor: theme.palette.shades.dark.background.paper,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    color: theme.palette.shades.dark.text.primary,
    backgroundColor: theme.palette.shades.dark.background.paper,
  },
  drawerButtons: {
    marginTop: 'auto',
    textAlign: 'center',
  },
  content: {
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class PermanentDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchor: props.anchor,
    }
  }

  render() {
    const { classes, title, sidebar } = this.props
    const { anchor } = this.state
    const drawer = sidebar ? this.renderSidebar(classes, anchor, sidebar) : null

    let before = null
    let after = null

    if (anchor === 'left') {
      before = drawer
    } else {
      after = drawer
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography type="title" color="inherit" noWrap>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classes.content}>
            {this.props.children}
          </main>
          {after}
        </div>
      </div>
    )
  }

  renderSidebar = (classes, anchor, sidebar) => (
    <Drawer
      type="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={anchor}
    >
      <div className={classes.drawerHeader} />
      <div className={classes.drawerButtons}>
        <Divider />
        <NavList items={sidebar} />
      </div>
    </Drawer>
  )
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  anchor: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string.isRequired,
}

PermanentDrawer.defaultProps = {
  anchor: 'right',
}

export default withStyles(styles)(PermanentDrawer)