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
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import MenuIcon from 'material-ui-icons/Menu'
import NavList from '../../components/NavList'

const drawerWidth = 140

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
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
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.contentFrame,
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
  },
  title: {
    marginLeft: theme.spacing.unit * 3,
  },
  actionButtons: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
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
    overflowY: 'auto',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    marginLeft: -drawerWidth,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class PersistentDrawer extends React.Component {
  state = {
    open: true,
  }

  componentDidMount = () => {
    document.title = this.props.title
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
          {sidebar && this.renderSidebar(classes, open, sidebar)}
          {this.renderContent(classes, open)}
        </div>
      </div>
    )
  }

  renderToolbar = (classes, open, title) => {
    let navBtn = null

    if (!!this.props.sidebar) {
      navBtn = (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      )
    }

    return (
      <AppBar className={classes.appBar}>
        <Toolbar disableGutters={true}>
          {navBtn}
          <Typography type="title" noWrap className={!this.props.sidebar && classes.title}>{title}</Typography>
          <div className={classes.actionButtons}>{this.props.actions}</div>
        </Toolbar>
      </AppBar>
    )
  }

  renderSidebar = (classes, open, sidebar) => (
    <Drawer
      type="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      open={open}
    >
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavList items={sidebar} />
      </div>
    </Drawer>
  )

  renderContent = (classes, open) => (
    <main className={classNames(classes.content, open && classes.contentShift)}>
      {this.props.children}
    </main>
  )
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
  sidebar: PropTypes.arrayOf(PropTypes.array),
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer)