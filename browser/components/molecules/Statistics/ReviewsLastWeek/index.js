import React, { Component } from 'react'
import request from '../../../../request'

export default class ReviewsLastWeek extends Component {
  constructor( props ) {
    super( props )

    this.state = { count: 'Retrieving...' }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/totalReviewsLastWeek' )
      .then( result => this.setState( result.json ))
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <h5>Total code reviews last week: {count}</h5>
      </div>
    )
  }
}
