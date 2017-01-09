import React, { Component } from 'react'
import request from '../../../../request'

export default class ReviewsPerReviewer extends Component {
  constructor( props ) {
    super( props )

    this.state = { loading: true }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/totalReviewsPerReviewer' )
      .then( result => {
        this.setState( Object.assign( { loading: false }, { reviewers: result.json }))
      })
  }

  reviewers() {
    if( !this.state.loading ) {
      return this.state.reviewers.map( review => {
        return <div className="row" key={`reviewer-${review.claimed_by}`}>
          <span className="heading">{review.claimed_by}</span>
          <span className="detail">{review.count}</span>
        </div>
      })
    } else {
      return <div>Fetching...</div>
    }
  }

  render() {
    const { loading } = this.state

    return (
      <div className="statistic">
        <div className="header">Reviews Per Reviewer</div>
        <div className="body">{this.reviewers()}</div>
      </div>
    )
  }
}
