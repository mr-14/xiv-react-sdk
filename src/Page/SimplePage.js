import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

class SimplePage extends React.Component {
  componentDidMount = () => {
    document.title = this.props.t(this.props.title)
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

SimplePage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

const mapStateToProps = (state) => ({
  t: getTranslate(state.locale),
})

export default connect(mapStateToProps)(SimplePage)
