import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import PrrrsTable from '../PrrrsTable'
import claimPrrr from '../../../actions/claimPrrr'

export default class PendingPrrrs extends Component {
  static propTypes = {
    prrrs: PropTypes.array.isRequired,
  }

  claimPrrr(prrr){
    claimPrrr(prrr.id)
      .then(_ => {
        const url = `https://github.com/${prrr.owner}/${prrr.repo}/pull/${prrr.number}`
        const popup = window.open(url, '_blank')
        if (popup) popup.focus()
      })
  }

  renderAdditionalHeaders(){
    return [
      <th key="actions">Actions</th>,
    ]
  }

  renderAdditionalCells = (prrr) => {
    return [
      <td key="actions">
        <Button onClick={_ => this.claimPrrr(prrr)}>
          Claim
        </Button>
      </td>,
    ]
  }

  render(){
    const prrrs = this.props.prrrs
      .filter(prrr => !prrr.claimed_by)
      .sort((a, b) =>
        moment(b.created_at).valueOf() -
        moment(a.created_at).valueOf()
      )

    return <PrrrsTable
      className="PendingPrrrs"
      currentUser={this.props.currentUser}
      prrrs={prrrs}
      renderAdditionalHeaders={this.renderAdditionalHeaders}
      renderAdditionalCells={this.renderAdditionalCells}
    />
  }
}
