import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Profile from './Profile'
import Home from './Home'
import About from './About'
import PrivateRoute from '../HOCs/PrivateRoute'
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  actions
)(App)
