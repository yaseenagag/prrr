import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import PullRequestsTable from '../PullRequestsTable'
import unclaimPullRequest from '../../../actions/unclaimPullRequest'

export default class ClaimedPullRequests extends Component {
  static propTypes = {
    pullRequests: PropTypes.array.isRequired,
  }

  unclaim = (pullRequest) => {
    unclaimPullRequest(pullRequest.id)
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
    return <div>
      <span>{pullRequest.claimed_by}</span>
      <Button
        onClick={event => this.unclaim(pullRequest)}
      >
        Unclaim
      </Button>
    </div>
  }

  render(){
    const pullRequests = this.props.pullRequests
      .filter(pullRequest => typeof pullRequest.claimed_by === 'number')

    return <PullRequestsTable
      className="ClaimedPullRequests"
      pullRequests={pullRequests}
      renderActions={this.renderActions}
    />
  }
}
