import React, { Component } from 'react'

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
      <div className="statistics">
        <Reviews />
        <ReviewsPerReviewer />
        <LongestTimeForReview />
        <AverageClaimTime />
        <AverageCompletionTime />
        <ProjectsRequestingReview />
        <AverageReviewsPerProject />
      </div>
    )
  }
}
