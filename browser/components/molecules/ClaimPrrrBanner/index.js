import React, { Component, PropTypes } from 'react'
import Link from '../../atoms/Link'
import Icon from '../../atoms/Icon'
import Date from '../../atoms/Date'
import Button from '../../atoms/Button'
import GithubUsername from '../../atoms/GithubUsername'
import claimPrrr from '../../../actions/claimPrrr'

export default class ClaimPrrrBanner extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    prrrs: PropTypes.array.isRequired,
  }

  constructor(props){
    super(props)
    this.state = {error : null}
  }

  claimPrrr(prrr){
    claimPrrr(prrr.id)
  }

  renderClaimButton = (prrr) => {
    const { currentUser } = this.props

    return (
      <div className={`ClaimPrrrBanner ${this.props.className||''}`}>
        <Button onClick={_=> this.claimPrrr(prrr)}>
          Claim
        </Button>
      </div>
    )
  }

  render(){
    const prrrs = this.props.prrrs

    return <div>
      {this.state.error ? <ErrorMessage error={this.state.error} /> : null}
      <ClaimPrrrBanner
        className="ClaimPrrrBanner"
        currentUser={this.props.currentUser}
        prrrs={prrrs}
        renderClaimButton={this.renderClaimButton}
      />
    </div>
  }
}
