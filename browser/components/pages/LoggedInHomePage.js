import React, { Component } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'

export default class LoggedInHomePage extends Component {
  render(){
    const { session, pullRequests } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Pull Requests Waiting For Review:</h1>
      <InspectObject object={pullRequests} />
    </Layout>
  }
}
