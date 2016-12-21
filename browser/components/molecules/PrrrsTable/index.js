import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Date from '../../atoms/Date'
import Button from '../../atoms/Button'
import GithubUsername from '../../atoms/GithubUsername'
import claimPrrr from '../../../actions/claimPrrr'
import './index.sass'

export default class PrrrsTable extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    prrrs: PropTypes.array.isRequired,
    renderAdditionalHeaders: PropTypes.func.isRequired,
    renderAdditionalCells: PropTypes.func.isRequired,
  }

  render(){
    const {
      currentUser,
      prrrs,
      renderAdditionalCells,
      renderAdditionalHeaders,
    } = this.props
    const rows = prrrs.map(prrr => {
      const requrestByCurrentUser = prrr.requested_by === currentUser.github_username
      const href = `https://github.com/${prrr.owner}/${prrr.repo}/pull/${prrr.number}`
      return <tr key={prrr.id}>
        <td>
          <Link href={href} target="_blank">
            {prrr.owner}/{prrr.repo}
          </Link>
          &nbsp;
          <Link href={href} target="_blank">
            {prrr.number}
          </Link>
        </td>
        <td>
          <span>by&nbsp;</span>
          <GithubUsername username={prrr.requested_by} currentUser={currentUser} />
          <span>&nbsp;</span>
          <Date fromNow date={prrr.created_at} />
        </td>
        {renderAdditionalCells(prrr)}
      </tr>
    })
    return <table className={`PrrrsTable ${this.props.className||''}`}>
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
