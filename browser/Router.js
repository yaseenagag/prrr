import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import NotFoundPage      from './components/pages/NotFoundPage'
import LoggedInHomePage  from './components/pages/LoggedInHomePage'
import LoggedOutHomePage from './components/pages/LoggedOutHomePage'
import RequestReviewPage from './components/pages/RequestReviewPage'


export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    const { session } = props
    if (session.user){
      map('/',        LoggedInHomePage)
      map('/request', RequestReviewPage)
    }else{
      map('/',        LoggedOutHomePage)
    }
    map('/:path*', NotFoundPage)
  }
}
