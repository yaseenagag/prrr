import moment from 'moment'
import React, { Component } from 'react'
import startPollingForMetrics from '../../actions/startPollingForMetrics'
import stopPollingForMetrics from '../../actions/stopPollingForMetrics'
import InspectObject from '../utils/InspectObject'
import Layout from '../molecules/Layout'
import Link from '../atoms/Link'

export default class MetricsPage extends Component {
  constructor(props){
    super(props)
    startPollingForMetrics()
  }
  componentWillUnmount(){
    stopPollingForMetrics()
  }
  render(){
    const { session, metrics={} } = this.props
    return <Layout className="MetricsPage" session={session}>
      <InspectObject object={metrics} />
      <div>
        <h4>longestTimeForPrrrToBeReviewedLastWeek</h4>
        <TimeDuration duration={metrics.longestTimeForPrrrToBeReviewedLastWeek} />
      </div>
    </Layout>
  }
}


const TimeDuration = props => {
  const duration = moment.duration(props.duration || 0)
  return <span title={`${duration.asHours()} hours`}>{duration.humanize()}</span>
}
