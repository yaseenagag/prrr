import React, { Component } from 'react'
import Layout from '../molecules/Layout'
import Statistics from '../molecules/Statistics'
import loadStatistics from '../../actions/loadStatistics'

export default class StatisticsReviewPage extends Component {
  constructor( props ) {
    super( props )

    this.state = { loading: true, allPrrrs: [] }
  }

  componentDidMount() {
    loadStatistics( this.setState.bind(this) )
      .then(_ => this.setState({ loading: false }))
  }

  render(){
    const { session } = this.props
    const { allPrrrs } = this.state

    if( this.state.loading ) {
      return <Layout className="HomePage" session={session}>
        <div>Fetching Data...</div>
      </Layout>
    } else {
      return <Layout className="HomePage" session={session}>
        <Statistics allPrrrs={allPrrrs} />
      </Layout>
    }
  }
}
