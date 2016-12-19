import React, { Component, PropTypes } from 'react'
import Navbar from './Navbar'
import './Layout.sass'

export default class Layout extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render(){
    const className = `Layout ${this.props.className||''}`
    return <div className={className}>
      <Navbar session={this.props.session} />
      <div className="Layout-content">
        {this.props.children}
      </div>
    </div>
  }
}
