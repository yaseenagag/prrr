import React, { Component } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import PendingPullRequestReviewRequests from '../molecules/PendingPullRequestReviewRequests'
import ClaimedPullRequestReviewRequests from '../molecules/ClaimedPullRequestReviewRequests'

export default class LoggedInHomePage extends Component {
  render(){
    const { session, pullRequestReviewRequests=[] } = this.props
    return <Layout className="HomePage" session={session}>

      <h1>Pull Requests Waiting For Review:</h1>
      <PendingPullRequestReviewRequests
        currentUser={session.user}
        pullRequestReviewRequests={pullRequestReviewRequests}
      />

      <h1>Claimed Pull Requests:</h1>
      <ClaimedPullRequestReviewRequests
        currentUser={session.user}
        pullRequestReviewRequests={pullRequestReviewRequests}
      />
    </Layout>
  }
}
