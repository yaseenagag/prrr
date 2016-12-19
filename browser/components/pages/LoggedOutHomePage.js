import React, { Component } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'

export default class LoggedOutHomePage extends Component {
  render(){
    return <div className="LoggedOutHomePage">
      <h1>Prrr</h1>
      <Button href="/login" externalLink>Login or Signup</Button>
    </div>
  }
}
