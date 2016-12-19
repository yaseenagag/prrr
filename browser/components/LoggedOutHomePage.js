import React, { Component } from 'react'
import Layout from './Layout'
import Button from './Button'
import InspectObject from './InspectObject'

export default class LoggedOutHomePage extends Component {
  render(){
    return <div className="LoggedOutHomePage">
      <h1>Prrr</h1>
      <Button href="/login" externalLink>Login or Signup</Button>
    </div>
  }
}
