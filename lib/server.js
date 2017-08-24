import React from 'react'
import serverRender from 'react-dom/server'
const express = require('express')
const config = require('../config')
import App from '../src/app.jsx'
const path = require('path')
const app = express()

app.use(express.static('dist'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  var data = serverRender.renderToString(<App />)
  res.render('index', {data})
})
app.get('/article/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/article.html'))
})
app.listen(config.port)
