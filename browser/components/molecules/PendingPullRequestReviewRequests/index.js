import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import PullRequestReviewRequestsTable from '../PullRequestReviewRequestsTable'
import claimPullRequestReviewRequest from '../../../actions/claimPullRequestReviewRequest'

export default class PendingPullRequestReviewRequests extends Component {
  static propTypes = {
    pullRequestReviewRequests: PropTypes.array.isRequired,
  }

  claimPullRequestReviewRequest(){
    // var win = window.open(url, '_blank');
    // win.focus();
  }

  renderAdditionalHeaders(){
    return [
      <th key="actions">Actions</th>,
    ]
  }

  renderAdditionalCells(prrr){
    return [
      <td key="actions">
        <Button onClick={_ => claimPullRequestReviewRequest(prrr.id)}>
          Claim
        </Button>
      </td>,
    ]
  }

  render(){
    const pullRequestReviewRequests = this.props.pullRequestReviewRequests
      .filter(pullRequest => typeof pullRequest.claimed_by !== 'number')
      .sort((a, b) =>
        moment(b.created_at).valueOf() -
        moment(a.created_at).valueOf()
      )

    return <PullRequestReviewRequestsTable
      className="PendingPullRequestReviewRequests"
      currentUser={this.props.currentUser}
      pullRequestReviewRequests={pullRequestReviewRequests}
      renderAdditionalHeaders={this.renderAdditionalHeaders}
      renderAdditionalCells={this.renderAdditionalCells}
    />
  }
}