import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import PullRequestsTable from '../PullRequestsTable'
import claimPullRequestReviewRequest from '../../../actions/claimPullRequestReviewRequest'

export default class PendingPullRequests extends Component {
  static propTypes = {
    pullRequests: PropTypes.array.isRequired,
  }

  renderAdditionalHeaders(){
    return [
      <th key="actions">Actions</th>,
    ]
  }

  renderAdditionalCells(pullRequest){
    return [
      <td key="actions">
        <Button onClick={_ => claimPullRequestReviewRequest(pullRequest.id)}>
          Claim
        </Button>
      </td>,
    ]
  }

  render(){
    const pullRequests = this.props.pullRequests
      .filter(pullRequest => typeof pullRequest.claimed_by !== 'number')
      .sort((a, b) =>
        moment(b.created_at).valueOf() -
        moment(a.created_at).valueOf()
      )

    return <PullRequestsTable
      pullRequests={pullRequests}
      currentUser={this.props.currentUser}
      renderAdditionalHeaders={this.renderAdditionalHeaders}
      renderAdditionalCells={this.renderAdditionalCells}
    />
  }
}
