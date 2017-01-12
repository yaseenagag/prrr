import React, { Component } from 'react'
import Link from '../atoms/Link'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import PendingPrrrs from '../molecules/PendingPrrrs'
import ClaimedPrrrs from '../molecules/ClaimedPrrrs'

export default class LoggedInHomePage extends Component {
  render(){
    const { session, prrrs=[] } = this.props

    const unclaimedPrrrs = prrrs.filter(prrr => !prrr.claimed_by)

    const claimedPrrr = prrrs.find(prrr =>
      prrr.claimed_by === session.user.github_username
    )

    const infoBox = claimedPrrr
      ? <ClaimedPrrr prrr={claimedPrrr} />
      : <ClaimAPrrr />


    return <Layout className="HomePage" session={session}>
      <h1>There are {unclaimedPrrrs.length} Pull Requests ready for Review:</h1>
      {infoBox}
    </Layout>
  }
}


class ClaimedPrrr extends Component {
  render(){
    const { prrr } = this.props
    const href = `https://github.com/${prrr.owner}/${prrr.repo}/pull/${prrr.number}`
    return <div className="LoggedInHomePage-ClaimedPrrr">
      <span>Reviewing </span>
      <Link href={href} target="_blank">
        {prrr.owner}/{prrr.repo}
      </Link>

      <Button
        onClick={_ => unclaimPrrr(prrr.id)} 
        disabled={!claimedByCurrentUser}
      >
        Unclaim
      </Button>
      <Button
        onClick={_=> this.completePrrr(prrr)}
        disabled={!claimedByCurrentUser}
      >

      </Button>
    </div>
  }
}

class ClaimAPrrr extends Component {
  render(){
    return <div className="">
      <div>
        <button>Click here</button>to claim the next prr
      </div>
    </div>
  }
}



function confirmArchivePrrr(href, prrr){
  const message = `Are you sure you want to archive your\n\nPull Request Review Request for\n\n${href}`
  if (confirm(message)) archivePrrr(prrr.id)
}
