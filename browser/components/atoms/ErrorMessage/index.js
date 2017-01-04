import React, { Component, PropTypes } from 'react'
import './index.sass'

export default class ErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };

  render(){
    return <div className="ErrorMessage">Error: {this.props.error.message}</div>
  }
}

