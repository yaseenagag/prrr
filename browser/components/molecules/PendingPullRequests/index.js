import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import PullRequestsTable from '../PullRequestsTable'
import claimPullRequest from '../../../actions/claimPullRequest'

export default class PendingPullRequests extends Component {
  static propTypes = {
    pullRequests: PropTypes.array.isRequired,
  }

  claim = (pullRequest) => {
    claimPullRequest(pullRequest.id)
      .then(response => {
        // debugger
      })
      .catch(error => {
        console.error(error)
        console.dir(error)
        // debugger
      })
  }

  renderActions = (pullRequest) => {
    return <Button
      onClick={event => this.claim(pullRequest)}
    >
      Claim
    </Button>
  }

  render(){
    const pullRequests = this.props.pullRequests
      .filter(pullRequest => typeof pullRequest.claimed_by !== 'number')

    return <PullRequestsTable
      pullRequests={pullRequests}
      renderActions={this.renderActions}
    />
  }
}
