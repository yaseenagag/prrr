import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Link from '../../atoms/Link'
import Button from '../../atoms/Button'
import ClaimPrrrBanner from '../ClaimPrrrBanner'
import ErrorMessage from '../../atoms/ErrorMessage'
import claimPrrr from '../../../actions/claimPrrr'

export default class PendingPrrrs extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    prrrs: PropTypes.array.isRequired,
  }

  constructor(props){
    super(props)
    this.state = {error: null}
  }

  claimPrrr(prrr){
    claimPrrr(prrr.id)
    //what is the underscore in the line below doing?
      .then(_ => {
        const url = `https://github.com/${prrr.owner}/${prrr.repo}/pull/${prrr.number}`
        const popup = window.open(url, '_blank')
        if (popup) popup.focus()
      })
      .catch(error => {
        console.warn('Claim Error')
        console.error(error)
        this.setState({error})
      })
  }

  render(){
    const prrrs = this.props.prrrs
      .filter(prrr => !prrr.claimed_by)
      .sort((a, b) =>
        moment(b.claimed_at).valueOf() -
        moment(a.claimed_at).valueOf()
      )

    return <div>
      {this.state.error ? <ErrorMessage error={this.state.error} /> : null}
      <ClaimPrrrBanner
        className="ClaimPrrrBanner"
        currentUser={this.props.currentUser}
        prrrs={prrrs}
      />
    </div>
  }
}
