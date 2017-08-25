import React from 'react'
import serverRender from 'react-dom/server'
const express = require('express')
const config = require('../config')

/*
* Pages
*/
import Home from '../src/Home.js'
import About from '../src/About.js'

const app = express()

app.use(express.static('dist'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  var home = serverRender.renderToString(<Home />)
  res.render('index', {home})
})

app.get('/about', (req, res) => {
  var about = serverRender.renderToString(<About />)
  res.render('about', {about})
})
app.listen(config.port)
