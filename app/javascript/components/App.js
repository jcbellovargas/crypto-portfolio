import React, { Component } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

const csrfToken = document.querySelector('meta[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {

  render () {
    return (
      <Dashboard />
    );
  }

}

export default App