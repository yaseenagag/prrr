import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import claimPullRequest from '../../../actions/claimPullRequest'
import './index.sass'

export default class PullRequestsTable extends Component {
  static propTypes = {
    pullRequests: PropTypes.array.isRequired,
    renderActions: PropTypes.func.isRequired,
  }

  render(){
    const { pullRequests, renderActions } = this.props
    const rows = pullRequests.map(pullRequest => {
      const href = `https://github.com/${pullRequest.repository}/pull/${pullRequest.number}`
      return <tr key={pullRequest.id}>
        <td>
          <Link href={href} target="_blank">{pullRequest.repository}</Link>
        </td>
        <td>
          <Link href={href} target="_blank">{pullRequest.number}</Link>
        </td>
        <td>
          {pullRequest.requested_by}
        </td>
        <td>
          {renderActions(pullRequest)}
        </td>
      </tr>
    })
    return <table className="PullRequestsTable">
      <thead>
        <tr>
          <th>Repository</th>
          <th>Number</th>
          <th>Requestor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }
}
