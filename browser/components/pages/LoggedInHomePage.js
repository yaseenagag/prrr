import React, { Component } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import PendingPrrrs from '../molecules/PendingPrrrs'
import ClaimedPrrrs from '../molecules/ClaimedPrrrs'

export default class LoggedInHomePage extends Component {
  render(){
    const { session, prrrs=[] } = this.props
    return <Layout className="HomePage" session={session}>

      <h1>There are {prrrs.filter(prrr => !prrr.claimed_by).length} Pull Requests ready for Review:</h1>
      <PendingPrrrs
        currentUser={session.user}
        prrrs={prrrs}
      />

      <h1>Claimed Pull Requests:</h1>
      <ClaimedPrrrs
        currentUser={session.user}
        prrrs={prrrs}
      />
    </Layout>
  }
}

// testing
