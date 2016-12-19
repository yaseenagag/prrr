import React, { Component, PropTypes } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import addPullRequest from '../../actions/addPullRequest'

export default class RequestReviewPage extends Component {
  render(){
    const { session, pullRequests, addPullRequestError } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Request Review</h1>
      <AddPullRequestForm addPullRequestError={addPullRequestError} />
    </Layout>
  }
}


class AddPullRequestForm extends Component {

  static contextTypes = {
    redirectTo: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.state = {
      url: '',
      error: null,
      repository: null,
      number: null,
    }
  }

  componentDidMount(){
    this.refs.link.focus()
  }

  onChange = () => {
    const url = this.refs.link.value
    const { error, repository, number } = parsePullRequestURL(url)
    this.setState({url, error, repository, number})
  }

  addPullRequest = (event) => {
    this.onChange()
    event.preventDefault()
    const { repository, number } = this.state
    console.log({ repository, number })
    addPullRequest({repository, number})
      .then(pullRequest => {
        this.context.redirectTo('/')
      })
      .catch(error => {
        this.setState({error})
      })
  }

  render(){
    const { url, error, repository, number} = this.state
    let errorMessage = error && error.message
    if (errorMessage === 'duplicate')
      errorMessage = 'This pull request has allready been added'

    return <form onSubmit={this.addPullRequest}>
      {errorMessage && <h2>ERROR: {errorMessage}</h2>}
      <div>
        <input
          type="text"
          ref="link"
          value={url}
          onChange={this.onChange}
          onBlur={this.onChange}
        />
      </div>
      <div>repository: {repository}</div>
      <div>number: {number}</div>
      <div>
        <input type="submit" value="add" />
      </div>
    </form>
  }
}


const GITHUB_PULL_REQUEST_REGEXP = /github.com\/([^\/]+\/[^\/]+)\/pull\/(\d+)/
const parsePullRequestURL = function(url){
  // https://github.com/GuildCrafts/Trossello/pull/147
  const matches = url.match(GITHUB_PULL_REQUEST_REGEXP)
  if (!matches) return {
    error: 'invalid pull request url'
  }
  return {
    repository: matches[1],
    number: Number(matches[2]),
  }
}
