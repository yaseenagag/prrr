import React, { Component } from 'react'
import Router from '../Router'

import state from '../state'
import loadSession from '../actions/loadSession'
import InspectObject from './InspectObject'

loadSession()

export default class Root extends Component {

  constructor(props){
    super(props)
    this.state = state.get()
    this.update = this.update.bind(this)
    state.subscribe(this.update)
  }

  componentWillUnmount(){
    state.unsubscribe(this.update)
  }

  update(newState){
    this.setState(newState)
  }

  render(){
    console.info('Root#render', this.state)
    if (this.state.loadSessionError)
      return <div>
        <h1>ERROR:</h1>
        <InspectObject object={this.state.loadSessionError} />
      </div>
    if (this.state.session)
      return <Router {...this.state} />
    return <div>loading...</div>
  }
}
