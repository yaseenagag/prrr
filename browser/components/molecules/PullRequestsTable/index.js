import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Date from '../../atoms/Date'
import Button from '../../atoms/Button'
import claimPullRequestReviewRequest from '../../../actions/claimPullRequestReviewRequest'
import './index.sass'

export default class PullRequestsTable extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    pullRequests: PropTypes.array.isRequired,
    renderAdditionalHeaders: PropTypes.func.isRequired,
    renderAdditionalCells: PropTypes.func.isRequired,
  }

  render(){
    const {
      currentUser,
      pullRequests,
      renderAdditionalCells,
      renderAdditionalHeaders,
    } = this.props
    const rows = pullRequests.map(pullRequest => {
      const requrestByCurrentUser = pullRequest.requested_by === currentUser.github_id
      const href = `https://github.com/${pullRequest.owner}/${pullRequest.repo}/pull/${pullRequest.number}`
      return <tr key={pullRequest.id}>
        <td>
          <Link href={href} target="_blank">
            {pullRequest.owner}/{pullRequest.repo}
          </Link>
          &nbsp;
          <Link href={href} target="_blank">
            {pullRequest.number}
          </Link>
        </td>
        <td>
          <span>by {requrestByCurrentUser ? 'you' : pullRequest.requested_by}</span>
          &nbsp;
          <Date fromNow date={pullRequest.created_at} />
        </td>
        {renderAdditionalCells(pullRequest)}
      </tr>
    })
    return <table className="PullRequestsTable">
      <thead>
        <tr>
          <th>Pull Request</th>
          <th>Requested</th>
          {renderAdditionalHeaders()}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }
}
