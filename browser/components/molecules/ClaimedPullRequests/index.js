import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Date from '../../atoms/Date'
import Button from '../../atoms/Button'
import PullRequestsTable from '../PullRequestsTable'
import unclaimPullRequestReviewRequest from '../../../actions/unclaimPullRequestReviewRequest'

export default class ClaimedPullRequests extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    pullRequests: PropTypes.array.isRequired,
  }

  renderAdditionalHeaders(){
    return [
      <th key="claimed">Claimed</th>,
      <th key="actions">Actions</th>,
    ]
  }

  renderAdditionalCells = (pullRequest) => {
    const { currentUser } = this.props
    const claimedByCurrentUser = pullRequest.claimed_by === currentUser.github_id
    const unclaimButton = claimedByCurrentUser ?
      <Button
        onClick={_ => unclaimPullRequestReviewRequest(pullRequest.id)}
      >
        Unclaim
      </Button>
    :
      null

    return [
      <td key="claimed">
        <span>by {claimedByCurrentUser ? 'you' : pullRequest.claimed_by}</span>
        &nbsp;
        <Date fromNow date={pullRequest.claimed_at} />
      </td>,
      <td key="actions">{unclaimButton}</td>,
    ]
  }

  render(){
    const pullRequests = this.props.pullRequests
      .filter(pullRequest => typeof pullRequest.claimed_by === 'number')
      .sort((a, b) =>
        moment(a.claimed_at).valueOf() -
        moment(b.claimed_at).valueOf()
      )

    return <PullRequestsTable
      className="ClaimedPullRequests"
      currentUser={this.props.currentUser}
      pullRequests={pullRequests}
      renderAdditionalHeaders={this.renderAdditionalHeaders}
      renderAdditionalCells={this.renderAdditionalCells}
    />
  }
}
