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
          <div key={`review-count-${review.repo}`}>
            <span>{review.repo}</span> - <span>{review.count}</span>
          </div>
        )
      })
    }
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <h5>Total number of projects that requested reviews: {count}</h5>
        {this.projects()}
      </div>
    )
  }
}
