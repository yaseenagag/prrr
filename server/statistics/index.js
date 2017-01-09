import knex from '../knex'
import moment from 'moment'

export default class Statistics {
  constructor( _knex=knex ) {
    this.knex = _knex
  }

  beginningOfLastWeek() {
    return moment().startOf( 'week' ).subtract( 7, 'days' )
  }

  endOfLastWeek() {
    return moment().startOf( 'week' )
  }

  between( params ) {
    if ( params !== undefined && params.all !== undefined ) {
      return [ '2015-01-01', moment().add( 1, 'days' ).format() ]
    }
    else if( params === undefined || params.start === undefined || params.end === undefined ) {
      return [ this.beginningOfLastWeek(), this.endOfLastWeek() ]
    } else {
      return [ params.start, params.end ]
    }
  }

  totalReviewsLastWeek( params ) {
    const betweenQuery = this.between( params )

    return this.knex
      .select('*')
      .from('pull_request_review_requests')
      .whereBetween('created_at', betweenQuery )
      .then( result => ({
        start: betweenQuery[ 0 ],
        end: betweenQuery[ 1 ],
        count: result.length
      }))
  }

  totalReviewsPerReviewer() {
    return this.knex
      .select('claimed_by', knex.raw('COUNT(claimed_by) as count'))
      .from('pull_request_review_requests')
      .whereNotNull( 'claimed_by' )
      .groupBy( 'claimed_by' )
      .orderBy( 'count', 'desc' )
  }

  reviewTimes( params ) {
    return this.knex
      .select( 'claimed_by', 'claimed_at', 'completed_at', knex.raw( 'AGE( completed_at::timestamp, claimed_at::timestamp ) as review_time' ))
      .from('pull_request_review_requests')
      .whereBetween('claimed_at', this.between( params ))
      .orderBy( 'review_time', 'desc' )
  }

  averageTimeUntilClaimed( params ) {
    return this.knex
      .select( knex.raw( 'AVG( AGE( claimed_at::timestamp, created_at::timestamp ))' ))
      .from('pull_request_review_requests')
      .whereBetween('created_at',  this.between( params ) )
      .then( result => result[ 0 ].avg )
  }

  averageTimeUntilCompleted( params ) {
    return this.knex
      .select( knex.raw( 'AVG( AGE( completed_at::timestamp, claimed_at::timestamp ))' ))
      .from('pull_request_review_requests')
      .whereBetween( 'created_at', this.between( params ) )
      .then( result => result[ 0 ].avg )
  }

  reviewsRequestedByProject() {
    return this.knex
      .select( 'repo', knex.raw('count(repo) as count'))
      .from('pull_request_review_requests')
      .groupBy( 'repo' )
      .orderBy( 'count', 'desc' )
  }

  averageReviewsPerProject() {
    return this.knex.raw(
      'select avg(count) from ( select count(repo) as count from pull_request_review_requests group by repo ) as avg'
    ).then( result => {
      return { avg: parseFloat( result.rows[ 0 ].avg )}
    })
  }
}
