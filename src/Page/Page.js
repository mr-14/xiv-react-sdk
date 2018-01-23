import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Navbar'
import Content from './Content'
import MenuButton from './MenuButton'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.title = props.t(props.title)
  }

  componentDidMount = () => {
    document.title = this.title
  }

  render() {
    return [
      <Navbar
        key="navbar"
        title={this.title}
        position="fixed"
        disableGutters={false}
        leftToolbar={[<MenuButton key="menu" />]}
        rightToolbar={this.props.actions}
      />,
      <Content key="content" padding={this.props.padding}>
        {this.props.children}
      </Content>
    ]
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
  padding: PropTypes.string,
}

export default Page