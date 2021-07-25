import React, { Component } from 'react'
import PortfolioComponent from './PortfolioComponent'
import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {

  render () {
    return (
      <PortfolioComponent />
    );
  }

}

export default App