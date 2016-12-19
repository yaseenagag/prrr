import React from 'react'
import { render } from 'react-dom'
import './index.sass'
import Root from './components/Root'

render(
  <Root />,
  document.querySelector('main')
);


// for debugging

import state from './state'
import moment from 'moment'
window.DEBUG = {
  state,
  React,
  moment,
}
