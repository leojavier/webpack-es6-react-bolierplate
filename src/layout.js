import React from 'react'
import ReactDOM from 'react-dom'
import './css/global.less'
import Home from './Home'
import About from './About'

const path = document.location.pathname

switch (path) {
  case '/' :
    require('./css/home.less')
    ReactDOM.render(<Home />, document.getElementById('root'))
    break
  case '/about' :
    require('./css/about.less')
    ReactDOM.render(<About />, document.getElementById('root'))
    break
  default :
    ReactDOM.render(<Home />, document.getElementById('root'))
}
