import React, { Component } from 'react'
import moment from 'moment'

export default class StatisticsView extends Component {
  constructor( props ) {
    super( props )

    this.state = { statistics: new Statistics( props.allPrrrs ) }
  }
  render() {
    const { statistics } = this.state

    return (
      <div className="statistics">
        <ReviewsLastWeek count={statistics.totalReviewsLastWeek()} />
        <ReviewsPerReviewer reviewCounts={statistics.totalReviewsPerReviewer()} />
        <LongestTimeForReview prrrWithDiff={statistics.longestTimeForReviewLastWeek()} />
        <AverageTimeToBeClaimedLastWeek averageTime={statistics.averageTimeToBeClaimedLastWeek()} />
        <AverageTimeToBeCompletedLastWeek averageTime={statistics.averageTimeToBeCompletedLastWeek()} />
        <ProjectsRequestedReview count={statistics.projectsRequestedReview()} />
        <AverageReviewsPerProject count={statistics.averageReviewsPerProject()} />
      </div>
    )
  }
}

class ReviewsLastWeek extends Component {
  render() {
    const { count } = this.props

    return (
      <div>
        <h5>Total code reviews last week: {count}</h5>
      </div>
    )
  }
}

class ReviewsPerReviewer extends Component {
  render() {
    const { reviewCounts } = this.props

    return (
      <div>
        <h5>Total code reviews per reviewer:</h5>
        {reviewCounts.map( reviewCount => {
          return <div key={`reviewer-${reviewCount.reviewer}`}>
            <span>{reviewCount.reviewer}</span> -
            <span>{reviewCount.count}</span>
          </div>
        })}
      </div>
    )
  }
}

class LongestTimeForReview extends Component {
  checkForCompleted() {
    if( this.props.prrrWithDiff.completed_at === null ) {
      return <span className="shame"> and has still not finished review</span>
    }
  }

  render() {
    const { prrrWithDiff } = this.props

    return (
      <div>
        <h5>Longest time for PR to be reviewed last week:</h5>
        <div>
          {prrrWithDiff.claimed_by} took {moment.duration( prrrWithDiff.diff ).humanize()}
          {this.checkForCompleted()}
        </div>
      </div>
    )
  }
}

class AverageTimeToBeClaimedLastWeek extends Component {
  render() {
    const { averageTime } = this.props

    return (
      <div>
        <h5>Average time for PR to be claimed last week: {moment.duration( averageTime ).humanize()}</h5>
      </div>
    )
  }
}

class AverageTimeToBeCompletedLastWeek extends Component {
  render() {
    const { averageTime } = this.props

    return (
      <div>
        <h5>Average time for PR to be completed last week: {moment.duration( averageTime ).humanize()}</h5>
      </div>
    )
  }
}

class ProjectsRequestedReview extends Component {
  render() {
    const { count } = this.props

    return (
      <div>
        <h5>Total number of projects that requested reviews: {count}</h5>
      </div>
    )
  }
}

class AverageReviewsPerProject extends Component {
  render() {
    const { count } = this.props

    return (
      <div>
        <h5>Average number of reviews requested per project: {count}</h5>
      </div>
    )
  }
}

class Statistics {
  constructor( prrrs ) {
    this.prrrs = prrrs
  }

  beginningOfLastWeek() {
    return moment().startOf( 'week' ).subtract( 7, 'days' )
  }

  endOfLastWeek() {
    return moment().startOf( 'week' )
  }

  prrrsByTime( start=this.beginningOfLastWeek(), end=this.endOfLastWeek() ) {
    return this.prrrs.filter( prrr =>
      moment( prrr.created_at ).isBetween( start, end )
    )
  }

  lastWeekPrrrs() {
    if( this._lastWeekPrrrs === undefined ) {
      this._lastWeekPrrrs = this.prrrsByTime()
    }

    return this._lastWeekPrrrs
  }

  totalReviewsLastWeek() {
    return this.lastWeekPrrrs().length
  }

  totalReviewsPerReviewer() {
    const counts = this.prrrs.reduce( (memo, prrr) => {
      if( prrr.claimed_by !== null ) {
        memo[ prrr.claimed_by ] = ( memo[ prrr.claimed_by ] || 0 ) + 1
      }

      return memo
    }, {} )

    return Object.keys( counts )
      .map( key => ({ reviewer: key, count: counts[ key ] }))
      .sort( (a, b) => a.count < b.count )
  }

  longestTimeForReviewLastWeek() {
    const now = moment()

    const times = this.lastWeekPrrrs()
      .filter( prrr => prrr.claimed_at !== null )
      .map( prrr => {
        const referenceDate = prrr.completed_at !== null ? prrr.completed_at : now

        return {
          id: prrr.id,
          diff: moment( moment( referenceDate ) ).diff( prrr.claimed_at )
        }
      })
      .sort( (a, b) => a.diff < b.diff )

    return Object.assign( {},
      this.prrrs.find( prrr => prrr.id === times[ 0 ].id ),
      { diff: times[ 0 ].diff }
    )
  }

  averageTimeToBeClaimedLastWeek() {
    const times = this.lastWeekPrrrs()
      .filter( prrr => prrr.claimed_at !== null )

    const sum = times.reduce( (memo, prrr) =>
      memo + moment( moment( prrr.claimed_at ) ).diff( prrr.created_at )
    , 0 )

    return sum / times.length
  }

  averageTimeToBeCompletedLastWeek() {
    const times = this.lastWeekPrrrs()
      .filter( prrr => prrr.completed_at !== null )

    const sum = times.reduce( (memo, prrr) =>
      memo + moment( moment( prrr.completed_at ) ).diff( prrr.claimed_at )
    , 0 )

    return sum / times.length
  }

  projectsRequestedReview() {
    return this.prrrs.reduce( (memo, prrr) => {
      if( ! memo.includes( prrr.repo )) {
        memo.push( prrr.repo )
      }

      return memo
    }, [] ).length
  }

  averageReviewsPerProject() {
    const requested = this.prrrs.reduce( (memo, prrr) => {
      memo[ prrr.repo ] = ( memo[ prrr.repo ] || 0 ) + 1

      return memo
    }, {})

    const sum = Object.keys( requested ).reduce( (memo, repo) => {
      return memo + requested[ repo ]
    }, 0 )

    return sum / Object.keys( requested ).length
  }
}
