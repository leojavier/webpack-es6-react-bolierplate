import React, { Component } from 'react'
class Home extends Component {
  constructor () {
    super()
    this.state = {
      test: 0
    }
    this.handleclick = this.handleclick.bind(this)
  }
  handleclick () {
    console.log('clicked')
    this.setState({test: this.state.test + 1})
  }
  render () {
    return (
      <div>
        Home view <span>{this.state.test} </span>
        <button onClick={this.handleclick}>Add</button>
      </div>
    )
  }
}

export default Home
