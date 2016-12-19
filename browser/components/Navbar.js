import React, { Component, PropTypes } from 'react'
import Button from './Button'
import Avatar from './Avatar'
import './Navbar.sass'
import logout from '../actions/logout'

export default class Navbar extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render(){
    const { user } = this.props.session
    return <div className="Navbar">
      <div>
        <Button type={false} href="/">Prrr</Button>
        &nbsp;
        <Button type={false} href="/skills">skills</Button>
      </div>
      <div>
        <span>{user.name}</span>
        <Avatar user={user} />
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  }
}
