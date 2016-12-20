import React, { Component, PropTypes } from 'react'
import Button from '../../atoms/Button'
import Avatar from '../../atoms/Avatar'
import './index.sass'
import logout from '../../../actions/logout'

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
        <Button type="transparent" href="/request">Request Review</Button>
      </div>
      <div>
        <span>{user.name}</span>
        <Avatar user={user} />
        <Button type="transparent" onClick={logout}>Logout</Button>
      </div>
    </div>
  }
}
