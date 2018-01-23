import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress'

const styles = {
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10000,
  },
  hide: {
    display: 'none',
  }
}

class Progress extends React.Component {
  state = {
    hidden: true
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.progress) {
      setTimeout(() => { this.show() }, 200)
    } else {
      this.setState({ hidden: true })
    }
  }

  show = () => {
    if (this.props.progress) {
      this.setState({ hidden: false })
    }
  }

  render() {
    const { classes } = this.props
    const { hidden } = this.state

    return (
      <div className={classNames(classes.root, hidden && classes.hide)}>
        <LinearProgress color="accent" />
      </div>
    )
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress)