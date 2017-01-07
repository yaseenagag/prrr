import React, { Component } from 'react'
import startPollingForPrrrs from '../../actions/startPollingForPrrrs'
import stopPollingForPrrrs from '../../actions/stopPollingForPrrrs'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import PendingPrrrs from '../molecules/PendingPrrrs'
import ClaimedPrrrs from '../molecules/ClaimedPrrrs'

export default class LoggedInHomePage extends Component {
  constructor(props){
    super(props)
    startPollingForPrrrs()
  }
  componentWillUnmount(){
    stopPollingForPrrrs()
  }
  render(){
    const { session, prrrs=[] } = this.props
    return <Layout className="HomePage" session={session}>

      <h1>Pull Requests Waiting For Review:</h1>
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
