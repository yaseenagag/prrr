import React, { Component } from 'react'
import Link from './Link'

export default class PageNotFound extends Component {
  render(){
    return <div className="PageNotFound">
      <h1>Page Not Found</h1>
      <h2>{this.props.location.pathname}</h2>
      <Link href="/">Homepage</Link>
    </div>
  }
}
