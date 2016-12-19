import React, { Component, PropTypes } from 'react'
import Link from './Link'
import './Button.sass'

class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    href: PropTypes.string,
    submit: PropTypes.bool,
    noFocus: PropTypes.bool,
  };

  static defaultProps = {
    submit: false,
    noFocus: false,
  };

  render(){
    const type = this.props.type === false ? false : this.props.type || 'default'
    const props = Object.assign({}, this.props)
    delete props.type
    delete props.submit
    delete props.noFocus

    const buttonTypeClassName = type ? `Button-${type}` : ''
    props.className = `Button ${buttonTypeClassName} ${props.className||''}`

    if (this.props.submit){
      delete props.href
      props.type = 'submit'
    }

    if (this.props.noFocus){
      props.onFocus = event => event.target.blur()
      props.className += ' Button-nofocus'
    }
    return props.href ?
      <Link ref="button" {...props}>{this.props.children}</Link> :
      <button ref="button" {...props}>{this.props.children}</button>
  }
}

export default Button
