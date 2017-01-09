import React, { Component } from 'react'
import request from '../../../../request'
import moment from 'moment'

export default class LongestTimeForReview extends Component {
  constructor( props ) {
    super( props )

    this.state = { loading: true }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/reviewTimes' )
      .then( result => {
        this.setState( Object.assign( { loading: false }, { review: result.json[ 0 ] }))
      })
  }

  checkForCompleted() {
    if( this.state.review.completed_at === null ) {
      return <span className="shame"> and has still not finished review</span>
    }
  }

  reviewer() {
    if( this.state.loading ) {
      return <div>Fetching...</div>
    } else {
      const { review } = this.state

      return (
        <div>
          {review.claimed_by} took {moment.duration( review.review_time ).humanize()}
          {this.checkForCompleted()}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="statistic yellow">
        <div className="body">{this.reviewer()}</div>
        <div className="title">Longest Review Time</div>
      </div>
    )
  }
}
