import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import PageNotFound      from './components/PageNotFound'
import LoggedInHomePage  from './components/LoggedInHomePage'
import LoggedOutHomePage from './components/LoggedOutHomePage'


export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    const { session } = props
    if (session.user){
      map('/',       LoggedInHomePage)
    }else{
      map('/',       LoggedOutHomePage)
    }
    map('/:path*', PageNotFound)
  }
}
