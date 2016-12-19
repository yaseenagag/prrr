import React, { Component } from 'react'
import Link from '../atoms/Link'

export default class NotFoundPage extends Component {
  render(){
    return <div className="NotFoundPage">
      <h1>Page Not Found</h1>
      <h2>{this.props.location.pathname}</h2>
      <Link href="/">Homepage</Link>
    </div>
  }
}
