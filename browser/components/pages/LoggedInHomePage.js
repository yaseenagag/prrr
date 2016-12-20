import React, { Component } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import PendingPullRequests from '../molecules/PendingPullRequests'
import ClaimedPullRequests from '../molecules/ClaimedPullRequests'

export default class LoggedInHomePage extends Component {
  render(){
    const { session, pullRequests } = this.props
    return <Layout className="HomePage" session={session}>

      <h1>Pull Requests Waiting For Review:</h1>
      <PendingPullRequests
        currentUser={session.user}
        pullRequests={pullRequests}
      />

      <h1>Claimed Pull Requests:</h1>
      <ClaimedPullRequests
        currentUser={session.user}
        pullRequests={pullRequests}
      />
    </Layout>
  }
}
