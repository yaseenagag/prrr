import React, { Component } from 'react'
import request from '../../../../request'

export default class AverageReviewsPerProject extends Component {
  constructor( props ) {
    super( props )

    this.state = { avg: 'Fetching' }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/averageReviewsPerProject' )
      .then( result => this.setState( result.json ))
  }

  render() {
    const { avg } = this.state

    return (
      <div className="statistic orange">
        <div className="body">{avg}</div>
        <div className="title">Average Reviews Per Project (Overall)</div>
      </div>
    )
  }
}
