import React, { Component } from 'react'
import request from '../../../../request'

export default class ProjectsRequestingReview extends Component {
  constructor( props ) {
    super( props )

    this.state = { loading: true, count: 'Fetching', reviews: [] }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/reviewsRequestedByProject' )
      .then( result => {
        this.setState({ loading: false, reviews: result.json, count: result.json.length })
      })
  }

  projects() {
    if( ! this.state.loading ) {
      return this.state.reviews.map( review => {
        return (
          <div className="row" key={`review-count-${review.repo}`}>
            <span className="heading">{review.repo}</span>
            <span className="detail">{review.count}</span>
          </div>
        )
      })
    }
  }

  render() {
    const { count } = this.state

    return (
      <div className="statistic">
        <div className="header">Reviews Requested By Project ({count})</div>
        <div className="body">{this.projects()}</div>
      </div>
    )
  }
}
