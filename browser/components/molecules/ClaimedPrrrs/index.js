import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Date from '../../atoms/Date'
import Button from '../../atoms/Button'
import GithubUsername from '../../atoms/GithubUsername'
import PrrrsTable from '../PrrrsTable'
import unclaimPrrr from '../../../actions/unclaimPrrr'

export default class ClaimedPrrrs extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    prrrs: PropTypes.array.isRequired,
  }

  renderAdditionalHeaders(){
    return [
      <th key="claimed">Claimed</th>,
      <th key="actions">Actions</th>,
    ]
  }

  renderAdditionalCells = (prrr) => {
    const { currentUser } = this.props
    const claimedByCurrentUser = prrr.claimed_by === currentUser.github_username
    const unclaimButton = claimedByCurrentUser ?
      <Button
        onClick={_ => unclaimPrrr(prrr.id)}
      >
        Unclaim
      </Button>
    :
      null

    return [
      <td key="claimed">
        <span>by&nbsp;</span>
        <GithubUsername username={prrr.claimed_by} currentUser={currentUser} />
        <span>&nbsp;</span>
        <Date fromNow date={prrr.claimed_at} />
      </td>,
      <td key="actions">{unclaimButton}</td>,
    ]
  }

  render(){
    const prrrs = this.props.prrrs
      .filter(prrr => prrr.claimed_by)
      .sort((a, b) =>
        moment(a.claimed_at).valueOf() -
        moment(b.claimed_at).valueOf()
      )

    return <PrrrsTable
      className="ClaimedPrrrs"
      currentUser={this.props.currentUser}
      prrrs={prrrs}
      renderAdditionalHeaders={this.renderAdditionalHeaders}
      renderAdditionalCells={this.renderAdditionalCells}
    />
  }
}
