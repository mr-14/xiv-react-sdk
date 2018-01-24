import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import AppsIcon from 'material-ui-icons/Apps'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import NavList from '../NavList'

const drawerWidth = 200

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
    color: theme.palette.types.dark.text.primary,
    backgroundColor: theme.palette.types.dark.background.paper,
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 2,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  actionButtons: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    color: theme.palette.types.dark.text.primary,
    backgroundColor: theme.palette.types.dark.background.paper,
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class MiniDrawer extends React.Component {
  state = {
    open: false,
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, title, sidebar } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {this.renderToolbar(classes, open, title)}
          {this.renderSidebar(classes, open, sidebar)}
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }

  renderToolbar = (classes, open, title) => (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters={true}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.menuButton}
        >
          <AppsIcon />
        </IconButton>
        <Typography type="title" color="inherit" noWrap>{title}</Typography>
        <div className={classes.actionButtons}>{this.props.actions}</div>
      </Toolbar>
    </AppBar>
  )

  renderSidebar = (classes, open, sidebar) => (
    <Drawer
      type="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton color="inherit" onClick={this.handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavList items={sidebar} />
      </div>
    </Drawer>
  )
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['persistent', 'permanent']),
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
  sidebar: PropTypes.arrayOf(PropTypes.array),
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)