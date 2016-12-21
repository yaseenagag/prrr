import React, { Component, PropTypes } from 'react'
import Button from '../atoms/Button'
import Layout from '../molecules/Layout'
import InspectObject from '../utils/InspectObject'
import createPrrr from '../../actions/createPrrr'

export default class RequestReviewPage extends Component {
  render(){
    const { session } = this.props
    return <Layout className="HomePage" session={session}>
      <h1>Request Review</h1>
      <CreatePrrrForm />
    </Layout>
  }
}


class CreatePrrrForm extends Component {

  static contextTypes = {
    redirectTo: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.state = {
      url: '',
      error: null,
      owner: null,
      repo: null,
      number: null,
      creating: false,
    }
  }

  componentDidMount(){
    this.refs.link.focus()
  }

  onChange = () => {
    const url = this.refs.link.value
    const { error, owner, repo, number } = parsePullRequestURL(url)
    this.setState({url, error, owner, repo, number})
  }

  createPrrr = (event) => {
    this.onChange()
    event.preventDefault()
    const { owner, repo, number } = this.state
    this.setState({creating: true})
    createPrrr({owner, repo, number})
      .then(_ => {
        this.setState({creating: false})
        this.context.redirectTo('/')
      })
      .catch(error => {
        this.setState({error, creating: false})
      })
  }

  render(){
    const { creating, url, error, owner, repo, number} = this.state
    if (creating) return <div>Creating Pull Request Review Request...</div>

    let errorMessage = error && error.message
    if (errorMessage === 'duplicate')
      errorMessage = 'This pull request has allready been added'


    return <form onSubmit={this.createPrrr}>
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
      <div>owner: {owner}</div>
      <div>repo: {repo}</div>
      <div>number: {number}</div>
      <div>
        <input type="submit" value="add" />
      </div>
    </form>
  }
}


const GITHUB_PULL_REQUEST_REGEXP = /github.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/
const parsePullRequestURL = function(url){
  // https://github.com/GuildCrafts/Trossello/pull/147
  const matches = url.match(GITHUB_PULL_REQUEST_REGEXP)
  if (!matches) return {
    error: 'invalid pull request url'
  }
  return {
    owner: matches[1],
    repo: matches[2],
    number: Number(matches[3]),
  }
}
