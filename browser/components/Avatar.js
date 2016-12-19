import React, { Component, PropTypes } from 'react'
import Link from './Link'
import './Button.sass'

class Button extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render(){
    const src = this.props.user.avatar_url // || default_avatar
    return <img className="Avatar" src={src} />
  }
}

export default Button
