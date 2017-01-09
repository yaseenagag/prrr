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
        return <div key={`reviewer-${review.claimed_by}`}>
          <span>{review.claimed_by}</span> -
          <span>{review.count}</span>
        </div>
      })
    } else {
      return <div>Fetching...</div>
    }
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <h5>Total code reviews per reviewer:</h5>
        {this.reviewers()}
      </div>
    )
  }
}
