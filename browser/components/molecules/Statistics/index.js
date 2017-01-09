import React, { Component } from 'react'
import './index.sass'

import Reviews from './Reviews'
import ReviewsPerReviewer from './ReviewsPerReviewer'
import LongestTimeForReview from './LongestTimeForReview'
import AverageClaimTime from './AverageClaimTime'
import AverageCompletionTime from './AverageCompletionTime'
import ProjectsRequestingReview from './ProjectsRequestingReview'
import AverageReviewsPerProject from './AverageReviewsPerProject'

export default class StatisticsView extends Component {
  render() {
    return (
      <div>
        <div className="statistics">
          <Reviews />
          <AverageClaimTime />
          <AverageCompletionTime />
          <LongestTimeForReview />
          <AverageReviewsPerProject />
        </div>
        <div className="statistics">
          <ReviewsPerReviewer />
          <ProjectsRequestingReview />
        </div>
      </div>
    )
  }
}
