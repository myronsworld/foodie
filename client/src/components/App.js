import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import Footer from './Footer'
import Profile from './Profile'
import Home from './Home'
import About from './About'
import PrivateRoute from '../HOCs/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { auth: localStorage.getItem('sessionID') }
    console.log(this.state)
  }

  async componentWillMount() {
    try {
      const res = await axios.get('/api/current_user')

      this.setState({ auth: true })
      localStorage.setItem('sessionID', res.data._id)
    } catch (e) {
      this.setState({ auth: false })
      localStorage.removeItem('sessionID')
      console.log(e)
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/profile" {...this.state} component={Profile} />
          </Switch>
        </div>
        <Footer />
      </Router>
    )
  }
}

export default App
